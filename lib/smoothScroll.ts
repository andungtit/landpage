import type Lenis from "lenis";

/**
 * Port của smooth-scroll.js gốc: Lenis + xử lý click anchor (#hash) trong trang.
 */
let scroller: Lenis | null = null;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToTarget = (target: Element | null) => {
  if (!target) return;
  if (!scroller) {
    target.scrollIntoView({
      behavior: reducedMotion() ? ("instant" as ScrollBehavior) : "smooth",
    });
    return;
  }
  // Lenis tự đọc scroll-padding và scroll-margin của target
  scroller.scrollTo(target as HTMLElement);
};

export const initSmoothScroll = () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let disposed = false;

  const configure = async () => {
    scroller?.destroy();
    scroller = null;
    if (reduced.matches) return;
    const { default: LenisCtor } = await import("lenis");
    if (disposed) return;
    scroller = new LenisCtor({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      stopInertiaOnNavigate: true,
      prevent: (node: HTMLElement) =>
        !!node.matches?.("[data-lenis-prevent], .mobile-menu, textarea, select"),
      virtualScroll: ({ event, deltaX, deltaY }: any) =>
        !(event as WheelEvent).shiftKey && Math.abs(deltaY) >= Math.abs(deltaX),
    } as any);
  };

  // Chạy sau các handler riêng (feature selection, ...)
  const onClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = (event.target as HTMLElement)?.closest?.(
      "a[href]"
    ) as HTMLAnchorElement | null;
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    )
      return;
    const url = new URL(link.href, location.href);
    if (
      url.origin !== location.origin ||
      url.pathname !== location.pathname ||
      url.search !== location.search ||
      !url.hash
    )
      return;
    let id: string;
    try {
      id = decodeURIComponent(url.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, "", url.hash);
    scrollToTarget(target);
  };

  configure();
  reduced.addEventListener("change", configure);
  document.addEventListener("click", onClick);

  return () => {
    disposed = true;
    reduced.removeEventListener("change", configure);
    document.removeEventListener("click", onClick);
    scroller?.destroy();
    scroller = null;
  };
};
