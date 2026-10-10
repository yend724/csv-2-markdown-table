import styles from "../converter.module.css";

import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  icon?: React.ReactNode;
};
export const Button: React.FC<Props> = ({
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${styles["primary-button"]} ${className ?? ""}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
