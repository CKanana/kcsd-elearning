import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, Users, Edit } from 'lucide-react';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import styles from './TeacherPages.module.css';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';

const initialCourses = [
  { id: 1, title: 'KSL Level 1: Foundations', students: 15, description: 'An introductory course to Kenyan Sign Language.' },
  { id: 2, title: 'Introduction to Algebra', students: 12, description: 'Covering the basics of algebraic expressions.' },
];

const TeacherCoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState(initialCourses);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { id: Date.now(), title, description, students: 0 };
    setCourses([newCourse, ...courses]);
    closeModal();
  };

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.pageTitle}>My Courses</h1>
                <p className={styles.pageSubtitle}>Manage your courses and create new ones.</p>
              </div>
              <button onClick={openModal} className={styles.headerButton}><Plus size={20} /> Create New Course</button>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.courseGrid}>
              {courses.map(course => (
                <Card key={course.id} title={course.title} className={styles.courseCard}>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <div className={styles.courseStats}>
                    <Users size={16} /> {course.students} Students Enrolled
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.manageButton}><Edit size={16} /> Manage Course</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {isModalOpen && (
        <div className={dashboardStyles.modalBackdrop}>
          <div className={dashboardStyles.modalContent}>
            <div className={dashboardStyles.modalHeader}>
              <h2>Create New Course</h2>
              <button onClick={closeModal} className={dashboardStyles.closeModalButton}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className={dashboardStyles.modalActions}>
                <button type="button" onClick={closeModal} className={dashboardStyles.cancelButton}>Cancel</button>
                <button type="submit" className={dashboardStyles.submitButton}>Create Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCoursesPage;