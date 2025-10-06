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
  const [form, setForm] = useState({ title: '', course: '', type: 'Quiz', startDate: '', dueDate: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quiz question form state
  const [questionForm, setQuestionForm] = useState({ assessmentId: '', questions: [''] });
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionSuccess, setQuestionSuccess] = useState('');
  const [questionError, setQuestionError] = useState('');

  // Delete assessment handler
  const handleDeleteAssessment = async (id) => {
    if (!window.confirm('Delete this assessment?')) return;
    try {
  const res = await fetch(`https://kcsd-elearning.onrender.com/api/assessments/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to delete assessment');
      setAssessments(a => a.filter(asmt => asmt._id !== id));
      alert('Assessment deleted');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Quiz question form handlers
  const handleQuestionChange = (idx, value) => {
    setQuestionForm(qf => ({ ...qf, questions: qf.questions.map((q, i) => i === idx ? value : q) }));
  };
  const addQuestionField = () => {
    setQuestionForm(qf => ({ ...qf, questions: [...qf.questions, ''] }));
  };
  const removeQuestionField = (idx) => {
    setQuestionForm(qf => ({ ...qf, questions: qf.questions.filter((_, i) => i !== idx) }));
  };
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setQuestionLoading(true);
    setQuestionSuccess('');
    setQuestionError('');
    try {
      // Backend logic for saving questions would go here
      setQuestionSuccess('Questions saved (demo only).');
      setQuestionForm({ assessmentId: '', questions: [''] });
    } catch (err) {
      setQuestionError('Error saving questions');
    }
    setQuestionLoading(false);
  };

  // Fetch teacher's courses and assessments
  useEffect(() => {
    setLoading(true);
    Promise.all([
  fetch('https://kcsd-elearning.onrender.com/api/courses', { credentials: 'include' }).then(res => res.json()),
  fetch('https://kcsd-elearning.onrender.com/api/assessments', { credentials: 'include' }).then(res => res.json())
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
  const res = await fetch('https://kcsd-elearning.onrender.com/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          course: form.course,
          type: form.type,
          questions: 0,
          startDate: form.startDate,
          dueDate: form.dueDate
        })
      });
      if (!res.ok) throw new Error('Failed to create assessment');
      const newAssessment = await res.json();
      setAssessments([newAssessment, ...assessments]);
  setForm({ title: '', course: '', type: 'Quiz', startDate: '', dueDate: '' });
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
                    <label htmlFor="assessmentStartDate">Start Date</label>
                    <input type="date" id="assessmentStartDate" name="startDate" value={form.startDate} onChange={handleFormChange} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="assessmentDueDate">End Date</label>
                    <input type="date" id="assessmentDueDate" name="dueDate" value={form.dueDate} onChange={handleFormChange} required />
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
                  <>
                  <ul className={styles.itemList}>
                    {assessments.map(item => (
                      <li key={item._id}>
                        <FileText size={20} className={styles.itemIcon} />
                        <div className={styles.itemInfo}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemMeta}>{courses.find(c => c._id === item.course)?.title || 'Unknown Course'}</span>
                        </div>
                        <button className={styles.manageButton} onClick={() => handleDeleteAssessment(item._id)} style={{ background: '#d32f2f', color: 'white', marginRight: 8 }}>Delete</button>
                        <button className={styles.manageButton} onClick={() => setQuestionForm({ assessmentId: item._id, questions: [''] })}><Edit size={16} /> Add/Edit Questions</button>
                      </li>
                    ))}
                  </ul>
                  {/* Quiz Question Form */}
                  {questionForm.assessmentId && (
                    <Card title="Add/Edit Quiz Questions" className={styles.formCard}>
                      <form onSubmit={handleQuestionSubmit}>
                        {questionForm.questions.map((q, idx) => (
                          <div key={idx} className={styles.inputGroup}>
                            <label>Question {idx + 1}</label>
                            <input type="text" value={q} onChange={e => handleQuestionChange(idx, e.target.value)} required />
                            {questionForm.questions.length > 1 && (
                              <button type="button" onClick={() => removeQuestionField(idx)} style={{ marginLeft: 8 }}>Remove</button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={addQuestionField} style={{ marginBottom: 12 }}>Add Another Question</button>
                        {questionError && <div className={styles.error}>{questionError}</div>}
                        {questionSuccess && <div className={styles.success}>{questionSuccess}</div>}
                        <button type="submit" className={styles.submitButton} disabled={questionLoading}>Save Questions</button>
                      </form>
                    </Card>
                  )}
                  </>
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
