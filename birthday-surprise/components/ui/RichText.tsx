import { Fragment } from "react";

/** Turns "plain *highlighted* plain" into text with rose-colored highlights. */
export function RichText({ text, highlightClassName = "italic text-rose" }: { text: string; highlightClassName?: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
