import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeacherHeader from '../common/TeacherHeader';
import Footer from '../common/Footer';
import Card from '../common/Card';
import styles from './Dashboard.module.css';
import { BookOpen, Users, ClipboardList, ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Compute the correct photo URL for display
  const photoUrl = user && user.profilePhoto
    ? user.profilePhoto.startsWith('http')
      ? user.profilePhoto
  : `https://kcsd-elearning.onrender.com${user.profilePhoto}`
    : '/assets/images/teacher-profile.jpg';

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.section}>
            <div className={styles.welcomeHeader}>
              <img src={photoUrl} alt="Profile" className={styles.profileImage} />
              <div>
                <h1 className={styles.welcomeTitle}>Welcome, {user ? user.name : 'Teacher'}!</h1>
                <div className={styles.welcomeSubtitle}>Manage your courses, students, and assignments.</div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.grid}>
              <Link to="/teacher-courses" className={styles.cardLink}>
                <Card title="My Courses" icon={<BookOpen size={32} />}>
                  <p>Manage your course content, view enrollment, and create new courses.</p>
                  <span className={styles.viewAllLink}>Go to Courses <ArrowRight size={16} /></span>
                </Card>
              </Link>
              <Link to="/teacher/all-students" className={styles.cardLink}>
                <Card title="My Students" icon={<Users size={32} />}>
                  <p>View student profiles, track their progress, and communicate with them.</p>
                  <span className={styles.viewAllLink}>Go to Students <ArrowRight size={16} /></span>
                </Card>
              </Link>
              <Link to="/teacher-assessments" className={styles.cardLink}>
                <Card title="Assessments" icon={<ClipboardList size={32} />}>
                  <p>Create new quizzes and assignments, and grade student submissions.</p>
                  <span className={styles.viewAllLink}>Go to Assessments <ArrowRight size={16} /></span>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </main>
      {/* Social media icons removed as requested */}
      <Footer />
    </div>
  );
}