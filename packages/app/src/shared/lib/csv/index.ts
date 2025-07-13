import { parse } from "csv-parse/browser/esm";

import type { Result } from "../../model/result";

let csvHeaders: string[] = [];

type CSVBody = Record<string, string>[];
type CSVHeader = string[];
export type ParsedCSV = {
  headers: CSVHeader;
  body: CSVBody;
};
type ParsedCSVResult = Result<ParsedCSV, string>;
export const parseCSV = async (csv: string) => {
  return new Promise<ParsedCSVResult>(resolve => {
    parse(
      csv,
      {
        columns: header => {
          csvHeaders = header;
          return header;
        },
        skip_empty_lines: true,
      },
      (err, data) => {
        if (err) {
          resolve({
            success: false,
            error: err.message,
          });
        } else {
          resolve({
            success: true,
            data: {
              headers: csvHeaders,
              body: data,
            },
          });
        }
      }
    );
  });
};
