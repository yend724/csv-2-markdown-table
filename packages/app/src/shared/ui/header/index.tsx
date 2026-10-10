import styles from "../converter.module.css";

export const Header = () => (
  <header className={styles["site-header"]}>
    <a
      className={styles["wordmark"]}
      href="/"
      aria-label="CSV 2 Markdown Table ホーム"
    >
      <img
        className={styles["brand-symbol"]}
        src="/favicon.svg"
        width="28"
        height="28"
        alt=""
        aria-hidden="true"
      />
      <span>CSV 2 Markdown Table</span>
    </a>
    <a
      className={styles["text-link"]}
      href="https://github.com/yend724/csv-2-markdown-table"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub ↗
    </a>
  </header>
);
