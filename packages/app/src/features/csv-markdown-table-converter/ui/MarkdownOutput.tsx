import { Button } from "../../../shared/ui/button";
import { TextArea } from "../../../shared/ui/textarea";

interface Props {
  value: string;
}

export const MarkdownOutput = ({ value }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Copied to clipboard");
    });
  };

  return (
    <div className="grid gap-4">
      <div className="flex h-8 items-center gap-2">
        <h2 className="font-semibold">Markdown Output Table</h2>
        <Button className="text-sm" onClick={handleCopy}>
          Copy
        </Button>
      </div>
      <TextArea
        className="border-gray-400 bg-gray-200"
        placeholder="Converted markdown table will appear here..."
        readOnly
        value={value}
      />
    </div>
  );
};
