import { useCallback, useRef, useState } from "react";

interface UseCopyToClipboardReturn {
  copyToClipboard: (text: string) => Promise<void>;
  isCopied: boolean;
}

export const useCopyToClipboard = (
  duration = 2000,
): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<number | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        timerId.current = setTimeout(() => {
          setIsCopied(false);
        }, duration);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    },
    [duration],
  );

  return {
    copyToClipboard,
    isCopied,
  };
};
