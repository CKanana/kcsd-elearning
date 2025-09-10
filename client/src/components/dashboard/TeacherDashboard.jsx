
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherHeader from '../common/TeacherHeader';
import Footer from '../common/Footer';
import Card from '../common/Card';
import styles from './Dashboard.module.css';
import { BookOpen, Users, ClipboardList, ArrowRight } from 'lucide-react';

const initialCourses = [
  { id: 1, title: 'KSL Level 1: Foundations', students: 15 },
  { id: 2, title: 'Introduction to Algebra', students: 12 },
];

const students = [
  { id: 1, name: 'Jane Doe', profilePhoto: '/assets/images/student-profile.jpg' },
  { id: 2, name: 'David O.', profilePhoto: '/assets/images/student-1.jpg' },
  { id: 3, name: 'Grace A.', profilePhoto: '/assets/images/student-2.jpg' },
];

export default function TeacherDashboard() {

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.section}>
            <div className={styles.welcomeHeader}>
              <img src="/assets/images/teacher-profile.jpg" alt="Profile" className={styles.profileImage} />
              <div>
                <h1 className={styles.welcomeTitle}>Welcome, Teacher!</h1>
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
              <Link to="/my-students" className={styles.cardLink}>
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