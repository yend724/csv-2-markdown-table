import type { ParsedCSV } from "../../../shared/lib/csv";
import type { Alignment } from "../../../shared/ui/select-alignment";

const getAlignSymbol = (align: Alignment | "") => {
  switch (align) {
    case "left":
      return ":---";
    case "center":
      return ":---:";
    case "right":
      return "---:";
    default:
      return "---";
  }
};

const escapeCell = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/\r\n|\r|\n/g, "<br>");

const wrap = (text: string) => `|${text}|`;
export const convertCSVToMarkdownTable = (
  csv: ParsedCSV,
  {
    filter,
    alignment = "",
  }: {
    filter: (col: string) => boolean;
    alignment: Alignment | "";
  }
): string => {
  const { headers, body } = csv;

  if (headers.length === 0 && body.length === 0) {
    return "";
  }

  const filteredHeaders = headers.filter(filter);
  if (filteredHeaders.length === 0) return "";
  const headerRow = wrap(
    filteredHeaders.map(header => ` ${escapeCell(header)} `).join("|")
  );
  const separator = wrap(
    filteredHeaders.map(() => ` ${getAlignSymbol(alignment)} `).join("|")
  );
  const bodyRows = body.map(row => {
    return wrap(
      filteredHeaders
        .map(header => ` ${escapeCell(row[header] ?? "")} `)
        .join("|")
    );
  });
  const markdownTable = [headerRow, separator, ...bodyRows].join("\n");

  return markdownTable;
};
