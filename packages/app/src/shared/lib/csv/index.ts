import { parse } from "csv-parse/browser/esm";
import type { Result } from "../../model/result";

export type ParsedCSV = { headers: string[]; body: Record<string, string>[] };
export const parseCSV = async (
  csv: string
): Promise<Result<ParsedCSV, string>> => {
  if (!csv.trim()) return { success: true, data: { headers: [], body: [] } };
  return new Promise(resolve => {
    let headers: string[] = [];
    parse(
      csv,
      {
        bom: true,
        columns: header => {
          headers = header;
          return header;
        },
        skip_empty_lines: true,
      },
      (err, body: Record<string, string>[]) => {
        if (err) {
          resolve({
            success: false,
            error:
              "CSV を読み取れませんでした。各行の列数とダブルクォーテーションの閉じ忘れを確認してください。",
          });
        } else if (headers.some(header => !header.trim())) {
          resolve({
            success: false,
            error: "1 行目のすべての列に、見出しを入力してください。",
          });
        } else if (new Set(headers).size !== headers.length) {
          resolve({
            success: false,
            error:
              "同じ見出しが複数あります。列ごとに異なる見出しを付けてください。",
          });
        } else {
          resolve({ success: true, data: { headers, body } });
        }
      }
    );
  });
};
