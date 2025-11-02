import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../pages/Home.module.css";

export default function TeacherHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    // Optionally navigate to home or login page
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <img src="/assets/images/logo.jpg" alt="KCSD Logo" style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
          </div>
          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.desktopMenuLinks}>
              <Link to="/teacher-dashboard" className={styles.navLink}>Dashboard</Link>
              <Link to="/teacher-courses" className={styles.navLink}>Courses</Link>
              <Link to="/teacher-profile" className={styles.navLink}>Profile</Link>
              <button onClick={handleLogout} className={styles.loginButton}>
                <User size={16} />
                Logout
              </button>
            </div>
          </div>
          {/* Mobile menu button */}
          <div>
            <button onClick={toggleMenu} className={styles.mobileMenuButton}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <Link to="/teacher-dashboard" className={styles.mobileNavLink} onClick={toggleMenu}>Dashboard</Link>
            <Link to="/teacher-courses" className={styles.mobileNavLink} onClick={toggleMenu}>Courses</Link>
            <Link to="/teacher-profile" className={styles.mobileNavLink} onClick={toggleMenu}>Profile</Link>
            <button onClick={handleLogout} className={styles.mobileLoginButton} onClick={toggleMenu}>
              <User size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
