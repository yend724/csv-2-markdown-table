import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useState } from "react";

const ALIGNMENT_OPTIONS = ["left", "center", "right"] as const;
const ALIGNMENT_ICONS = {
  left: AlignLeft,
  center: AlignCenter,
  right: AlignRight,
};

export type Alignment = (typeof ALIGNMENT_OPTIONS)[number];
type Props = {
  onChange: (alignment: Alignment) => void;
};
export const SelectAlignment: React.FC<Props> = ({ onChange }) => {
  const [alignment, setAlignment] = useState<Alignment | "">("");

  return (
    <div className="flex items-center gap-2">
      {ALIGNMENT_OPTIONS.map((option) => {
        const Icon = ALIGNMENT_ICONS[option];
        return (
          <button
            key={option}
            type="button"
            className={`${
              alignment === option ? "bg-gray-200" : ""
            } rounded-md p-1`}
            onClick={() => {
              setAlignment(option);
              onChange(option);
            }}
          >
            <Icon aria-label={option} size={16} />
          </button>
        );
      })}
    </div>
  );
};
