import assert from "node:assert/strict";
import test from "node:test";
import { parseCSV } from "../packages/app/src/shared/lib/csv/index.ts";
import { convertCSVToMarkdownTable } from "../packages/app/src/features/csv-markdown-table-converter/model/index.ts";
const convert = (data, options = {}) =>
  convertCSVToMarkdownTable(data, {
    filter: () => true,
    alignment: "",
    ...options,
  });

test("quoted commas, multiline cells, Japanese text and BOM", async () => {
  const result = await parseCSV(
    '\uFEFF名前,メモ\r\n田中,"a,b"\r\n佐藤,"line1\nline2"',
  );
  assert.equal(result.success, true);
  assert.deepEqual(result.data, {
    headers: ["名前", "メモ"],
    body: [
      { 名前: "田中", メモ: "a,b" },
      { 名前: "佐藤", メモ: "line1\nline2" },
    ],
  });
  assert.match(convert(result.data), /line1<br>line2/);
});
test("empty input never retains headers from a previous parse", async () => {
  await parseCSV("name\nAlice");
  const result = await parseCSV(" \n");
  assert.deepEqual(result, { success: true, data: { headers: [], body: [] } });
  assert.equal(convert(result.data), "");
});
test("concurrent parses keep their own headers", async () => {
  const results = await Promise.all([parseCSV("a,b\n1,2"), parseCSV("x\n3")]);
  assert.deepEqual(
    results.map((result) => result.data.headers),
    [["a", "b"], ["x"]],
  );
});
test("malformed rows, duplicate and blank headers return actionable errors", async () => {
  for (const input of ["a,b\n1", "a,a\n1,2", ",b\n1,2", 'a\n"unfinished']) {
    const result = await parseCSV(input);
    assert.equal(result.success, false);
    assert.ok(result.error.length > 0);
  }
});
test("column filtering, alignment and zero-column output", async () => {
  const { data } = await parseCSV("name,city\nAlice,Tokyo");
  assert.equal(
    convert(data, { filter: (h) => h === "name", alignment: "center" }),
    "| name |\n| :---: |\n| Alice |",
  );
  assert.equal(convert(data, { filter: () => false }), "");
  assert.match(convert(data, { alignment: "right" }), /---:/);
});
test("pipes and HTML cannot break or inject into Markdown cells", async () => {
  const { data } = await parseCSV('a|b\n"<img src=x>|one\ntwo"');
  assert.equal(
    convert(data),
    "| a\\|b |\n| --- |\n| &lt;img src=x&gt;\\|one<br>two |",
  );
});
test("header-only CSV still produces a table", async () => {
  const { data } = await parseCSV("name,city");
  assert.equal(convert(data), "| name | city |\n| --- | --- |");
});
