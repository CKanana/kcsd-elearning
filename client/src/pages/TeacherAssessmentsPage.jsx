import React, { useState } from 'react';
import { Plus, FileText, Edit } from 'lucide-react';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import styles from './TeacherPages.module.css';

const teacherCourses = [
  { id: 1, title: 'KSL Level 1: Foundations' },
  { id: 2, title: 'Introduction to Algebra' },
];

const existingAssessments = [
    { id: 1, title: 'Algebra Basics Quiz', course: 'Introduction to Algebra', type: 'Quiz' },
    { id: 2, title: 'KSL Unit 1 Test', course: 'KSL Level 1: Foundations', type: 'Test' },
];

const TeacherAssessmentsPage = () => {
  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.pageTitle}>Assessments</h1>
                <p className={styles.pageSubtitle}>Create and manage quizzes and assignments for your courses.</p>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.assessmentLayout}>
              {/* Create Assessment Form */}
              <Card title="Create New Assessment" className={styles.formCard}>
                <form>
                  <div className={styles.inputGroup}>
                    <label htmlFor="assessmentTitle">Title</label>
                    <input type="text" id="assessmentTitle" placeholder="e.g., Algebra Chapter 2 Quiz" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="assessmentCourse">Course</label>
                    <select id="assessmentCourse">
                      <option value="">Select a course...</option>
                      {teacherCourses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Type</label>
                    <div className={styles.radioGroup}>
                      <label><input type="radio" name="type" value="quiz" defaultChecked /> Quiz</label>
                      <label><input type="radio" name="type" value="assignment" /> Assignment</label>
                    </div>
                  </div>
                  <button type="submit" className={styles.submitButton}><Plus size={16} /> Create & Add Questions</button>
                </form>
              </Card>

              {/* Existing Assessments List */}
              <Card title="Existing Assessments">
                <ul className={styles.itemList}>
                  {existingAssessments.map(item => (
                    <li key={item.id}>
                      <FileText size={20} className={styles.itemIcon} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemMeta}>{item.course}</span>
                      </div>
                      <button className={styles.manageButton}><Edit size={16} /></button>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherAssessmentsPage;