import type { ParsedCSV } from "../../../shared/lib/csv";

const wrap = (text: string) => `|${text}|`;
export const convertCSVToMarkdownTable = (
  csv: ParsedCSV,
  {
    filter,
  }: {
    filter: (col: string) => boolean;
  },
): string => {
  const { headers, body } = csv;

  if (headers.length === 0 && body.length === 0) {
    return "";
  }

  const filteredHeaders = headers.filter(filter);
  const headerRow = wrap(
    filteredHeaders.map((header) => ` ${header} `).join("|"),
  );
  const separator = wrap(filteredHeaders.map(() => " --- ").join("|"));
  const bodyRows = body.map((row) => {
    return wrap(filteredHeaders.map((header) => ` ${row[header]} `).join("|"));
  });
  const markdownTable = [headerRow, separator, ...bodyRows].join("\n");

  return markdownTable;
};
