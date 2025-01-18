interface Props {
  headers: string[];
  selectedHeaders: string[];
  onHeaderToggle: (header: string, checked: boolean) => void;
}

export const HeaderSelector = ({
  headers,
  selectedHeaders,
  onHeaderToggle,
}: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Select Columns</h2>
      <ul className="flex flex-wrap gap-3">
        {headers.map((header, i) => (
          <li key={header}>
            <label
              htmlFor={`${i}-${header}`}
              className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              <input
                id={`${i}-${header}`}
                type="checkbox"
                checked={selectedHeaders.includes(header)}
                onChange={(e) => onHeaderToggle(header, e.target.checked)}
                className="size-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
              <span className="text-sm">{header}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
