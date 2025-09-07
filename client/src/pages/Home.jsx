import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, User, Hand } from 'lucide-react';
import styles from './Home.module.css';


const heroImages = [
  '/assets/images/download.jpg',
  '/assets/images/download (1).jpg',
  '/assets/images/download (2).jpg',
  '/assets/images/images.jpg',
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
      <section className={styles.hero} style={{backgroundImage: `url(${heroImages[heroIndex]})`}}>
        <div className={styles.heroGlass}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hello
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
                <div className={styles.socialIcons}>
                  {/* Social media icons (links to be provided) */}
                  <span className={styles.socialIconPlaceholder} title="Facebook" />
                  <span className={styles.socialIconPlaceholder} title="Twitter" />
                  <span className={styles.socialIconPlaceholder} title="Instagram" />
                </div>
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