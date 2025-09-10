import React from 'react';
import { Award, Clock, FileCheck, Percent } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import styles from './AssessmentCenterPage.module.css';

const assessmentsData = [
  { id: 1, title: 'KSL Level 1: Mid-Term Exam', course: 'KSL Level 1', type: 'Test', questions: 50, status: 'Not Started', dueDate: '2025-10-01' },
  { id: 2, title: 'Algebra Basics Quiz', course: 'Introduction to Algebra', type: 'Quiz', questions: 15, status: 'Not Started', dueDate: '2025-09-20' },
  { id: 3, title: 'Workshop Safety Test', course: 'Vocational Skills: Carpentry', type: 'Test', questions: 25, status: 'Completed', score: 92, certificate: true },
  { id: 4, title: 'ICT Fundamentals Final Exam', course: 'Basic ICT Skills', type: 'Test', questions: 60, status: 'Completed', score: 88, certificate: true },
  { id: 5, title: 'Conversational KSL: Unit 3 Quiz', course: 'Conversational KSL', type: 'Quiz', questions: 20, status: 'In Progress', dueDate: '2025-09-25' },
];

const AssessmentCenterPage = () => {
  const pendingAssessments = assessmentsData.filter(a => a.status !== 'Completed');
  const completedAssessments = assessmentsData.filter(a => a.status === 'Completed');

  const getStatusButton = (status) => {
    switch (status) {
      case 'Completed':
        return <button className={`${styles.actionButton} ${styles.resultsButton}`}>View Results</button>;
      case 'In Progress':
        return <button className={`${styles.actionButton} ${styles.continueButton}`}>Continue</button>;
      default:
        return <button className={`${styles.actionButton} ${styles.startButton}`}>Start Now</button>;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Assessment Center</h1>
            <p className={styles.pageSubtitle}>
              Test your knowledge, track your progress, and earn certificates.
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Pending Assessments</h2>
            <div className={styles.assessmentGrid}>
              {pendingAssessments.map(assessment => (
                <Card key={assessment.id} title={assessment.title} className={styles.assessmentCard}>
                  <p className={styles.courseName}>{assessment.course}</p>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}><FileCheck size={16} /> {assessment.questions} Questions</div>
                    <div className={styles.detailItem}><Clock size={16} /> Due: {assessment.dueDate}</div>
                  </div>
                  <span className={`${styles.statusBadge} ${styles[`status${assessment.status.replace(' ', '')}`]}`}>{assessment.status}</span>
                  {getStatusButton(assessment.status)}
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.lightBackground}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Completed Assessments</h2>
            <div className={styles.assessmentGrid}>
              {completedAssessments.map(assessment => (
                <Card key={assessment.id} title={assessment.title} className={styles.assessmentCard}>
                  <p className={styles.courseName}>{assessment.course}</p>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}><Percent size={16} /> Score: <strong>{assessment.score}%</strong></div>
                  </div>
                  <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>{assessment.status}</span>
                  {getStatusButton(assessment.status)}
                  {assessment.certificate && (
                    <button className={styles.certificateButton}>
                      <Award size={16} /> View Certificate
                    </button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentCenterPage;