import { useEffect } from "react";
import { clamp, range, smooth } from "../utilities/math";
import { setInert } from "../utilities/inert";

interface Options {
  onNavChange?: (href: string) => void;
  deps?: unknown[];
}

/**
 * Port của scroll scene trong oneplan.js:
 * - Hero deck (kéo/thả, prev/next, phím mũi tên) + timeline khi cuộn
 * - Statement ink fill, journey progress, download photos, payment note
 * - Parallax ảnh travel-story, active nav link
 * Tất cả dùng chung một requestAnimationFrame theo scroll — không có render loop thường trực.
 */
export const useScrollScenes = ({ onNavChange, deps = [] }: Options = {}) => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const pinnedJourney = window.matchMedia(
      "(min-width: 1000px) and (min-height: 760px)"
    );

    const q = <T extends Element = HTMLElement>(selector: string) =>
      document.querySelector(selector) as T | null;
    const qa = <T extends Element = HTMLElement>(
      selector: string,
      root: ParentNode = document
    ) => Array.from(root.querySelectorAll(selector)) as T[];

    const hero = q(".hero");
    const heroIntro = q(".hero-intro");
    const deck = q(".hero-deck");
    const centerCard = q(".hero-center");
    const story = q(".travel-story");
    const journey = q(".process");
    const downloadScene = q(".download");
    const paymentVisual = q(".payments-visual");
    const deckPrev = q<HTMLButtonElement>(".deck-prev");
    const deckNext = q<HTMLButtonElement>(".deck-next");
    const deckControls = q(".hero-controls");
    if (
      !hero ||
      !heroIntro ||
      !deck ||
      !centerCard ||
      !story ||
      !journey ||
      !downloadScene ||
      !paymentVisual ||
      !deckPrev ||
      !deckNext ||
      !deckControls
    )
      return;

    const heroCards = qa(".hero-card");
    const heroSides = qa(".hero-side");
    const centerDevice = centerCard.querySelector(".device") as HTMLElement;
    const centerLabels = [
      centerCard.querySelector(".hero-card-label"),
      centerCard.querySelector(".card-foot"),
    ].filter(Boolean) as HTMLElement[];
    const dots = qa(".scene-dots span");
    const storyImage = story.querySelector("img") as HTMLElement;
    const statementLines = qa(".statement-line");
    const journeySteps = qa(".step", journey);
    const downloadPhotos = qa(".download-photo", downloadScene);
    const navLinks = qa<HTMLAnchorElement>(".nav-links a");
    const navSections = navLinks.map((a) =>
      document.querySelector(a.getAttribute("href") || "")
    );

    let journeyStep = -1;
    let ticking = false;
    let lastNav = "";
    let deckTarget = 0;
    let deckPosition = 0;
    let dragStart: {
      x: number;
      y: number;
      position: number;
      pointer: number;
    } | null = null;
    let dragged = false;
    let heroProgress = 0;
    let rafId = 0;

    const deckStep = () => heroCards[0].offsetWidth + (mobile.matches ? 12 : 14);

    function requestScene() {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateScene);
      }
    }

    function moveDeck(direction: number) {
      if (heroProgress > 0.15) return;
      const step = deckStep();
      deckTarget = clamp(Math.round(deckTarget / step) + direction, -2, 2) * step;
      requestScene();
    }

    const onPrev = () => moveDeck(1);
    const onNext = () => moveDeck(-1);
    const onDeckKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveDeck(event.key === "ArrowLeft" ? 1 : -1);
      }
    };
    const onDragStart = (event: Event) => event.preventDefault();
    const onPointerDown = (event: PointerEvent) => {
      if (heroProgress > 0.15 || event.button !== 0) return;
      dragged = false;
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        position: deckTarget,
        pointer: event.pointerId,
      };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragStart) return;
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      if (!dragged && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        dragStart = null;
        return;
      }
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        dragged = true;
        deck.classList.add("dragging");
        deck.setPointerCapture(event.pointerId);
        deckTarget = clamp(
          dragStart.position + dx,
          -2 * deckStep(),
          2 * deckStep()
        );
        requestScene();
      }
    };
    const finishDrag = () => {
      if (!dragStart) return;
      if (deck.hasPointerCapture(dragStart.pointer))
        deck.releasePointerCapture(dragStart.pointer);
      deckTarget = Math.round(deckTarget / deckStep()) * deckStep();
      dragStart = null;
      deck.classList.remove("dragging");
      requestScene();
    };
    const onDeckClickCapture = (event: MouseEvent) => {
      if (dragged) {
        event.preventDefault();
        event.stopImmediatePropagation();
        dragged = false;
      }
    };

    function updateEditorialScenes(viewportHeight: number) {
      const reduced = reduceMotion.matches;
      const lineRects = statementLines.map((line) => line.getBoundingClientRect());
      const journeyRect = journey!.getBoundingClientRect();
      const downloadRect = downloadScene!.getBoundingClientRect();
      const paymentRect = paymentVisual!.getBoundingClientRect();

      statementLines.forEach((line, index) => {
        const fill = reduced
          ? 1
          : clamp(
              (viewportHeight * 0.88 - lineRects[index].top) /
                (viewportHeight * 0.47)
            );
        line.style.setProperty("--ink-fill", `${fill * 100}%`);
        line.style.setProperty(
          "--ink-rise",
          `${(1 - fill) * (mobile.matches ? 6 : 13)}px`
        );
      });

      let route: number;
      if (reduced) route = 1;
      else if (pinnedJourney.matches)
        route = clamp(
          (80 - journeyRect.top) /
            Math.max(1, journeyRect.height - viewportHeight + 80)
        );
      else
        route = clamp(
          (viewportHeight * 0.7 - journeyRect.top) /
            Math.max(1, journeyRect.height * 0.8)
        );
      journey!.style.setProperty("--journey-progress", String(route));
      journey!.style.setProperty("--stamp-angle", `${-20 + route * 40}deg`);
      const step = Math.min(2, Math.floor(route * 3));
      if (step !== journeyStep) {
        journeySteps.forEach((element, index) => {
          element.classList.toggle("is-current", index === step);
          element.classList.toggle("is-complete", index < step);
        });
        journeyStep = step;
      }

      if (
        (downloadRect.top < viewportHeight + 100 && downloadRect.bottom > -100) ||
        reduced
      ) {
        const arrival = reduced
          ? 1
          : smooth(
              clamp((viewportHeight - downloadRect.top) / (viewportHeight * 0.85))
            );
        downloadPhotos.forEach((photo, index) => {
          const direction = index === 0 ? -1 : 1;
          photo.style.setProperty(
            "--photo-x",
            `${direction * (1 - arrival) * (mobile.matches ? 75 : 190)}px`
          );
          photo.style.setProperty("--photo-y", `${(1 - arrival) * 105}px`);
          photo.style.setProperty(
            "--photo-angle",
            `${direction * (12 + (1 - arrival) * 20)}deg`
          );
          photo.style.setProperty("--photo-scale", String(0.76 + arrival * 0.24));
        });
        downloadScene!.style.setProperty("--icon-rise", `${(1 - arrival) * 22}px`);
        downloadScene!.style.setProperty(
          "--icon-angle",
          `${(1 - arrival) * -18}deg`
        );
        downloadScene!.style.setProperty("--icon-scale", String(0.8 + arrival * 0.2));
      }
      const noteArrival = reduced
        ? 1
        : smooth(
            clamp(
              (viewportHeight * 0.85 - paymentRect.top) / (viewportHeight * 0.55)
            )
          );
      paymentVisual!.style.setProperty("--note-rise", `${(1 - noteArrival) * 70}px`);
      paymentVisual!.style.setProperty(
        "--note-opacity",
        String(0.2 + noteArrival * 0.8)
      );
    }

    function updateScene() {
      ticking = false;
      const viewportHeight = window.innerHeight;
      const heroRect = hero!.getBoundingClientRect();
      const raw = clamp(
        -heroRect.top / Math.max(1, hero!.offsetHeight - viewportHeight)
      );
      const progress = reduceMotion.matches ? 0 : smooth(range(raw, 0.03, 0.83));
      heroProgress = progress;
      deckPosition = reduceMotion.matches
        ? deckTarget
        : deckPosition + (deckTarget - deckPosition) * 0.18;
      if (Math.abs(deckPosition - deckTarget) < 0.1) deckPosition = deckTarget;
      deckPrev!.disabled = deckTarget >= 2 * deckStep() - 1;
      deckNext!.disabled = deckTarget <= -2 * deckStep() + 1;
      deckControls!.style.opacity = String(1 - range(progress, 0, 0.25));
      setInert(deckControls, progress > 0.15);
      const introOpacity = 1 - range(progress, 0, 0.35);
      const sideOpacity = range(progress, 0.5, 0.94);
      heroIntro!.style.opacity = String(introOpacity);
      heroIntro!.style.transform = `translateY(${-70 * progress}px)`;
      deck!.style.transform = `translate(calc(-50% + ${
        deckPosition * (1 - progress)
      }px), ${-viewportHeight * (mobile.matches ? 0.018 : 0.15) * progress}px)`;
      heroCards.forEach((card) => {
        const offset = Number(card.dataset.offset);
        if (!offset) return;
        const opacity = 1 - range(progress, 0.05, 0.8);
        card.style.opacity = String(opacity);
        card.style.transform = `translate(${
          offset * progress * (mobile.matches ? 75 : 140)
        }px, ${Math.abs(offset) * 36 * progress}px) rotate(${
          offset * progress * 5
        }deg)`;
        setInert(card, opacity < 0.05);
      });
      centerCard!.style.backgroundColor = `rgba(237,245,253,${1 - progress})`;
      centerCard!.style.overflow = progress > 0.01 ? "visible" : "hidden";
      centerDevice.style.transform = `scale(${
        1 + progress * (mobile.matches ? 0.15 : 0.35)
      })`;
      centerLabels.forEach(
        (label) => (label.style.opacity = String(1 - range(progress, 0.1, 0.6)))
      );
      heroSides.forEach((side) => {
        side.style.opacity = String(sideOpacity);
        side.style.transform = `translateY(${25 * (1 - sideOpacity)}px)`;
        side.style.pointerEvents = sideOpacity > 0.9 ? "auto" : "none";
        setInert(side, sideOpacity < 0.9);
      });
      dots.forEach((dot, index) =>
        dot.classList.toggle("current", index === Math.min(2, Math.floor(raw * 3)))
      );
      const storyRect = story!.getBoundingClientRect();
      if (
        !reduceMotion.matches &&
        storyRect.top < viewportHeight &&
        storyRect.bottom > 0
      ) {
        storyImage.style.transform = `translateY(${
          (viewportHeight / 2 - storyRect.top - storyRect.height / 2) * 0.08
        }px)`;
      }
      let current = "#home";
      navSections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= viewportHeight * 0.4)
          current = navLinks[index].getAttribute("href") || current;
      });
      if (lastNav !== current) {
        lastNav = current;
        onNavChange?.(current);
      }
      updateEditorialScenes(viewportHeight);
      if (Math.abs(deckPosition - deckTarget) > 0.1) requestScene();
    }

    let previousStep = deckStep();
    const onResize = () => {
      const nextStep = deckStep();
      deckTarget = clamp(Math.round(deckTarget / previousStep), -2, 2) * nextStep;
      previousStep = nextStep;
      requestScene();
    };
    const onHomeClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.('a[href="#home"]');
      if (!link) return;
      deckTarget = 0;
      requestScene();
    };

    deckPrev.addEventListener("click", onPrev);
    deckNext.addEventListener("click", onNext);
    deck.addEventListener("keydown", onDeckKey);
    deck.addEventListener("dragstart", onDragStart);
    deck.addEventListener("pointerdown", onPointerDown);
    deck.addEventListener("pointermove", onPointerMove);
    deck.addEventListener("pointerup", finishDrag);
    deck.addEventListener("pointercancel", finishDrag);
    deck.addEventListener("click", onDeckClickCapture, true);
    window.addEventListener("scroll", requestScene, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("click", onHomeClick);
    reduceMotion.addEventListener("change", requestScene);
    updateScene();

    return () => {
      cancelAnimationFrame(rafId);
      deckPrev.removeEventListener("click", onPrev);
      deckNext.removeEventListener("click", onNext);
      deck.removeEventListener("keydown", onDeckKey);
      deck.removeEventListener("dragstart", onDragStart);
      deck.removeEventListener("pointerdown", onPointerDown);
      deck.removeEventListener("pointermove", onPointerMove);
      deck.removeEventListener("pointerup", finishDrag);
      deck.removeEventListener("pointercancel", finishDrag);
      deck.removeEventListener("click", onDeckClickCapture, true);
      window.removeEventListener("scroll", requestScene);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onHomeClick);
      reduceMotion.removeEventListener("change", requestScene);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
