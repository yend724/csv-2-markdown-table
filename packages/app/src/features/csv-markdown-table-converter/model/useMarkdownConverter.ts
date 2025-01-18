import { useMemo } from "react";
import type { ParsedCSV } from "../../../shared/lib/csv";
import { convertCSVToMarkdownTable } from "./index";

export const useMarkdownConverter = (
  parsedCsv: ParsedCSV,
  selectedHeaders: string[],
) => {
  const markdownTable = useMemo(
    () =>
      convertCSVToMarkdownTable(parsedCsv, {
        filter: (col) => selectedHeaders.includes(col),
      }),
    [parsedCsv, selectedHeaders],
  );

  return markdownTable;
};
