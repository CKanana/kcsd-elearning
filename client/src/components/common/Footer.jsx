


import React from "react";
import styles from "../../pages/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerMd}>
        <p className={styles.footerTitle}>
          Kenya Christian School for the Deaf (KCSD)
        </p>
        {/* Social media images removed as requested */}
        <p className={styles.footerText}>
          © 2024 KCSD. Transforming lives through inclusive education.
        </p>
      </div>
    </footer>
  );
}
