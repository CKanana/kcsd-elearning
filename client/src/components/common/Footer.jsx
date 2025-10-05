


import React from "react";
import styles from "../../pages/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerMd}>
        <p className={styles.footerTitle}>
          Kenya Christian School for the Deaf (KCSD)
        </p>
        <div className={styles.socialLinks} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', margin: '1rem 0' }}>
          <a href="https://instagram.com/kenyachristianschoolforthedeaf/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/assets/images/instagram.svg" alt="Instagram" style={{ width: 32, height: 32 }} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100064637564630" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/assets/images/facebook.svg" alt="Facebook" style={{ width: 32, height: 32 }} />
          </a>
          <a href="https://www.linkedin.com/in/charles-ngiela-4b0894295/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/assets/images/linkedin.svg" alt="LinkedIn" style={{ width: 32, height: 32 }} />
          </a>
          <a href="https://www.youtube.com/@kenyachristianschoolforthe7341" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src="/assets/images/youtube.svg" alt="YouTube" style={{ width: 32, height: 32 }} />
          </a>
        </div>
        <p className={styles.footerText}>
          © 2024 KCSD. Transforming lives through inclusive education.
        </p>
      </div>
    </footer>
  );
}
