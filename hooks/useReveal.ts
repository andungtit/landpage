import { useEffect } from "react";

/**
 * Hiệu ứng xuất hiện một lần cho mọi phần tử `.reveal` (port từ oneplan.js).
 * CSS chỉ ẩn `.reveal` khi <html> có class `js`, nên không bao giờ mất nội dung khi tắt JS.
 */
export const useReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            reveals.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    document
      .querySelectorAll(".reveal:not(.visible)")
      .forEach((element) => reveals.observe(element));
    return () => reveals.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
