import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, User, Hand, Facebook, Twitter, Instagram, Youtube, Users, Cpu, Handshake, Briefcase, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import HomepageHeader from '../components/common/HomepageHeader';


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

const teamMembers = [
  {
    name: 'Dr. Evelyn Wanjiku',
    role: 'Founder & Director',
    image: '/assets/images/founder.jpg', // Placeholder image
    bio: 'With over 20 years in special needs education, Dr. Wanjiku founded KCSD to create a world of opportunity for every deaf child.',
    linkedin: 'https://linkedin.com/in/evelynwanjiku'
  },
  {
    name: 'Samuel Kiprop',
    role: 'Head of Curriculum',
    image: '/assets/images/teacher-1.jpg', // Placeholder image
    bio: 'Samuel is a KSL specialist who designs our innovative curriculum to be engaging, accessible, and effective for all learners.',
    linkedin: 'https://linkedin.com/in/samuelkiprop'
  },
  {
    name: 'Grace Adhiambo',
    role: 'Lead Vocational Trainer',
    image: '/assets/images/teacher-2.jpg', // Placeholder image
    bio: 'Grace empowers our students with practical skills, preparing them for independent and successful futures in various trades.',
    linkedin: 'https://linkedin.com/in/graceadhiambo'
  }
];

const KCSDHomepage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

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
      <HomepageHeader />

      {/* Hero Section */}
      <section className={styles.hero} style={{backgroundImage: `url(${heroImages[heroIndex]})`}}>
        <div className={styles.heroGlass}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome to KCSD eLearning
              <span className={styles.heroIcon} aria-label="Sign Language Hand" title="Sign Language">
                <Hand size={64} className={styles.waveHand} />
              </span>
            </h1>
            {/* CTA Buttons - Hero Section */}
            <div className={styles.ctaRow}>
            </div>
            {/* About KCSD */}
            <div className={styles.aboutCardGlass}>
              <h2 className={styles.aboutTitle}>
                At Kenya Christian School For The Deaf, we believe every child deserves the tools to communicate and thrive—regardless of hearing ability.
              </h2>
              <p className={styles.aboutText}>
                Our mission is to empower families through innovative, AI-driven support systems that make sign language learning accessible, engaging, and effective. Our virtual tutors are designed to guide children through personalized sign language practice right from home, reinforcing what they learn in school and helping them build confidence in their communication skills.

                We also recognize parents' vital role in their child's language journey. That’s why our platform includes intuitive AI tools that help parents learn sign language alongside their children. By fostering inclusive communication at home, we strengthen family bonds and create a nurturing environment where every voice spoken or signed is heard and valued.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images Section */}
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <h2 className={styles.sectionTitle}>KCSD in Action</h2>
          <p className={styles.sectionCaption}>
            KCSD transforms lives by empowering deaf children through education, sign language, and community support. See our students and programs in action below.
          </p>
          <div className={styles.featuredGrid}>
            {[
              { src: '/assets/images/media1.png', label: 'Media 1' },
              { src: '/assets/images/media2.png', label: 'Media 2' },
              { src: '/assets/images/media3.webp', label: 'Media 3' },
              { src: '/assets/images/media4.webp', label: 'Media 4' }
            ].map((item, idx) => (
              <div key={item.src} className={styles.featuredItem}>
                <img src={item.src} alt={item.label} className={styles.featuredImg} />
                <div className={styles.featuredLabel}>{item.label}</div>
              </div>
            ))}
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
                width="360"
                height="215"
                src="https://www.youtube.com/embed/PJoo3gh03KI?si=LnU9nOwLl_0xQE3n"
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
      <section id="programs" className={`${styles.section} ${styles.sectionOrange}`}>
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

        {/* Vocational Training Photo Row */}
        <section className={styles.section}>
          <div className={styles.containerMd}>
            <h2 className={styles.sectionTitle}>Vocational Training in Action</h2>
            <p className={styles.sectionCaption}>
              Our vocational training program equips students with practical skills for independent living and employment. Explore how KCSD empowers deaf youth through hands-on learning in real-world trades.
            </p>
            <div className={styles.vocationalPhotoRow}>
              <div className={styles.vocationalPhotoItem}>
                <img src="/assets/images/coding.jpg" alt="Vocational training - coding" className={styles.vocationalPhotoImg} />
                <p className={styles.vocationalPhotoText}>Coding</p>
              </div>
              <div className={styles.vocationalPhotoItem}>
                <img src="/assets/images/tailoring.jpg" alt="Vocational training - tailoring" className={styles.vocationalPhotoImg} />
                <p className={styles.vocationalPhotoText}>Tailoring</p>
              </div>
              <div className={styles.vocationalPhotoItem}>
                <img src="/assets/images/computer-literacy.jpg" alt="Vocational training - computer literacy" className={styles.vocationalPhotoImg} />
                <p className={styles.vocationalPhotoText}>Computer Literacy</p>
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
                      <MapPin size={20} />
                    </span>
                    <span>Address (as listed): Nairobi-West, Langata Rd (adjacent to Hotel Rio)</span>
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
                  At Kenya Christian School For The Deaf, we believe every child deserves the tools to communicate and thrive—regardless of hearing ability. Our mission is to empower families through innovative, AI-driven support systems that make sign language learning accessible, engaging, and effective. Our virtual tutors are designed to guide children through personalized sign language practice right from home, reinforcing what they learn in school and helping them build confidence in their communication skills. We also recognize parents' vital role in their child's language journey. That’s why our platform includes intuitive AI tools that help parents learn sign language alongside their children. By fostering inclusive communication at home, we strengthen family bonds and create a nurturing environment where every voice spoken or signed is heard and valued.
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
              <a href="https://www.facebook.com/profile.php?id=100064637564630" target="_blank" rel="noopener noreferrer" title="Facebook" className={styles.socialIcon}><Facebook size={28} /></a>
              <a href="https://instagram.com/kenyachristianschoolforthedeaf/" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialIcon}><Instagram size={28} /></a>
              <a href="https://www.linkedin.com/in/charles-ngiela-4b0894295/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={styles.socialIcon}><Linkedin size={28} /></a>
              <a href="https://www.youtube.com/@kenyachristianschoolforthe7341" target="_blank" rel="noopener noreferrer" title="YouTube" className={styles.socialIcon}><Youtube size={28} /></a>
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