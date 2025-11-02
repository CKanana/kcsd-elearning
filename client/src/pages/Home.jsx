import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Users, Cpu, Handshake, Briefcase, Linkedin, BookOpen, Laptop, HeartHandshake, Wrench, Sparkles, Megaphone } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

// Contact form component for Home page
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus('Thank you for contacting us! We\'ll get back to you soon.');
        setForm({ name: '', email: '', question: '' });
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setStatus('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <form className={styles.footerContactForm} onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      {status && (
        <div className={status.startsWith('Thank') ? styles.contactSuccess : styles.contactError}>
          {status}
        </div>
      )}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="question"
        placeholder="Your Message"
        value={form.question}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
    </form>
  );
}


// Use a single hero image
const heroImage = '/assets/images/xoxo.png';

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
  // No slideshow needed for single image

  // TikTok embed script loader
  useEffect(() => {
    // This can be kept or removed based on whether you use the TikTok embed.
    // For a full revert, we can assume it was part of the original state.
  }, []);

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <HomepageHeader />

      {/* Hero Section - blue background, overlay, and yellow accent */}
      <section className={styles.sectionBlue} style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 6rem 0' }}>
        <img src={heroImage} alt="KCSD students in class" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontWeight: 800, fontSize: '2.7rem', marginBottom: '1.2rem', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            Kenya Christian School For The Deaf
          </h1>
          <p style={{ fontSize: '1.35rem', color: 'var(--color-brand-yellow)', fontWeight: 600, maxWidth: 600, margin: '0 auto' }}>
            We believe every child deserves the tools to communicate and thrive—regardless of hearing ability.
          </p>
        </div>
      </section>

      {/* Video Section - now below all main sections */}
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <div className={styles.videoCard}>
            <div className={styles.videoTitle}>Let's learn about shapes together! Watch and sign along with us.</div>
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


      {/* Who We Are Section - grid of info cards */}
      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ color: 'var(--color-primary-darkest)', textAlign: 'center', marginBottom: '2.5rem' }}>Who We Are</h2>
          <div className={styles.infoCardGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoCardTitle} style={{ color: 'var(--color-accent)' }}><span className={styles.infoCardIcon} style={{ color: 'var(--color-accent)' }}>🌟</span>Empowering Every Child</div>
              <div className={styles.infoCardText}>
                KCSD is a trailblazing e-learning institution dedicated to transforming the lives of children with hearing impairments and autism. We provide a nurturing, faith-based educational experience that equips every learner with the skills and confidence to flourish.
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoCardTitle} style={{ color: 'var(--color-accent)' }}><span className={styles.infoCardIcon} style={{ color: 'var(--color-accent)' }}>💡</span>Inclusive Learning</div>
              <div className={styles.infoCardText}>
                Founded to meet diverse needs, we embrace each child's individuality. Our curriculum is tailored for both deaf and autistic learners, integrating visual learning, structured routines, and sensory-friendly approaches.
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoCardTitle} style={{ color: 'var(--color-accent)' }}><span className={styles.infoCardIcon} style={{ color: 'var(--color-accent)' }}>💻</span>Innovating Through Technology</div>
              <div className={styles.infoCardText}>
                We are leaders in assistive technology and accessible digital content. From early sign language acquisition to interactive platforms, our programs foster communication, independence, and self-expression.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handstart Initiative Section */}
      <section className={styles.sectionTeal} style={{ padding: '4rem 0' }}>
        <div className={styles.container} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 340px', maxWidth: 480 }}>
            <img src="/assets/images/11.jpg" alt="Children learning" style={{ borderRadius: '1rem', boxShadow: '0 8px 32px 0 rgba(37,99,235,0.12)', width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 340px', maxWidth: 600 }}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1.2rem' }}>Handstart by Interact-ALL</h2>
            <p style={{ fontSize: '1.15rem', marginBottom: '1.1rem', color: '#e0f2fe', fontWeight: 500 }}>
              Handstart tackles the gap in early sign language acquisition for deaf children aged 1-7. We created a low-cost assistive device and mobile app with culturally relevant Kenyan Sign Language content that works offline.
            </p>
            <p style={{ fontSize: '1.15rem', marginBottom: '1.1rem', color: '#e0f2fe' }}>
              What makes us different is our commitment to co-creation. Deaf educators, families, and communities shape everything we build. Handstart is not just a tech product; it’s a movement to ensure that every deaf child starts life with language, love, and dignity.
            </p>
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
                    <span>Hunters junction Off Hunters Road adjacent to clay city secondary school.</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <Phone size={20} />
                    </span>
                    <span>+254 20 2016563</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <Phone size={20} style={{ color: '#25D366' }} />
                    </span>
                    <span>WhatsApp: +254733544246</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      <Mail size={20} />
                    </span>
                    <span>info@kcsd.or.ke</span>
                  </div>
                </div>
                <div className={styles.socialIcons}>
                  <a href="https://www.facebook.com/profile.php?id=100064637564630" target="_blank" rel="noopener noreferrer" title="Facebook" className={styles.socialIcon}><Facebook size={28} /></a>
                  <a href="https://instagram.com/kenyachristianschoolforthedeaf/" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialIcon}><Instagram size={28} /></a>
                  <a href="https://www.linkedin.com/in/charles-ngiela-4b0894295/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={styles.socialIcon}><Linkedin size={28} /></a>
                  <a href="https://www.youtube.com/@kenyachristianschoolforthe7341" target="_blank" rel="noopener noreferrer" title="YouTube" className={styles.socialIcon}><Youtube size={28} /></a>
                </div>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Contact Form</h3>
                <ContactForm />
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
