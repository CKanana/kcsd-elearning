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



      {/* What We Do Section - replaces Who We Are */}
      <section style={{ fontFamily: "'Poppins',sans-serif", color: '#222', background: '#f9fafc', padding: '3rem 1rem', maxWidth: 1100, margin: '2rem auto', lineHeight: 1.8, borderRadius: '1.5rem', boxShadow: '0 2px 12px rgba(44,82,130,0.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2c5282', fontSize: '2.2rem', marginBottom: '0.5rem' }}>What We Do</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: 900, margin: 'auto' }}>
            At <strong>KCSD</strong>, we design and deliver <strong>inclusive educational programs</strong> that empower 
            <strong>Deaf and Autistic children</strong> to learn, communicate, and thrive through cooperation and creativity. 
            Our initiatives blend <strong>education, innovation, and advocacy</strong>, building strong bridges between 
            communities, classrooms, and technology to ensure every child’s right to quality, accessible learning.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1.8rem', marginTop: '2rem' }}>
          {/* Education */}
          <div style={{ background: '#edf2f7', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2b6cb0' }}>📚 Education</h2>
            <p>We provide <strong>specialized literacy, numeracy, and communication programs</strong> that integrate 
            sign language, visual aids, and sensory play to strengthen early learning foundations and cognitive development.</p>
            <p>Our curriculum encourages <strong>curiosity, confidence, and a lifelong love of learning</strong> through 
            structured, engaging, and child-centered experiences.</p>
          </div>
          {/* Inclusion */}
          <div style={{ background: '#fefcbf', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#b7791f' }}>🧩 Inclusion</h2>
            <p>Our <strong>physical and online classrooms</strong> are designed to meet the diverse needs of 
            <strong>Deaf and Autistic learners</strong>, fostering communication, empathy, creativity, and confidence.</p>
            <p>Through <strong>personalized teaching methods</strong>, structured routines, and sensory-friendly environments, 
            every learner is supported according to their unique strengths and pace.</p>
          </div>
          {/* Innovation */}
          <div style={{ background: '#e6fffa', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#319795' }}>💡 Innovation</h2>
            <p><strong>KCSD</strong> leads in the development of <strong>assistive technologies, educational apps, and sign language eBooks</strong> 
            that make learning accessible, interactive, and fun.</p>
            <p>Using <strong>visual storytelling, mobile learning, and gamified tools</strong>, we ensure every child has a 
            <strong>voice, agency, and platform for self-expression</strong> in both digital and real-world spaces.</p>
          </div>
          {/* Community */}
          <div style={{ background: '#ebf8ff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2b6cb0' }}>🤝 Community</h2>
            <p>We collaborate with <strong>families, universities, and global partners</strong> to promote inclusive education, 
            share research, and build sustainable support systems for <strong>Deaf and Autistic learners</strong>.</p>
            <p>Our outreach programs inspire <strong>acceptance, partnership, and lifelong learning</strong>, 
            ensuring that inclusion extends beyond the classroom into every aspect of society.</p>
          </div>
        </div>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ color: '#2c5282' }}>🌍 Our Vision</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: 800, margin: 'auto' }}>
            To be <strong>Africa’s leading center for inclusive, technology-driven education</strong> that empowers every 
            <strong>Deaf and Autistic child</strong> to reach their fullest potential and contribute meaningfully to the world.
          </p>
        </div>
        <footer style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.9rem', color: '#555' }}>
          © Kenya Christian School for the Deaf (KCSD) • Empowering Deaf and Autistic Learners through Inclusive Education
        </footer>
      </section>

      {/* Learning Objectives Section (added below Hero) */}
      <section style={{ fontFamily: "'Poppins',sans-serif", color: '#222', background: '#f9fafc', padding: '3rem 1rem', maxWidth: 1100, margin: '2rem auto', lineHeight: 1.8, borderRadius: '1.5rem', boxShadow: '0 2px 12px rgba(44,82,130,0.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2c5282', fontSize: '2.2rem', marginBottom: '0.5rem' }}>Learning Objectives</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: 900, margin: 'auto' }}>
            The <strong>HandStart by Interact-ALL</strong> program builds communication, creativity, and confidence in <strong>Deaf and Autistic learners</strong> through sign language, rhythm, and sensory-based learning.  <br />
            Each objective supports language development, emotional growth, and cognitive readiness for lifelong learning.
          </p>
        </div>
        {/* Early Literacy */}
        <div style={{ background: '#edf2f7', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#2b6cb0' }}>1️⃣ Early Literacy Development</h2> 
          <p>
            Learners will develop foundational <strong>pre-literacy skills</strong> through finger-spelling and signing routine English songs.  <br />
            These activities enhance <strong>vocabulary, comprehension, and cognitive awareness</strong> while integrating early math and science concepts.  <br />
            Finger-spelling supports recognition of alphabet letters and sound-symbol relationships in both <strong>English and Kiswahili</strong>, laying a strong foundation for reading and writing readiness.
          </p>
        </div>
        {/* KSL Integration */}
        <div style={{ background: '#e6fffa', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#319795' }}>2️⃣ Kenyan Sign Language (KSL) Integration</h2>
          <p>
            Through <strong>KSL instruction</strong>, learners strengthen <strong>fine and gross motor skills, writing readiness, cognitive development,</strong> and <strong>social-emotional growth</strong>.  <br />
            <strong>Dr. Charles Okello’s multimodal approach</strong> ensures that language is taught through natural gestures, play, and visual storytelling, helping children express ideas with clarity and confidence.
          </p>
        </div>
        {/* Interaction: Signing with Music */}
        <div style={{ background: '#fefcbf', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#b7791f' }}>3️⃣ Interaction: Signing with Music</h2>
          <p>
            The program combines <strong>sign language, music, and rhythm</strong> to make learning fun, dynamic, and memorable.  <br />
            By engaging the <strong>auditory, visual, and kinesthetic senses</strong>, children improve coordination, focus, and communication while expressing emotions through joyful movement and rhythm.
          </p>
        </div>
        {/* Autistic Learner Focus */}
        <div style={{ background: '#faf5ff', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#6b46c1' }}>🧩 Autistic Learner Focus</h2>
          <p>
            <strong>HandStart</strong> provides a <strong>sensory-friendly environment</strong> tailored to the needs of Autistic learners.  <br />
            It emphasizes <strong>predictable routines, calm visual design,</strong> and <strong>emotionally supportive activities</strong>.  <br />
            Music, rhythm, and signing are used to strengthen <strong>social communication, emotional regulation,</strong> and <strong>sensory integration</strong>.  <br />
            Learners engage with <strong>visuals, tactile materials, and assistive technology</strong> to build comprehension and expressive skills at their own pace.
          </p>
        </div>
        {/* Rationale & Research Foundation */}
        <div style={{ background: '#ebf8ff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#2b6cb0' }}>📖 Rationale & Research Foundation</h2>
          <p>
            The <strong>HandStart by Interact-ALL</strong> approach is grounded in <strong>multimodal learning theory</strong>, combining sign, sound, and movement to enhance comprehension and engagement.  <br />
            This method is supported by research such as  <br />
            <em>“Language Acquisition for Deaf Children: Reducing the Harms of Zero Tolerance to the Use of Alternative Approaches”</em>,  <br />
            which emphasizes the importance of accessible, multi-sensory language exposure for Deaf learners.  <br />
            By integrating these evidence-based practices, KCSD ensures that every learner receives the tools to communicate, connect, and thrive.
          </p>
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
