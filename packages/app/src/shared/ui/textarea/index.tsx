import type { ComponentPropsWithoutRef } from "react";

export const TextArea = ({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"textarea">) => (
  <textarea
    className={`code-input ${className}`}
    spellCheck={false}
    autoCapitalize="off"
    {...props}
  />
);
