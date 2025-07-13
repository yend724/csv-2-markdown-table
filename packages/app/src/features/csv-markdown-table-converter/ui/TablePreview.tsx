import { useTablePreview } from "../model/useTablePreview";

import type { Alignment } from "../../../shared/ui/select-alignment";

const TEXT_ALIGNMENT_MAP = {
  left: "left",
  center: "center",
  right: "right",
} as const;

type Props = {
  headers: string[];
  rows: string[][];
  selectedHeaders: string[];
  alignment: Alignment | "";
};
export const TablePreview: React.FC<Props> = ({
  headers,
  rows,
  selectedHeaders,
  alignment,
}) => {
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
      <h2 className="font-semibold">Table Preview</h2>
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-full divide-y divide-gray-200 text-start"
          style={{
            textAlign: alignment ? TEXT_ALIGNMENT_MAP[alignment] : "left",
          }}
        >
          <thead className="bg-gray-50">
            <tr>
              {selectedIndices.map(index => (
                <th
                  key={headers[index]}
                  className="px-4 py-3 font-medium text-gray-600 text-sm"
                >
                  {headers[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((_, rowIndex) => (
              <tr key={rowIndex.toString()}>
                {selectedIndices.map(colIndex => (
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
