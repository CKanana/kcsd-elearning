import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import { PlayCircle, CalendarDays, MessageSquare, Bell, FileText, Book, HelpCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import ProgressTracker from "../progress/ProgressTracker";
import Achievements from "../progress/Achievements";
import MessageCenter from "../communication/MessageCenter";
import SignLanguageVideo from "../common/SignLanguageVideo";
import Card from '../common/Card';
import styles from './Dashboard.module.css';
import homeStyles from '../../pages/Home.module.css';


export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [resources, setResources] = useState([
    { id: 1, title: "KSL Dictionary", icon: Book, link: "#" },
    { id: 2, title: "Student Handbook", icon: FileText, link: "#" },
    { id: 3, title: "Tech Support", icon: HelpCircle, link: "#" },
  ]);

  useEffect(() => {
    // Fetch user info and dashboard data from backend
  fetch('https://kcsd-elearning.onrender.com/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setCourses(data.courses || []);
        setAssignments(data.assignments || []);
        setSchedule(data.schedule || []);
        setNotifications(data.notifications || []);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // Compute the correct photo URL for display
  const photoUrl = user && user.profilePhoto
    ? user.profilePhoto.startsWith('http')
      ? user.profilePhoto
  : `https://kcsd-elearning.onrender.com${user.profilePhoto}`
    : '/assets/images/student-profile.jpg';

  if (!user) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.loading}>Loading your dashboard...</div>
          </div>
        </main>
        {/* Social media icons removed as requested */}
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Welcome and Profile */}
          <section className={`${styles.welcomeHeader} ${styles.section}`}>
            <img src={photoUrl} alt="Profile" className={styles.profileImage} />
            <div>
              <h1 className={styles.welcomeTitle}>Welcome, {user.name || 'Student'}!</h1>
              <div className={styles.welcomeSubtitle}>Your personalized student dashboard</div>
            </div>
          </section>

          {/* Progress Overview */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Progress Overview</h2>
            <ProgressTracker />
          </section>

          {/* Current Courses Grid */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Current Courses</h2>
              <Link to="/my-courses" className={styles.viewAllLink}>View All <ArrowRight size={16} /></Link>
            </div>
            <div className={styles.grid}>
              {courses.map(course => (
                <Card key={course.id} title={course.title}>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar} style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className={styles.progressText}>{course.progress}% complete</div>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.grid}>
              <Card title="Start Next Lesson" className={styles.actionCard} onClick={() => alert('Starting next lesson...')}>
                <div className={styles.actionIcon}><PlayCircle size={32} /></div>
              </Card>
              <Card title="View Timetable" className={styles.actionCard} onClick={() => alert('Opening timetable...')}>
                <div className={styles.actionIcon}><CalendarDays size={32} /></div>
              </Card>
            </div>
          </section>

          {/* Upcoming Assessments */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Assessments</h2>
              <Link to="/assessments" className={styles.viewAllLink}>View All <ArrowRight size={16} /></Link>
            </div>
            <div className={styles.grid}>
              {assignments.map(assignment => (
                <Card key={assignment.id} title={assignment.title} className={styles.assignmentCard}>
                  <p className={styles.assignmentDetails}>Course: {assignment.course}</p>
                  <p className={styles.assignmentDetails}>Due: {assignment.dueDate}</p>
                  <span className={`${styles.assignmentPriority} ${styles[`priority${assignment.priority}`]}`}>{assignment.priority}</span>
                </Card>
              ))}
            </div>
          </section>

          {/* Calendar below assessments */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Calendar</h2>
            <Card>
              <Calendar />
            </Card>
          </section>

          {/* Resource Hub */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Resource Hub</h2>
            <div className={styles.grid}>
              {resources.map(resource => (
                <Card key={resource.id} title={resource.title} icon={<resource.icon size={24} />} className={styles.resourceCard} onClick={() => window.location.href = resource.link} />
              ))}
            </div>
          </section>

          {/* Contact Us Section (from homepage, with homepage styles) */}
          <section className={`${homeStyles.section} ${homeStyles.sectionOrange}`}>
            <div className={homeStyles.containerMd}>
              <h2 className={homeStyles.sectionTitle}>Contact Us</h2>
              <div className={homeStyles.contactCard}>
                <div className={homeStyles.contactGrid}>
                  <div>
                    <h3 className={homeStyles.contactTitle}>Get in Touch</h3>
                    <div className={homeStyles.contactList}>
                      <div className={homeStyles.contactItem}>
                        <span className={homeStyles.contactIcon}>
                          <MapPin size={20} />
                        </span>
                        <span>P.O. Box 29793, Nairobi, Kenya</span>
                      </div>
                      <div className={homeStyles.contactItem}>
                        <span className={homeStyles.contactIcon}>
                          <Phone size={20} />
                        </span>
                        <span>+254 20 2016563</span>
                      </div>
                      <div className={homeStyles.contactItem}>
                        <span className={homeStyles.contactIcon}>
                          <Mail size={20} />
                        </span>
                        <span>kenyachristianschoolforthedeaf@yahoo.com</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className={homeStyles.cardTitle}>Kenya Christian School for the Deaf</h3>
                    <p className={`${homeStyles.cardText} ${homeStyles.aboutText}`}>
                      Empowering Deaf Children Through Education, Innovation & Inclusion
                    </p>
                    <a 
                      href="http://www.kcsd-abi.or.ke" 
                      className={homeStyles.websiteLink}
                    >
                      Visit our website →
                    </a>
                    <div className={homeStyles.contactLinks}>
                      <a href="/donate" className={homeStyles.ctaButton} target="_blank" rel="noopener noreferrer">Donate / Support Us</a>
                      <a href="/admissions" className={homeStyles.ctaButton} target="_blank" rel="noopener noreferrer">Admissions Information</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
