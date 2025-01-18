import { useCopyToClipboard } from "../../../shared/model/copy/useCopyToClipboard";
import {
  type Alignment,
  SelectAlignment,
} from "../../../shared/ui/select-alignment";
import { TextArea } from "../../../shared/ui/textarea";

type Props = {
  value: string;
  onAlignmentChange: (value: Alignment) => void;
};
export const MarkdownOutput: React.FC<Props> = ({
  value,
  onAlignmentChange,
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="grid gap-4">
      <div className="flex h-8 flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Markdown Output</h2>
          <SelectAlignment onChange={onAlignmentChange} />
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(value)}
          className="rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-600 text-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <TextArea
        readOnly
        value={value}
        className="border border-gray-200 bg-gray-100 p-2"
        rows={6}
      />
    </div>
  );
};
