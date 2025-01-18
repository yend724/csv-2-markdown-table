import { useTablePreview } from "../model/useTablePreview";

interface Props {
  headers: string[];
  rows: string[][];
  selectedHeaders: string[];
}

export const TablePreview = ({ headers, rows, selectedHeaders }: Props) => {
  const { selectedIndices, hasContent, getSelectedColumnData } =
    useTablePreview({
      headers,
      rows,
      selectedHeaders,
    });

  if (!hasContent) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">プレビュー</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectedIndices.map((index) => (
                <th
                  key={headers[index]}
                  className="px-4 py-3 text-left font-medium text-gray-600 text-sm"
                >
                  {headers[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((_, rowIndex) => (
              <tr key={rowIndex.toString()}>
                {selectedIndices.map((colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="whitespace-nowrap px-4 py-3 text-gray-600 text-sm"
                  >
                    {getSelectedColumnData(rowIndex, colIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
