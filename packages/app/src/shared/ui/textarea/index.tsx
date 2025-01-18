import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"textarea">;
export const TextArea: React.FC<Props> = ({ className, ...props }) => {
  return (
    <textarea
      className={`h-60 w-full rounded-md border border-gray-300 p-2 ${className}`}
      {...props}
    />
  );
};
