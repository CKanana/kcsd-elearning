
import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CalendarDays, MessageSquare, Bell, FileText, Book, HelpCircle, ArrowRight } from 'lucide-react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import ProgressTracker from "../progress/ProgressTracker";
import Achievements from "../progress/Achievements";
import MessageCenter from "../communication/MessageCenter";
import SignLanguageVideo from "../common/SignLanguageVideo";
import Card from '../common/Card';
import styles from './Dashboard.module.css';

// Mock Data to make the dashboard realistic
const user = {
  name: "Jane Doe",
  profilePhoto: "/assets/images/student-profile.jpg",
};

const courses = [
  { id: 1, title: "Mathematics", progress: 70 },
  { id: 2, title: "English", progress: 45 },
  { id: 3, title: "Science", progress: 90 },
  { id: 4, title: "Kenyan Sign Language (KSL)", progress: 60 },
];

const assignments = [
  { id: 1, title: "Algebra Homework", course: "Mathematics", dueDate: "Sep 15, 2025", priority: "High" },
  { id: 2, title: "Essay on 'The River and the Source'", course: "English", dueDate: "Sep 18, 2025", priority: "Medium" },
];

const schedule = [
    { id: 1, time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Kiprop" },
    { id: 2, time: "09:15 - 10:15", subject: "English", teacher: "Ms. Adhiambo" },
    { id: 3, time: "10:30 - 11:30", subject: "Science", teacher: "Mr. Kiprop" },
];

const notifications = [
  { id: 1, type: 'grade', text: "Your Math assignment has been graded: A", time: "2 hours ago" },
  { id: 2, type: 'announcement', text: "School assembly tomorrow at 10 AM.", time: "1 day ago" },
  { id: 3, type: 'assignment', text: "New Science project has been posted.", time: "2 days ago" },
];

const resources = [
  { id: 1, title: "KSL Dictionary", icon: Book, link: "#" },
  { id: 2, title: "Student Handbook", icon: FileText, link: "#" },
  { id: 3, title: "Tech Support", icon: HelpCircle, link: "#" },
];


export default function StudentDashboard() {

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Welcome and Profile */}
          <section className={`${styles.welcomeHeader} ${styles.section}`}>
            <img src={user.profilePhoto} alt="Profile" className={styles.profileImage} />
            <div>
              <h1 className={styles.welcomeTitle}>Welcome, {user.name}!</h1>
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
              <Card title="Contact Teacher" className={styles.actionCard} onClick={() => alert('Opening messages...')}>
                <div className={styles.actionIcon}><MessageSquare size={32} /></div>
              </Card>
            </div>
          </section>

          {/* Upcoming Assignments & Daily Schedule */}
          <section className={`${styles.grid} ${styles.section}`}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Assessments</h2>
                <Link to="/assessments" className={styles.viewAllLink}>View All <ArrowRight size={16} /></Link>
              </div>
              {assignments.map(assignment => (
                <Card key={assignment.id} title={assignment.title} className={styles.assignmentCard}>
                  <p className={styles.assignmentDetails}>Course: {assignment.course}</p>
                  <p className={styles.assignmentDetails}>Due: {assignment.dueDate}</p>
                  <span className={`${styles.assignmentPriority} ${styles[`priority${assignment.priority}`]}`}>{assignment.priority}</span>
                </Card>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 className={styles.sectionTitle}>Daily Schedule</h2>
              <Card>
                {schedule.map(item => (
                  <div key={item.id} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{item.time}</span>
                    <span className={styles.scheduleSubject}>{item.subject}</span>
                    <span className={styles.scheduleTeacher}>{item.teacher}</span>
                  </div>
                ))}
              </Card>
            </div>
          </section>

          {/* Achievements and Badges */}
          <section className={`${styles.grid} ${styles.section}`}>
            <div style={{ flex: 2, minWidth: 280 }}>
              <h2 className={styles.sectionTitle}>Notifications</h2>
              <Card>
                <div className={styles.notificationList}>
                  {notifications.map(note => (
                    <div key={note.id} className={styles.notificationItem}>
                      <div className={`${styles.notificationIcon} ${styles[`icon_${note.type}`]}`}><Bell size={18} /></div>
                      <div className={styles.notificationText}>
                        <p>{note.text}</p>
                        <small>{note.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 className={styles.sectionTitle}>Resource Hub</h2>
              {resources.map(resource => (
                <Card key={resource.id} title={resource.title} icon={<resource.icon size={24} />} className={styles.resourceCard} onClick={() => window.location.href = resource.link} />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Recent Achievements & Badges</h2>
            <Achievements />
          </section>

          {/* Communication Tools */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Access: Communication</h2>
            <MessageCenter />
          </section>

          {/* Sign Language Video Integration */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sign Language Video</h2>
            <SignLanguageVideo />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
