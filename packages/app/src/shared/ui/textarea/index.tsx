import styles from "../converter.module.css";

import type { ComponentPropsWithoutRef } from "react";

export const TextArea = ({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"textarea">) => (
  <textarea
    className={`${styles["code-input"]} ${className}`}
    spellCheck={false}
    autoCapitalize="off"
    {...props}
  />
);
