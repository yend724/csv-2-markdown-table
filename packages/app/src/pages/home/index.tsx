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
	const { rawCsv, setRawCsv, parsedCsv, errorMessage } = useCSVProcessor();
	const { selectedHeaders, handleHeaderToggle } = useHeaderSelector(parsedCsv);
	const { markdownTable, handleAlignment } = useMarkdownConverter(
		parsedCsv,
		selectedHeaders,
		"",
	);

	return (
		<div className="grid h-full min-h-svh grid-rows-[auto_1fr_auto] gap-8 px-4 py-8 pb-4">
			<Header />
			<main>
				<div className="mx-auto max-w-7xl">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-4">
							<div className="rounded-lg bg-white p-4 shadow">
								<CSVInput
									value={rawCsv}
									onChange={(e) => setRawCsv(e.target.value)}
									errorMessage={errorMessage}
								/>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<HeaderSelector
									headers={parsedCsv.headers}
									selectedHeaders={selectedHeaders}
									onHeaderToggle={handleHeaderToggle}
								/>
							</div>
						</div>
						<div className="space-y-4">
							<div className="rounded-lg bg-white p-4 shadow">
								<MarkdownOutput
									value={markdownTable}
									onAlignmentChange={handleAlignment}
								/>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<TablePreview
									headers={parsedCsv.headers}
									rows={parsedCsv.body.map((row) =>
										parsedCsv.headers.map((header) => row[header]),
									)}
									selectedHeaders={selectedHeaders}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default App;
