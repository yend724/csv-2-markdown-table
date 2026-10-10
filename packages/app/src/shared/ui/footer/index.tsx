import styles from "../converter.module.css";

export const Footer = () => (
  <footer className={styles["site-footer"]}>
    <span>CSV 2 Markdown Table</span>
    <span>
      Made by YEND ·{" "}
      <a href="https://github.com/yend724/csv-2-markdown-table/blob/main/LICENSE">
        MIT License
      </a>
    </span>
  </footer>
);
