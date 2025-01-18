interface UseTablePreviewProps {
  headers: string[];
  rows: string[][];
  selectedHeaders: string[];
}

interface UseTablePreviewReturn {
  selectedIndices: number[];
  hasContent: boolean;
  getSelectedColumnData: (rowIndex: number, colIndex: number) => string;
}

export const useTablePreview = ({
  headers,
  rows,
  selectedHeaders,
}: UseTablePreviewProps): UseTablePreviewReturn => {
  const selectedIndices = headers.reduce<number[]>((acc, header, index) => {
    if (selectedHeaders.includes(header)) {
      acc.push(index);
    }
    return acc;
  }, []);

  const hasContent = rows.length > 0 && selectedIndices.length > 0;

  const getSelectedColumnData = (
    rowIndex: number,
    colIndex: number,
  ): string => {
    return rows[rowIndex][colIndex] || "";
  };

  return {
    selectedIndices,
    hasContent,
    getSelectedColumnData,
  };
};
