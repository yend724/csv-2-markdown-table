import { useState } from "react";

import type { ParsedCSV } from "../../../shared/lib/csv";

export const useHeaderSelector = (parsedCsv: ParsedCSV) => {
  const headers = parsedCsv.headers;
  const [selection, setSelection] = useState({
    headers,
    selectedHeaders: headers,
  });
  const selectedHeaders =
    selection.headers === headers ? selection.selectedHeaders : headers;

  const handleHeaderToggle = (header: string, checked: boolean) => {
    setSelection(prev => {
      const current = prev.headers === headers ? prev.selectedHeaders : headers;
      return {
        headers,
        selectedHeaders: checked
          ? [...current, header]
          : current.filter(col => col !== header),
      };
    });
  };

  return {
    selectedHeaders,
    handleHeaderToggle,
  };
};
