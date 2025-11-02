      {/* Coding Section - full-width, above Vocational & Life Skills, after Our Programs */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <div className={styles.contentImage}>
              <img src="/assets/images/cd.jpg" alt="STEM Coding" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>STEM Education: Coding</h2>
              <p><b>The New Literacy.</b> Coding is becoming the new literacy in our technology-driven world. KCSD offers a comprehensive STEM curriculum to empower students with the skills needed to excel in science, technology, engineering, and mathematics.</p>
              <p><b>STEM-1: Introduction to Coding</b><br />Students learn fundamental principles of coding using Bot, a code-teaching robot. They control it with block coding, quickly acquiring advanced skills and tackling complex functions.</p>
            </div>
          </div>
        </div>
      </section>
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

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Programs</h2>
          <h3 className={styles.sectionSubtitle} style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 500 }}>
            Fostering Communication, Independence, and Self-Expression
          </h3>
          {/* Our Educational Approach - restored section, now under Programs title */}
          <div className={styles.contentLayout_reverse} style={{ marginBottom: '3rem' }}>
            <div className={styles.contentImage}>
              <img src="/assets/images/kids.jpg" alt="Our Educational Approach - Kids" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>Our Educational Approach</h2>
              <p>
                At KCSD, we believe every child deserves a tailored, inclusive education. Our approach blends visual learning, sign language, and hands-on activities to empower deaf and autistic students. We foster a supportive environment where children build confidence, communication skills, and independence.
              </p>
            </div>
          </div>

          {/* STEM Education: Coding - Alternating style */}
          <div className={styles.contentLayout} style={{ marginBottom: '3rem' }}>
            <div className={styles.contentImage}>
              <img src="/assets/images/cd.jpg" alt="STEM Coding" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>STEM Education: Coding</h2>
              <p><b>The New Literacy.</b> Coding is becoming the new literacy in our technology-driven world. KCSD offers a comprehensive STEM curriculum to empower students with the skills needed to excel in science, technology, engineering, and mathematics.</p>
              <p><b>STEM-1: Introduction to Coding</b><br />Students learn fundamental principles of coding using Bot, a code-teaching robot. They control it with block coding, quickly acquiring advanced skills and tackling complex functions.</p>
            </div>
          </div>

          {/* Home Schooling Programme - Alternating style (reverse) */}
          <div className={styles.contentLayout_reverse} style={{ marginBottom: '3rem' }}>
            <div className={styles.contentImage}>
              <img src="/assets/images/pd.png" alt="Home Schooling" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>Home Schooling Programme</h2>
              <p>KCSD Homeschooling and Tuition Centers provide comprehensive programs for families who choose to educate their children at home, tailored to the individual needs and learning styles of each student.</p>
              <p><b>Personalized Learning</b><br />Our experienced instructors guide students through the curriculum, ensuring they develop a strong foundation in core subjects in a comfortable home environment.</p>
            </div>
          </div>

          {/* Holiday Tuition Learning Support - Alternating style */}
          <div className={styles.contentLayout}>
            <div className={styles.contentImage}>
              <img src="/assets/images/hd.jpg" alt="Holiday Tuition" />
            </div>
            <div className={styles.contentText}>
              <h2 className={styles.sectionTitle}>Holiday Tuition Learning Support</h2>
              <p>We offer a variety of tutoring services to support students in a wide range of subjects. Whether a student needs help with math, science, English, Sign Language or French.</p>
              <p><b>Expert Guidance</b><br />Our team of tutors is here to provide expert guidance and support to supplement the students’ schoolwork during holidays.</p>
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
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
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
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
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
      <textarea
        name="question"
        placeholder="Your Message"
        value={form.question}
        onChange={handleChange}
        required
        style={{
          padding: '0.75rem 1.25rem',
          borderRadius: '1rem',
          border: 'none',
          fontSize: '1.1rem',
          width: 'min(350px, 90vw)',
          minHeight: 80
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
