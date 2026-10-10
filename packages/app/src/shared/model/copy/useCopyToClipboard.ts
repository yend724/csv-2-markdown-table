import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyToClipboard = (duration = 2000) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timerId.current) clearTimeout(timerId.current);
    },
    []
  );
  const copyToClipboard = useCallback(
    async (text: string) => {
      if (timerId.current) clearTimeout(timerId.current);
      setIsCopied(false);
      setCopyError("");
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        timerId.current = setTimeout(() => setIsCopied(false), duration);
      } catch {
        setCopyError(
          "コピーできませんでした。出力欄のテキストを選択してコピーしてください。"
        );
      }
    },
    [duration]
  );
  return { copyToClipboard, isCopied, copyError };
};
