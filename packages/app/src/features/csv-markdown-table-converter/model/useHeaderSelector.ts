import { useEffect, useState } from "react";
import type { ParsedCSV } from "../../../shared/lib/csv";

export const useHeaderSelector = (parsedCsv: ParsedCSV) => {
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);

  useEffect(() => {
    setSelectedHeaders(parsedCsv.headers);
  }, [parsedCsv.headers]);

  const handleHeaderToggle = (header: string, checked: boolean) => {
    if (checked) {
      setSelectedHeaders((prev) => [...prev, header]);
    } else {
      setSelectedHeaders((prev) => prev.filter((col) => col !== header));
    }
  };

  return {
    selectedHeaders,
    handleHeaderToggle,
  };
};
