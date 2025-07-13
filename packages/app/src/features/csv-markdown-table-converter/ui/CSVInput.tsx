import { TextArea } from "../../../shared/ui/textarea";

import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

export const CSVInput = ({ value, onChange, errorMessage }: Props) => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">CSV Input</h2>
      </div>
      <TextArea defaultValue={value} onChange={onChange} />
      {errorMessage && (
        <div className="rounded border border-red-500 bg-red-100 p-2 text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
