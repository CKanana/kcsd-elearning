import React, { useEffect, useState } from 'react';
import { Award, Clock, FileCheck, Percent } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import { getMe } from '../services/authService';
import styles from './AssessmentCenterPage.module.css';


const AssessmentCenterPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAssessments() {
      setLoading(true);
      setError("");
      try {
        // Use the centralized getMe service
        const data = await getMe();
        setAssessments(data.assignments || []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchAssessments();
  }, []);

  const pendingAssessments = assessments.filter(a => a.status !== 'Completed');
  const completedAssessments = assessments.filter(a => a.status === 'Completed');

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
                {loading ? (
                  <div>Loading assessments...</div>
                ) : pendingAssessments.length === 0 ? (
                  <div>No pending assessments found.</div>
                ) : pendingAssessments.map(assessment => (
                  <Card key={assessment._id} title={assessment.title} className={styles.assessmentCard}>
                    <p className={styles.courseName}>{assessment.course && assessment.course.title}</p>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}><FileCheck size={16} /> {assessment.questions} Questions</div>
                      <div className={styles.detailItem}><Clock size={16} /> Due: {assessment.dueDate ? new Date(assessment.dueDate).toLocaleDateString() : 'N/A'}</div>
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
                {loading ? (
                  <div>Loading assessments...</div>
                ) : completedAssessments.length === 0 ? (
                  <div>No completed assessments found.</div>
                ) : completedAssessments.map(assessment => (
                  <Card key={assessment._id} title={assessment.title} className={styles.assessmentCard}>
                    <p className={styles.courseName}>{assessment.course && assessment.course.title}</p>
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