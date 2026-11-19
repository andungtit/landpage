import React from "react";

export type IconName =
  | "arrow"
  | "plus"
  | "scan"
  | "check"
  | "globe"
  | "pin"
  | "people"
  | "wallet";

interface Props {
  name: IconName;
}

const Icon: React.FC<Props> = ({ name }) => (
  <svg>
    <use href={`#i-${name}`} />
  </svg>
);

export default Icon;
