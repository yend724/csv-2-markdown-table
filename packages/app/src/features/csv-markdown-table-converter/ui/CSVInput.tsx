import styles from "../../../shared/ui/converter.module.css";

import { TextArea } from "../../../shared/ui/textarea";
import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSample: () => void;
  onClear: () => void;
  errorMessage?: string;
};
export const CSVInput = ({
  value,
  onChange,
  onSample,
  onClear,
  errorMessage,
}: Props) => (
  <section className={styles["panel"]} aria-labelledby="csv-title">
    <div className={styles["panel-heading"]}>
      <h2 id="csv-title">CSV を入力</h2>
      <div className={styles["text-actions"]}>
        <button type="button" onClick={onSample}>
          サンプル
        </button>
        <button type="button" onClick={onClear} disabled={!value}>
          クリア
        </button>
      </div>
    </div>
    <p className={styles["field-hint"]} id="csv-hint">
      1 行目を見出しとして、カンマ区切りのデータを貼り付けてください。
    </p>
    <TextArea
      id="csv-input"
      aria-labelledby="csv-title"
      aria-describedby={errorMessage ? "csv-hint csv-error" : "csv-hint"}
      aria-invalid={!!errorMessage}
      value={value}
      onChange={onChange}
      placeholder={"名前,役割,拠点\n田中,デザイン,東京"}
    />
    {errorMessage && (
      <p className={styles["error-message"]} id="csv-error" role="alert">
        {errorMessage}
      </p>
    )}
  </section>
);
