type Props = {
  headers: string[];
  selectedHeaders: string[];
  onHeaderToggle: (header: string, checked: boolean) => void;
};
export const HeaderSelector = ({
  headers,
  selectedHeaders,
  onHeaderToggle,
}: Props) => (
  <section className="column-section" aria-labelledby="columns-title">
    <div className="panel-heading">
      <h2 id="columns-title">出力する列を選択</h2>
      <span className="count">
        {selectedHeaders.length} / {headers.length} 列
      </span>
    </div>
    {headers.length ? (
      <div className="column-options">
        {headers.map((header, index) => (
          <label key={`${index}-${header}`} className="column-option">
            <input
              type="checkbox"
              checked={selectedHeaders.includes(header)}
              onChange={e => onHeaderToggle(header, e.target.checked)}
            />
            <span>{header}</span>
          </label>
        ))}
      </div>
    ) : (
      <p className="muted">CSV を入力すると、選択できる列が表示されます。</p>
    )}
    {headers.length > 0 && selectedHeaders.length === 0 && (
      <p className="field-hint">出力する列を 1 つ以上選んでください。</p>
    )}
  </section>
);
