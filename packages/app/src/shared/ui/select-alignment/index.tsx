import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

const OPTIONS = [
  { value: "left", label: "左寄せ", Icon: AlignLeft },
  { value: "center", label: "中央寄せ", Icon: AlignCenter },
  { value: "right", label: "右寄せ", Icon: AlignRight },
] as const;
export type Alignment = (typeof OPTIONS)[number]["value"];
type Props = {
  value: Alignment | "";
  onChange: (alignment: Alignment) => void;
};

export const SelectAlignment = ({ value, onChange }: Props) => (
  <div className="alignment-control" role="group" aria-label="表の文字揃え">
    <span>文字揃え</span>
    {OPTIONS.map(({ value: option, label, Icon }) => (
      <button
        type="button"
        key={option}
        title={label}
        aria-label={label}
        aria-pressed={(value || "left") === option}
        onClick={() => onChange(option)}
      >
        <Icon size={17} aria-hidden="true" />
      </button>
    ))}
  </div>
);
