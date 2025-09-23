import React, { useState, useEffect } from 'react';
import { Plus, FileText, Edit } from 'lucide-react';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import styles from './TeacherPages.module.css';

// No dummy data. Fetch from backend.

const TeacherAssessmentsPage = () => {
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', course: '', type: 'Quiz' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch teacher's courses and assessments
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/courses', { credentials: 'include' }).then(res => res.json()),
      fetch('/api/assessments', { credentials: 'include' }).then(res => res.json())
    ]).then(([coursesData, assessmentsData]) => {
      setCourses(Array.isArray(coursesData) ? coursesData.filter(c => c.teacher && c.teacher._id) : []);
      setAssessments(Array.isArray(assessmentsData) ? assessmentsData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');
    try {
      if (!form.title || !form.course) throw new Error('Title and course are required');
      // For now, just set questions=0, status=Not Started
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          course: form.course,
          type: form.type,
          questions: 0
        })
      });
      if (!res.ok) throw new Error('Failed to create assessment');
      const newAssessment = await res.json();
      setAssessments([newAssessment, ...assessments]);
      setForm({ title: '', course: '', type: 'Quiz' });
      setSuccess('Assessment created!');
    } catch (err) {
      setError(err.message);
    }
    setFormLoading(false);
  };

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
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="assessmentTitle">Title</label>
                    <input type="text" id="assessmentTitle" name="title" placeholder="e.g., Algebra Chapter 2 Quiz" value={form.title} onChange={handleFormChange} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="assessmentCourse">Course</label>
                    <select id="assessmentCourse" name="course" value={form.course} onChange={handleFormChange} required>
                      <option value="">Select a course...</option>
                      {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Type</label>
                    <div className={styles.radioGroup}>
                      <label><input type="radio" name="type" value="Quiz" checked={form.type === 'Quiz'} onChange={handleFormChange} /> Quiz</label>
                      <label><input type="radio" name="type" value="Test" checked={form.type === 'Test'} onChange={handleFormChange} /> Test</label>
                    </div>
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                  {success && <div className={styles.success}>{success}</div>}
                  <button type="submit" className={styles.submitButton} disabled={formLoading}><Plus size={16} /> {formLoading ? 'Creating...' : 'Create & Add Questions'}</button>
                </form>
              </Card>

              {/* Existing Assessments List */}
              <Card title="Existing Assessments">
                {loading ? (
                  <div>Loading assessments...</div>
                ) : assessments.length === 0 ? (
                  <div>No assessments found.</div>
                ) : (
                  <ul className={styles.itemList}>
                    {assessments.map(item => (
                      <li key={item._id}>
                        <FileText size={20} className={styles.itemIcon} />
                        <div className={styles.itemInfo}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemMeta}>{courses.find(c => c._id === item.course)?.title || 'Unknown Course'}</span>
                        </div>
                        <button className={styles.manageButton}><Edit size={16} /></button>
                      </li>
                    ))}
                  </ul>
                )}
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
