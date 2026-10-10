import styles from "../../../shared/ui/converter.module.css";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/model/copy/useCopyToClipboard";
import {
  type Alignment,
  SelectAlignment,
} from "../../../shared/ui/select-alignment";
import { TextArea } from "../../../shared/ui/textarea";

type Props = {
  value: string;
  alignment: Alignment | "";
  onAlignmentChange: (value: Alignment) => void;
};
export const MarkdownOutput = ({
  value,
  alignment,
  onAlignmentChange,
}: Props) => {
  const { copyToClipboard, isCopied, copyError } = useCopyToClipboard();
  return (
    <section
      className={`${styles["panel"]} ${styles["output-panel"]}`}
      aria-labelledby="markdown-title"
    >
      <div className={styles["panel-heading"]}>
        <h2 id="markdown-title">Markdown をコピー</h2>
        <button
          type="button"
          className={styles["primary-button"]}
          disabled={!value}
          onClick={() => copyToClipboard(value)}
        >
          {isCopied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          <span>{isCopied ? "コピーしました" : "コピー"}</span>
        </button>
      </div>
      <p className={styles["field-hint"]}>
        入力と列の選択に合わせて、自動で変換されます。
      </p>
      <TextArea
        id="markdown-output"
        aria-labelledby="markdown-title"
        readOnly
        value={value}
        placeholder="変換した Markdown がここに表示されます。"
      />
      <div className={styles["output-bottom"]}>
        <SelectAlignment value={alignment} onChange={onAlignmentChange} />
        <span className={styles["format-label"]}>.md</span>
      </div>
      <span className={styles["sr-only"]} role="status">
        {isCopied ? "Markdown をコピーしました" : ""}
      </span>
      {copyError && (
        <p role="alert" className={styles["error-message"]}>
          {copyError}
        </p>
      )}
    </section>
  );
};
