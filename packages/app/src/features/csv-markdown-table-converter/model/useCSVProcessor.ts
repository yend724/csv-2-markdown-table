import { useEffect, useState } from "react";
import { DEFAULT_CSV_INPUT } from "../../../app/config";
import { type ParsedCSV, parseCSV } from "../../../shared/lib/csv";

const EMPTY_CSV: ParsedCSV = { headers: [], body: [] };
export const useCSVProcessor = () => {
  const [rawCsv, setRawCsv] = useState(DEFAULT_CSV_INPUT);
  const [result, setResult] = useState<{
    input: string | null;
    data: ParsedCSV;
    error: string;
  }>({
    input: null,
    data: EMPTY_CSV,
    error: "",
  });
  useEffect(() => {
    let cancelled = false;
    void parseCSV(rawCsv).then(parsed => {
      if (!cancelled)
        setResult({
          input: rawCsv,
          data: parsed.success ? parsed.data : EMPTY_CSV,
          error: parsed.success ? "" : parsed.error,
        });
    });
    return () => {
      cancelled = true;
    };
  }, [rawCsv]);
  const isProcessing = result.input !== rawCsv;
  return {
    rawCsv,
    setRawCsv,
    isProcessing,
    parsedCsv: isProcessing ? EMPTY_CSV : result.data,
    errorMessage: isProcessing ? "" : result.error,
  };
};
