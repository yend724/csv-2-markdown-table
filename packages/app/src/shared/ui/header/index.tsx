export const Header: React.FC = () => {
  return (
    <header className="mx-auto w-full max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">CSV 2 Markdown Table</h1>
        <a
          href="https://github.com/yend724/csv-2-markdown-table"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sky-600 text-sm underline hover:no-underline"
        >
          GitHub
        </a>
      </div>
    </header>
  );
};
