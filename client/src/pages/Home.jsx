import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Users, Cpu, Handshake, Briefcase, Linkedin, BookOpen, Laptop, HeartHandshake, Wrench, Sparkles, Megaphone } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';


const heroImages = [
  '/assets/images/4.jpg',
  '/assets/images/8.jpg',
  '/assets/images/11.jpg',
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

const programs = [
  {
    icon: BookOpen,
    title: 'Academic Education',
    description: 'Robust curriculum tailored for deaf learners with specialized KSL instruction.'
  },
  {
    icon: Laptop,
    title: 'E-Learning & ICT',
    description: 'Online sign language training programs for adults and children.'
  },
  {
    icon: HeartHandshake,
    title: 'Assistive Technology',
    description: 'Development of devices and digital content for early sign language acquisition.'
  },
  {
    icon: Wrench,
    title: 'Vocational Training',
    description: 'Hands-on training to prepare students for careers and self-reliance.'
  },
  {
    icon: Sparkles,
    title: 'Spiritual Development',
    description: 'Christian-based teaching to nurture moral and ethical values.'
  },
  {
    icon: Megaphone,
    title: 'Advocacy & Awareness',
    description: 'Promoting inclusion and understanding through community outreach.'
  }
];

const KCSDHomepage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
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
      <section className={styles.hero}>
        <img src={heroImages[heroIndex]} alt="KCSD students in class" className={styles.heroBackgroundImage} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroTextWrapper}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleSmall}>Welcome to</span>
            KCSD E-Learning
          </h1>
          <h2 className={styles.heroSubtitle}>Empowering Every Learner</h2>
          <p className={styles.heroDescription}>
            At Kenya Christian School for the Deaf, we provide inclusive e-learning and physical programs for deaf and autistic children. Our mission is to unlock each child's potential, building the confidence and skills they need to thrive through:
          </p>
          <ul className={styles.heroApproachList}>
            <li>Specialized, visual-first curriculum (CBC & KSL)</li>
            <li>Engaging, hands-on passion projects</li>
            <li>Personalized holistic support with assistive technology</li>
          </ul>
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
                <img src={item.src} alt={item.label} />
                <div className={styles.itemOverlay}>
                  <span>{item.label}</span>
                </div>
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

      {/* Programs & Services */}
      <section id="programs" className={`${styles.section} ${styles.sectionOrange}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Programs & Services</h2>
          <div className={styles.grid3}>
            {programs.map((program, index) => (
              <div key={index} className={styles.programCard}>
                <div className={styles.programIconWrapper}>
                  <program.icon size={32} />
                </div>
                <h3 className={styles.programCardTitle}>{program.title}</h3>
                <p className={styles.programCardText}>
                  {program.description}
                </p>
              </div>
            ))}
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
            <div className={styles.vocationalGrid}>
              {[
                {
                  img: "/assets/images/coding.jpg",
                  title: "Coding & Web Development",
                  desc: "Students learn to build websites and applications, opening doors to careers in the tech industry.",
                  link: "/programs#vocational"
                },
                {
                  img: "/assets/images/tailoring.jpg",
                  title: "Tailoring & Fashion Design",
                  desc: "From design to finished garment, students master the art of tailoring, fostering creativity and entrepreneurship.",
                  link: "/programs#vocational"
                },
                {
                  img: "/assets/images/computer-literacy.jpg",
                  title: "ICT & Computer Literacy",
                  desc: "We provide essential digital skills, ensuring every student is confident and capable in today's digital world.",
                  link: "/programs#vocational"
                }
              ].map((item, index) => (
                <div key={index} className={styles.vocationalCard}>
                  <img src={item.img} alt={item.title} className={styles.vocationalCardImg} />
                  <h3 className={styles.vocationalCardTitle}>{item.title}</h3>
                  <p className={styles.vocationalCardDesc}>{item.desc}</p>
                  <a href={item.link} className={styles.vocationalCardLink}>Learn More →</a>
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