
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherHeader from '../common/TeacherHeader';
import Footer from '../common/Footer';
import Card from '../common/Card';
import styles from './Dashboard.module.css';
import { BookOpen, Users, ClipboardList, ArrowRight } from 'lucide-react';
import { authFetch } from '../../services/authService';

export default function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await authFetch('https://kcsd-elearning.onrender.com/api/auth/me');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard data');
        setUser(data.user);
        setCourses(data.courses || []);
        setAssignments(data.assignments || []);
        setSchedule(data.schedule || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Compute the correct photo URL for display
  const photoUrl = user && user.profilePhoto
    ? user.profilePhoto.startsWith('http')
      ? user.profilePhoto
      : `https://kcsd-elearning.onrender.com${user.profilePhoto}`
    : '/assets/images/teacher-profile.jpg';

  if (loading) {
    return (
      <div className={styles.page}>
        <TeacherHeader />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.loading}>Loading your dashboard...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <TeacherHeader />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.loading}>Unable to load your dashboard. Please log in again.</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Welcome and Profile */}
          <section className={`${styles.welcomeHeader} ${styles.section}`}>
            <img src={photoUrl} alt="Profile" className={styles.profileImage} />
            <div>
              <h1 className={styles.welcomeTitle}>Welcome, {user.name || 'Teacher'}!</h1>
              <div className={styles.welcomeSubtitle}>Manage your courses, students, and assignments.</div>
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
      <Footer />
    </div>
  );
}