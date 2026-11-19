import React from "react";

// "Every trip,\nin one plan." => ["Every trip,", <br/>, "in one plan."]
export const renderLines = (text: string = "") => {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

export const toPlainText = (text: string = "") =>
  text.replace(/\s*\n\s*/g, " ").trim();
