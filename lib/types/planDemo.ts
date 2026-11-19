export type PlanGroup = "friends" | "couple" | "solo";

export type PlanView = "form" | "loading" | "result" | "error";

export interface IPlanInput {
  destination: string;
  group: PlanGroup;
  budget: string;
  notes: string;
}

export interface IPlanStop {
  time: string;
  title: string;
  description: string;
  tag: string;
  placeName: string;
  address: string;
  mapLink: string;
  imageUrls: string[];
}

export interface IPlan {
  source: "existing" | "new";
  title: string;
  description: string;
  durationDays: number;
  stops: IPlanStop[];
}

export interface IPlanError extends Error {
  status?: number;
}

export interface IPlanDemoState {
  isOpen: boolean;
}

export interface IPlanDemoRootState {
  planDemo: IPlanDemoState;
}
