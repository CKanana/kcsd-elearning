import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User, Hand, Facebook, Twitter, Instagram, Youtube, Users, Cpu, Handshake, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';


const heroImages = [
  '/assets/images/download.jpg',
  '/assets/images/download (1).jpg',
  '/assets/images/download (2).jpg',
  '/assets/images/images.jpg',
];

const futureGoals = [
  {
    icon: Users,
    text: 'Expand access by increasing enrollment capacity'
  },
  {
    icon: Cpu,
    text: 'Develop advanced assistive technologies and digital learning tools'
  },
  {
    icon: Handshake,
    text: 'Strengthen partnerships to influence inclusive education policy'
  },
  {
    icon: Briefcase,
    text: 'Launch post-graduation programs for job placement and mentorship'
  }
];


const KCSDHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // TikTok embed script loader
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.body}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <img src="/assets/images/logo.jpg" alt="KCSD Logo" style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
            </div>
            
            {/* Desktop Menu */}
            <div className={styles.desktopMenu}>
              <div className={styles.desktopMenuLinks}>
                <a href="#home" className={styles.navLink}>Home</a>
                <a href="#about" className={styles.navLink}>About</a>
                <a href="#courses" className={styles.navLink}>Courses</a>
                <a href="#gallery" className={styles.navLink}>Gallery</a>
                <a href="#contact" className={styles.navLink}>Contact</a>
                <Link to="/auth" className={styles.loginButton}>
                  <User size={16} />
                  Login / Sign Up
                </Link>
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
              <a href="#home" className={styles.mobileNavLink}>Home</a>
              <a href="#about" className={styles.mobileNavLink}>About</a>
              <a href="#courses" className={styles.mobileNavLink}>Courses</a>
              <a href="#gallery" className={styles.mobileNavLink}>Gallery</a>
              <a href="#contact" className={styles.mobileNavLink}>Contact</a>
              <Link to="/auth" className={styles.mobileLoginButton} onClick={toggleMenu}>
                <User size={16} />
                Login / Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={styles.hero} style={{backgroundImage: `url(${heroImages[heroIndex]})`}}>
        <div className={styles.heroGlass}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Karibu
              <span className={styles.heroIcon} aria-label="Sign Language Hand" title="Sign Language">
                <Hand size={64} className={styles.waveHand} />
              </span>
            </h1>
            {/* About KCSD */}
            <div className={styles.aboutCardGlass}>
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
          </div>
        </div>
      </section>



      
      {/* Video Section - now below all main sections */}
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <div className={styles.videoCard}>
            <h2 className={styles.videoTitle}>Sign Language Video</h2>
            <div className={styles.videoPlaceholder}>
              {/* YouTube Embed (user provided) */}
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/CrUk8oOPUKM?si=SFE-qR7JxPC80HQU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.sectionOrange}`}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.missionVisionTitle}>Mission</h3>
              <p className={styles.missionVisionText}>
                To provide high-quality, accessible, and inclusive education for deaf and hard-of-hearing children, 
                equipping them with the knowledge, skills, and values to lead meaningful and independent lives.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.missionVisionTitle}>Vision</h3>
              <p className={styles.missionVisionText}>
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
            {[
              {
                value: 'Inclusion',
                desc: 'We embrace diversity and ensure every child feels welcome and valued.'
              },
              {
                value: 'Empowerment',
                desc: 'We equip students with skills and confidence to reach their full potential.'
              },
              {
                value: 'Excellence',
                desc: 'We strive for the highest standards in education and personal growth.'
              },
              {
                value: 'Community',
                desc: 'We foster a supportive environment where everyone collaborates and thrives.'
              }
            ].map((item, index) => (
              <div key={index} className={styles.valueCardFlip}>
                <div className={styles.valueCardInner}>
                  <div className={styles.valueCardFront}>
                    <h3>{item.value}</h3>
                  </div>
                  <div className={styles.valueCardBack}>
                    <p>{item.desc}</p>
                  </div>
                </div>
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
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>Academic Education</h3>
              <p className={styles.missionVisionText}>
                Robust curriculum tailored for deaf learners with specialized KSL instruction.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>E-Learning & ICT</h3>
              <p className={styles.missionVisionText}>
                Online sign language training programs for adults and children.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>Assistive Technology</h3>
              <p className={styles.missionVisionText}>
                Development of devices and digital content for early sign language acquisition.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>Vocational Training</h3>
              <p className={styles.missionVisionText}>
                Hands-on training to prepare students for careers and self-reliance.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>Spiritual Development</h3>
              <p className={styles.missionVisionText}>
                Christian-based teaching to nurture moral and ethical values.
              </p>
            </div>
            <div className={styles.aboutCardGlass}>
              <h3 className={styles.programCardTitle}>Advocacy & Awareness</h3>
              <p className={styles.missionVisionText}>
                Promoting inclusion and understanding through community outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <h2 className={styles.sectionTitle}>Our Vision for the Future</h2>
          <div className={styles.grid2}>
            {futureGoals.map((goal, index) => (
              <div key={index} className={styles.goalCard}>
                <div className={styles.goalIconWrapper}>
                  <goal.icon size={24} />
                </div>
                <p>{goal.text}</p>
              </div>
            ))}
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
                <div className={styles.contactLinks}>
                  <a href="/donate" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">Donate / Support Us</a>
                  <a href="/admissions" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">Admissions Information</a>
                  <a href="/news" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">News & Events</a>
                </div>
              </div>
            </div>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className={styles.socialIcon}><Facebook size={28} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className={styles.socialIcon}><Twitter size={28} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialIcon}><Instagram size={28} /></a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="WhatsApp" className={styles.socialIcon}>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#25D366"/>
                  <path d="M23.472 19.339c-.355-.177-2.104-1.037-2.43-1.155-.326-.119-.563-.177-.8.177-.237.355-.914 1.155-1.12 1.392-.207.237-.412.266-.767.089-.355-.178-1.5-.553-2.86-1.763-1.057-.944-1.77-2.108-1.98-2.463-.207-.355-.022-.546.155-.723.159-.158.355-.414.533-.622.178-.207.237-.355.355-.592.119-.237.06-.444-.03-.622-.089-.178-.8-1.92-1.096-2.63-.289-.695-.583-.601-.8-.612-.207-.009-.444-.011-.681-.011-.237 0-.622.089-.948.444-.326.355-1.24 1.211-1.24 2.951 0 1.74 1.267 3.422 1.444 3.659.178.237 2.5 3.82 6.055 5.207.847.292 1.507.466 2.022.596.849.215 1.624.185 2.236.112.682-.08 2.104-.859 2.402-1.689.296-.83.296-1.541.207-1.689-.089-.148-.326-.237-.681-.414z" fill="#fff"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok" className={styles.socialIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17a5 5 0 1 0 5-5V3h3a5 5 0 0 0 5 5"/><circle cx="9" cy="17" r="5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className={styles.socialIcon}><Youtube size={28} /></a>
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