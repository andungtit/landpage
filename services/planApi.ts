import {
  API_TIMEOUT_MS,
  GENERATE_TIMEOUT_MS,
  ONEPLAN_API_BASE,
  PUBLIC_PLAN_PATH,
} from "../lib/config";
import {
  IPlan,
  IPlanError,
  IPlanInput,
  IPlanStop,
  PlanGroup,
} from "../lib/types/planDemo";

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

const normalizeKey = (value: unknown) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");

const getPlanFor = (group: PlanGroup) =>
  ({ friends: "Friends", couple: "Couple", solo: "Solo" }[group] || "Friends");

const getPeopleCount = (group: PlanGroup) =>
  ({ friends: 2, couple: 2, solo: 1 }[group] || 2);

const buildMapLink = (stop: any): string => {
  if (stop.mapLink) return stop.mapLink;
  if (stop.latitude == null || stop.longitude == null) return "";
  const label = stop.placeName || stop.title || stop.name || "";
  return `https://maps.apple.com/?ll=${encodeURIComponent(
    `${stop.latitude},${stop.longitude}`
  )}&q=${encodeURIComponent(label)}`;
};

const validImageUrl = (value: unknown): string => {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value, ONEPLAN_API_BASE || window.location.href);
    return /^https?:$/.test(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

export const normalizeStop = (raw: any): IPlanStop => {
  const stop = raw || {};
  const source = Array.isArray(stop.imageUrls)
    ? stop.imageUrls
    : Array.isArray(stop.images)
    ? stop.images
    : [stop.imageUrl];
  const imageUrls = source.map(validImageUrl).filter(Boolean).slice(0, 3);
  return {
    time: stop.time || stop.startTime || "",
    title:
      stop.title || stop.name || stop.placeName || stop.location || "OnePlan stop",
    description:
      stop.description || "Open OnePlan for the full details of this stop.",
    tag: stop.tag || stop.category || "",
    placeName: stop.placeName || stop.location || "",
    address: stop.address || "",
    mapLink: buildMapLink(stop),
    imageUrls,
  };
};

const requestJson = (path: string, options: RequestOptions = {}) => {
  if (!ONEPLAN_API_BASE)
    return Promise.reject(new Error("Plan service is not configured."));
  const controller = new AbortController();
  const upstreamSignal = options.signal;
  const abortFromUpstream = () => controller.abort();
  if (upstreamSignal) {
    if (upstreamSignal.aborted) controller.abort();
    else
      upstreamSignal.addEventListener("abort", abortFromUpstream, {
        once: true,
      });
  }
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeout || API_TIMEOUT_MS
  );
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers || {}),
  };
  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  return fetch(`${ONEPLAN_API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body,
    signal: controller.signal,
    credentials: "omit",
  })
    .then(async (response) => {
      if (!response.ok) {
        const error: IPlanError = new Error(
          `Plan service returned ${response.status}.`
        );
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .finally(() => {
      clearTimeout(timeout);
      upstreamSignal?.removeEventListener("abort", abortFromUpstream);
    });
};

const searchLocations = (destination: string, signal?: AbortSignal) =>
  requestJson(
    `/locations/search?search=${encodeURIComponent(destination)}&take=8`,
    { signal }
  );

const feedScope = (location: any) => {
  if (location?.city?.id) return `cityId=${location.city.id}`;
  if (location?.state?.id) return `stateId=${location.state.id}`;
  if (location?.country?.id) return `countryId=${location.country.id}`;
  return "";
};

const normalizeExistingListing = (
  listing: any,
  input: IPlanInput
): IPlan | null => {
  const items = (listing.items || [])
    .filter((item: any) => Number(item.dayNumber || 1) === 1)
    .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .slice(0, 5)
    .map(normalizeStop);
  if (!items.length) return null;
  const destination = listing.cityName || listing.stateName || input.destination;
  return {
    source: "existing",
    title: listing.name || `${destination}, one good day.`,
    description: `${destination} · A real OnePlan route with places, photos and map details.`,
    durationDays: listing.durationDays || 1,
    stops: items,
  };
};

const findExistingPlan = async (
  input: IPlanInput,
  signal?: AbortSignal
): Promise<IPlan | null> => {
  const locations = await searchLocations(input.destination, signal);
  if (!Array.isArray(locations) || !locations.length) return null;
  const seenScopes = new Set<string>();
  for (const location of locations) {
    const scope = feedScope(location);
    if (!scope || seenScopes.has(scope)) continue;
    seenScopes.add(scope);
    const feed = await requestJson(
      `/marketplace/public/feed?${scope}&take=50&durationMinDays=1&durationMaxDays=14`,
      { signal }
    );
    const candidates = [...(feed.items || []), ...(feed.featured || [])]
      .filter((item: any) => item && Array.isArray(item.items) && item.items.length)
      .filter(
        (item: any, index: number, all: any[]) =>
          all.findIndex((other) => other.id === item.id) === index
      );
    const locationName = normalizeKey(
      location.city?.name || location.state?.name || input.destination
    );
    const listing =
      candidates.find(
        (item: any) => normalizeKey(item.cityName || "") === locationName
      ) || candidates[0];
    const plan = listing ? normalizeExistingListing(listing, input) : null;
    if (plan) return plan;
  }
  return null;
};

const normalizeGeneratedPlan = (payload: any, input: IPlanInput): IPlan => {
  const source = payload?.plan || payload;
  const days = Array.isArray(source?.days) ? source.days : [];
  const firstDay =
    days.find((day: any) => Number(day.day || 1) === 1) || days[0];
  const rawStops = firstDay?.plans || firstDay?.items || [];
  const stops = rawStops
    .map(normalizeStop)
    .filter((stop: IPlanStop) => stop.title);
  if (!stops.length) throw new Error("The server returned an empty plan.");
  return {
    source: "new",
    title:
      source.tripName ||
      source.trip_name ||
      `${input.destination}, one good day.`,
    description:
      source.tripDescription ||
      source.trip_description ||
      `A new OnePlan route for ${input.destination}, with real places and map details.`,
    durationDays: days.length || 1,
    stops,
  };
};

const createNewPlan = (
  input: IPlanInput,
  language: string,
  signal?: AbortSignal
) => {
  const body = {
    destination: input.destination,
    days: 1,
    numberOfPeople: getPeopleCount(input.group),
    budget: input.budget || "Flexible",
    currency: "VND",
    planFor: getPlanFor(input.group),
    vibe: input.notes || undefined,
    language,
  };
  return requestJson(PUBLIC_PLAN_PATH, {
    method: "POST",
    body,
    timeout: GENERATE_TIMEOUT_MS,
    signal,
  }).then((payload) => normalizeGeneratedPlan(payload, input));
};

export const requestPlan = async (
  input: IPlanInput,
  options: {
    locale?: string;
    signal?: AbortSignal;
    onStep?: (step: number) => void;
  } = {}
): Promise<IPlan> => {
  const { locale, signal, onStep } = options;
  const language = locale === "vi" ? "Tiếng Việt" : "English";
  onStep?.(0);
  const existing = await findExistingPlan(input, signal);
  if (existing) {
    onStep?.(3);
    return existing;
  }
  onStep?.(1);
  const created = await createNewPlan(input, language, signal);
  onStep?.(3);
  return created;
};
