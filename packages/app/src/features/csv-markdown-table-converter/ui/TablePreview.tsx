import styles from "../../../shared/ui/converter.module.css";

import type { Alignment } from "../../../shared/ui/select-alignment";

type Props = {
  headers: string[];
  rows: string[][];
  selectedHeaders: string[];
  alignment: Alignment | "";
};
export const TablePreview = ({
  headers,
  rows,
  selectedHeaders,
  alignment,
}: Props) => {
  const indices = headers.flatMap((header, index) =>
    selectedHeaders.includes(header) ? [index] : []
  );
  return (
    <section
      className={styles["preview-section"]}
      aria-labelledby="preview-title"
    >
      <div className={styles["panel-heading"]}>
        <h2 id="preview-title">テーブルのプレビュー</h2>
        <span className={styles["count"]}>
          {rows.length} 行 × {indices.length} 列
        </span>
      </div>
      {indices.length ? (
        <div
          className={styles["table-scroll"]}
          tabIndex={0}
          role="region"
          aria-label="変換結果の表。横にスクロールできます。"
        >
          <table style={{ textAlign: alignment || "left" }}>
            <caption className={styles["sr-only"]}>
              選択した列のプレビュー
            </caption>
            <thead>
              <tr>
                {indices.map(i => (
                  <th scope="col" key={i}>
                    {headers[i]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r}>
                  {indices.map(c => (
                    <td key={c}>{row[c]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles["empty-preview"]}>
          <span aria-hidden="true">| — | — |</span>
          <p>CSV を入力して列を選ぶと、ここで表を確認できます。</p>
        </div>
      )}
    </section>
  );
};
