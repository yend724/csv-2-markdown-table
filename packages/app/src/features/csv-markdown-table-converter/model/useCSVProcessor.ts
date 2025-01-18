import { useEffect, useState } from "react";
import { DEFAULT_CSV_INPUT } from "../../../app/config";
import { type ParsedCSV, parseCSV } from "../../../shared/lib/csv";

export const useCSVProcessor = () => {
  const [rawCsv, setRawCsv] = useState<string>(DEFAULT_CSV_INPUT);
  const [parsedCsv, setParsedCsv] = useState<ParsedCSV>({
    headers: [],
    body: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const parsed = await parseCSV(rawCsv);
      if (parsed.success) {
        setErrorMessage("");
        setParsedCsv(parsed.data);
      } else {
        setErrorMessage(parsed.error);
      }
    })();
  }, [rawCsv]);

  return {
    rawCsv,
    setRawCsv,
    parsedCsv,
    errorMessage,
  };
};
