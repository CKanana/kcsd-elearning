import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import styles from '../../pages/Home.module.css';

const HomepageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.logo}>
            <img src="/assets/images/logo.jpg" alt="KCSD Logo" style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
          </Link>
          
          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.desktopMenuLinks}>
              <Link to="/" className={styles.navLink}>Home</Link>
              <Link to="/about" className={styles.navLink}>About</Link>
              <a href="/#programs" className={styles.navLink}>Programs</a>
              <Link to="/resources" className={styles.navLink}>Resources</Link>
              <a href="/#contact" className={styles.navLink}>Contact</a>
            </div>
            <div className={styles.navActionButtons}>
                <Link to="/auth" className={styles.loginButton}>
                  <User size={16} />
                  Login / Sign Up
                </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className={styles.mobileMenuButton}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <Link to="/" className={styles.mobileNavLink} onClick={toggleMenu}>Home</Link>
            <Link to="/about" className={styles.mobileNavLink} onClick={toggleMenu}>About</Link>
            <a href="/#programs" className={styles.mobileNavLink} onClick={toggleMenu}>Programs</a>
            <Link to="/resources" className={styles.mobileNavLink} onClick={toggleMenu}>Resources</Link>
            <a href="/#contact" className={styles.mobileNavLink} onClick={toggleMenu}>Contact</a>
            <Link to="/auth" className={styles.mobileLoginButton} onClick={toggleMenu}>
              <User size={16} />
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomepageHeader;