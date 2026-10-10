import { DEFAULT_CSV_INPUT } from "../../app/config";
import { useCSVProcessor } from "../../features/csv-markdown-table-converter/model/useCSVProcessor";
import { useHeaderSelector } from "../../features/csv-markdown-table-converter/model/useHeaderSelector";
import { useMarkdownConverter } from "../../features/csv-markdown-table-converter/model/useMarkdownConverter";
import { CSVInput } from "../../features/csv-markdown-table-converter/ui/CSVInput";
import { HeaderSelector } from "../../features/csv-markdown-table-converter/ui/HeaderSelector";
import { MarkdownOutput } from "../../features/csv-markdown-table-converter/ui/MarkdownOutput";
import { TablePreview } from "../../features/csv-markdown-table-converter/ui/TablePreview";
import { Footer } from "../../shared/ui/footer";
import { Header } from "../../shared/ui/header";

const App = () => {
  const { rawCsv, setRawCsv, parsedCsv, errorMessage, isProcessing } =
    useCSVProcessor();
  const { selectedHeaders, handleHeaderToggle } = useHeaderSelector(parsedCsv);
  const { markdownTable, alignment, handleAlignment } = useMarkdownConverter(
    parsedCsv,
    selectedHeaders,
    ""
  );
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        変換ツールへスキップ
      </a>
      <Header />
      <main id="main">
        <div className="intro">
          <h1>
            CSV <span aria-hidden="true">→</span>
            <span className="sr-only">から</span> Markdown
          </h1>
          <p className="intro-description">
            CSV を貼り付けて、見やすい Markdown の表に。
            <br className="desktop-break" />
            必要な列だけ選んで、そのままコピー。
          </p>
        </div>
        <div className="converter" aria-busy={isProcessing}>
          <div className="input-side">
            <CSVInput
              value={rawCsv}
              onChange={e => setRawCsv(e.target.value)}
              onSample={() => setRawCsv(DEFAULT_CSV_INPUT)}
              onClear={() => setRawCsv("")}
              errorMessage={errorMessage}
            />
            <HeaderSelector
              headers={parsedCsv.headers}
              selectedHeaders={selectedHeaders}
              onHeaderToggle={handleHeaderToggle}
            />
          </div>
          <MarkdownOutput
            value={isProcessing ? "" : markdownTable}
            alignment={alignment}
            onAlignmentChange={handleAlignment}
          />
        </div>
        <TablePreview
          headers={parsedCsv.headers}
          rows={parsedCsv.body.map(row =>
            parsedCsv.headers.map(header => row[header])
          )}
          selectedHeaders={selectedHeaders}
          alignment={alignment}
        />
      </main>
      <Footer />
    </div>
  );
};
export default App;
