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
      className={`grid grid-flow-col place-items-center gap-x-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
