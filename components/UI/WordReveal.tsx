import React, { useEffect, useRef, useState } from "react";
import { toPlainText } from "../../utilities/renderLines";

interface Props {
  as?: "h2" | "h3";
  id?: string;
  text: string; // dùng "\n" để xuống dòng
  accent?: string; // dòng nhấn mạnh, bọc trong <span> (vd. tiêu đề Payments)
}

/**
 * Port của heading-motion.js: tách heading thành từng từ (.word-mask > .word-ink)
 * rồi hiện dần khi heading lọt vào viewport.
 */
const WordReveal: React.FC<Props> = ({ as = "h2", id, text, accent }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !ref.current) return;
    setReady(true);
    setVisible(false);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -24px 0px" }
    );
    observer.observe(ref.current);
    const onChange = () => {
      if (reduced.matches) setVisible(true);
    };
    reduced.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onChange);
    };
  }, [text, accent]);

  let index = 0;
  const renderWords = (line: string) =>
    line.split(/(\s+)/).map((word, i) => {
      if (!word.trim()) return <React.Fragment key={i}>{word}</React.Fragment>;
      const delay = `${Math.min(index++ * 45, 450)}ms`;
      return (
        <span className="word-mask" aria-hidden="true" key={i}>
          <span
            className="word-ink"
            style={{ ["--word-delay" as string]: delay } as React.CSSProperties}
          >
            {word}
          </span>
        </span>
      );
    });

  const lines = text.split("\n");
  const className =
    [ready && "words-ready", visible && "words-visible"].filter(Boolean).join(" ") ||
    undefined;
  const label = toPlainText(accent ? `${text} ${accent}` : text);
  const Tag = as;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-word-reveal=""
      aria-label={label}
    >
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {renderWords(line)}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
      {accent && (
        <>
          <br />
          <span>{renderWords(accent)}</span>
        </>
      )}
    </Tag>
  );
};

export default WordReveal;
