import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, User } from 'lucide-react';
import styles from './Home.module.css';

const KCSDHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={styles.body}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <h1>KCSD</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className={styles.desktopMenu}>
              <a href="#home" className={styles.navLink}>Home</a>
              <a href="#about" className={styles.navLink}>About</a>
              <a href="#courses" className={styles.navLink}>Courses</a>
              <a href="#gallery" className={styles.navLink}>Gallery</a>
              <a href="#contact" className={styles.navLink}>Contact</a>
              <button className={styles.loginButton}>
                <User size={16} />
                Login / Sign Up
              </button>
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
              <a href="#home" className={styles.mobileNavLink}>Home</a>
              <a href="#about" className={styles.mobileNavLink}>About</a>
              <a href="#courses" className={styles.mobileNavLink}>Courses</a>
              <a href="#gallery" className={styles.mobileNavLink}>Gallery</a>
              <a href="#contact" className={styles.mobileNavLink}>Contact</a>
              <button className={styles.mobileLoginButton}>
                <User size={16} />
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Hello{' '}
            <span className={styles.heroIcon} aria-label="Sign Language Hand" title="Sign Language">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <path d="M12 36c0 4 4 8 8 8s8-4 8-8V12a2 2 0 1 1 4 0v24c0 6.627-5.373 12-12 12S4 42.627 4 36V20a2 2 0 1 1 4 0v16z" fill="#FF6B35"/>
                <rect x="28" y="4" width="4" height="20" rx="2" fill="#2563EB"/>
                <rect x="36" y="8" width="4" height="16" rx="2" fill="#2563EB"/>
              </svg>
            </span>
          </h1>
          
          {/* About KCSD */}
          <div className={styles.aboutCard}>
            <h2 className={styles.aboutTitle}>
              Empowering Deaf Children Through Education, Innovation & Inclusion
            </h2>
            <p className={styles.aboutText}>
              Kenya Christian School for the Deaf (KCSD) is a pioneering institution dedicated to empowering 
              children with hearing impairments. We provide holistic education, comprehensive guidance, and 
              essential life skills to ensure every deaf and hard-of-hearing child can thrive. Founded to meet 
              the unique needs of deaf learners, KCSD fosters an inclusive environment where children excel 
              academically and socially. We also lead innovation in assistive technology and digital content, 
              supporting early sign language acquisition to give every child the tools they need to succeed.
            </p>
          </div>
          
          <div className={styles.videoCard}>
            <h2 className={styles.videoTitle}>YouTube Video</h2>
            <div className={styles.videoPlaceholder}>
              <p>Featured Video Content</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.sectionOrange}`}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Mission</h3>
              <p className={styles.cardText}>
                To provide high-quality, accessible, and inclusive education for deaf and hard-of-hearing children, 
                equipping them with the knowledge, skills, and values to lead meaningful and independent lives.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Vision</h3>
              <p className={styles.cardText}>
                A world where every child, regardless of hearing ability, achieves their full potential 
                in a supportive and inclusive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.section}>
        <div className={`${styles.containerMd} ${styles.textCenter}`}>
          <h2 className={styles.sectionTitle}>Core Values</h2>
          <div className={styles.grid4}>
            {['Inclusion', 'Empowerment', 'Excellence', 'Community'].map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <h3>{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Services */}
      <section id="courses" className={`${styles.section} ${styles.sectionOrange}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Programs & Services</h2>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Academic Education</h3>
              <p className={styles.cardText}>
                Robust curriculum tailored for deaf learners with specialized KSL instruction.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>E-Learning & ICT</h3>
              <p className={styles.cardText}>
                Online sign language training programs for adults and children.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Assistive Technology</h3>
              <p className={styles.cardText}>
                Development of devices and digital content for early sign language acquisition.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Vocational Training</h3>
              <p className={styles.cardText}>
                Hands-on training to prepare students for careers and self-reliance.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Spiritual Development</h3>
              <p className={styles.cardText}>
                Christian-based teaching to nurture moral and ethical values.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Advocacy & Awareness</h3>
              <p className={styles.cardText}>
                Promoting inclusion and understanding through community outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <h2 className={styles.sectionTitle}>Future Goals</h2>
          <div className={styles.grid2}>
            <div className={styles.goalCard}>
              <span className={styles.flexStart}>
                <ChevronRight size={20} />
              </span>
              <p>Expand access by increasing enrollment capacity</p>
            </div>
            <div className={styles.goalCard}>
              <span className={styles.flexStart}>
                <ChevronRight size={20} />
              </span>
              <p>Develop advanced assistive technologies and digital learning tools</p>
            </div>
            <div className={styles.goalCard}>
              <span className={styles.flexStart}>
                <ChevronRight size={20} />
              </span>
              <p>Strengthen partnerships to influence inclusive education policy</p>
            </div>
            <div className={styles.goalCard}>
              <span className={styles.flexStart}>
                <ChevronRight size={20} />
              </span>
              <p>Launch post-graduation programs for job placement and mentorship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className={`${styles.section} ${styles.sectionOrange}`}>
        <div className={styles.containerMd}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactCard}>
            <div className={styles.contactGrid}>
              <div>
                <h3 className={styles.contactTitle}>Get in Touch</h3>
                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <MapPin size={20} />
                    </span>
                    <span>P.O. Box 29793, Nairobi, Kenya</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <Phone size={20} />
                    </span>
                    <span>+254 20 2016563</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <Mail size={20} />
                    </span>
                    <span>kenyachristianschoolforthedeaf@yahoo.com</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Kenya Christian School for the Deaf</h3>
                <p className={`${styles.cardText} ${styles.aboutText}`}>
                  Empowering Deaf Children Through Education, Innovation & Inclusion
                </p>
                <a 
                  href="http://www.kcsd-abi.or.ke" 
                  className={styles.websiteLink}
                >
                  Visit our website →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.containerMd}>
          <p className={styles.footerTitle}>
            Kenya Christian School for the Deaf (KCSD)
          </p>
          <p className={styles.footerText}>
            © 2024 KCSD. Transforming lives through inclusive education.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KCSDHomepage;