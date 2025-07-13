import { useCallback, useMemo, useState } from "react";

import { convertCSVToMarkdownTable } from "./index";

import type { ParsedCSV } from "../../../shared/lib/csv";
import type { Alignment } from "../../../shared/ui/select-alignment";

export const useMarkdownConverter = (
  parsedCsv: ParsedCSV,
  selectedHeaders: string[],
  alignment: Alignment | ""
) => {
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment | "">(
    alignment
  );
  const handleAlignment = useCallback((alignment: Alignment) => {
    setSelectedAlignment(alignment);
  }, []);

  const markdownTable = useMemo(
    () =>
      convertCSVToMarkdownTable(parsedCsv, {
        filter: col => selectedHeaders.includes(col),
        alignment: selectedAlignment,
      }),
    [parsedCsv, selectedHeaders, selectedAlignment]
  );

  return { markdownTable, alignment: selectedAlignment, handleAlignment };
};
