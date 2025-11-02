import React from 'react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import styles from './ProgramsPage.module.css'; // Changed to use its own stylesheet
import { Users, Cpu, Handshake, Briefcase, BookOpen, Award, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: Users,
    title: 'Inclusive E-Learning',
    description: 'Accessible online classes for deaf and autistic children, with personalized support and interactive lessons.'
  },
  {
    icon: Cpu,
    title: 'Assistive Technology',
    description: 'Integration of digital tools and communication aids to enhance learning for all students.'
  },
  {
    icon: Handshake,
    title: 'Family & Educator Consultation',
    description: 'Guidance and resources for parents and teachers to support special needs learners.'
  },
  {
    icon: Briefcase,
    title: 'Vocational Training',
    description: 'Hands-on skills development for independent living and job readiness.'
  },
  {
    icon: BookOpen,
    title: 'Sign Language Programs',
    description: 'Kenyan Sign Language (KSL) courses for children, adults, and professionals.'
  },
  {
    icon: Award,
    title: 'Teacher Training',
    description: 'Professional development for educators in inclusive and special needs education.'
  }
];

const ProgramsPage = () => (
  <div className={styles.page}>
    <HomepageHeader />
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.programGrid}>
            {programs.map((program, idx) => (
              <div key={idx} className={styles.programCard}>
                <div className={styles.programIconWrapper}>
                  <program.icon size={32} />
                </div>
                <h3 className={styles.programCardTitle}>{program.title}</h3>
                <p className={styles.programCardText}>{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightBackground}`}>
        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <div className={styles.contentImage}>
              <img src="/assets/images/7.jpg" alt="Students learning in a classroom" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>Our Educational Approach</h2>
              <p>
                Our curriculum is built on a foundation of inclusivity and innovation. We adapt the Kenyan Competency-Based Curriculum (CBC) to meet the unique needs of deaf and autistic learners, with a strong emphasis on Kenyan Sign Language (KSL). Through our e-learning platform, we provide interactive lessons, personalized feedback, and access to a rich library of digital content. We integrate assistive technologies to ensure every student can fully participate and excel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentLayout_reverse}>
            <div className={styles.contentImage}>
              <img src="/assets/images/tailoring.jpg" alt="Student learning tailoring in a vocational training class" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>Vocational & Life Skills</h2>
              <p>
                Beyond academics, we are committed to preparing our students for independent and fulfilling lives. Our vocational training programs offer hands-on experience in valuable trades such as tailoring, carpentry, and ICT. We focus on developing practical skills, financial literacy, and entrepreneurship, empowering our graduates to build sustainable careers and contribute to their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Join the KCSD Family?</h2>
          <p className={styles.ctaText}>
            We are always excited to welcome new students and families into our community. Submit your email below and our team will contact you with more information about admissions and programs.
          </p>
          <ContactForm />
        </div>
      </section>

    </main>
    <Footer />
  </div>
);


// Simple contact form component
import { useState } from 'react';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit.');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div style={{ color: '#fff', fontWeight: 600, marginTop: '1rem' }}>Thank you! We will contact you soon.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        style={{
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
          border: 'none',
          fontSize: '1.1rem',
          width: 'min(350px, 90vw)'
        }}
        disabled={loading}
      />
      <button type="submit" className={styles.ctaButton} style={{ minWidth: 160 }} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <div style={{ color: '#fff', background: '#ea580c', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>{error}</div>}
    </form>
  );
}

export default ProgramsPage;
