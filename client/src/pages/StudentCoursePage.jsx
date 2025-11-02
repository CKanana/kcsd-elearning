import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CoursesPage.module.css';

const StudentCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    fetch(`https://kcsd-elearning.onrender.com/api/courses/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(setCourse);
    fetch(`https://kcsd-elearning.onrender.com/api/assessments?course=${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(setAssessments);
    fetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/students`, { credentials: 'include' })
      .then(res => res.json())
      .then(setEnrolledStudents);
    setLoading(false);
  }, [id]);

  const [unenrollLoading, setUnenrollLoading] = useState(false);
  const [unenrollSuccess, setUnenrollSuccess] = useState('');
  const [unenrollError, setUnenrollError] = useState('');

  const handleUnenroll = async () => {
    setUnenrollLoading(true);
    setUnenrollSuccess('');
    setUnenrollError('');
    try {
  const res = await fetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/unenroll`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unenroll failed');
      setUnenrollSuccess('You have been unenrolled from this course.');
    } catch (err) {
      setUnenrollError(err.message);
    }
    setUnenrollLoading(false);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {loading ? <div>Loading...</div> : course && (
          <>
            <h1>{course.title}</h1>
            {course.image && <img src={course.image.startsWith('http') ? course.image : `https://kcsd-elearning.onrender.com${course.image}`} alt={course.title} style={{ maxWidth: 300, borderRadius: 8, marginBottom: 8 }} />}
            <p>{course.description}</p>
            <button
              style={{ background: '#ea580c', color: 'white', fontWeight: 700, padding: '0.5rem 1.5rem', borderRadius: '2rem', border: 'none', margin: '1rem 0', cursor: 'pointer', fontSize: '1rem' }}
              onClick={handleUnenroll}
              disabled={unenrollLoading}
            >
              {unenrollLoading ? 'Unenrolling...' : 'Unenroll from Course'}
            </button>
            {unenrollSuccess && <div style={{ color: 'green', marginBottom: 8 }}>{unenrollSuccess}</div>}
            {unenrollError && <div style={{ color: 'red', marginBottom: 8 }}>{unenrollError}</div>}
            <h2>Enrolled Students</h2>
            {enrolledStudents && enrolledStudents.length > 0 ? (
              <ul>
                {enrolledStudents.map(s => (
                  <li key={s._id}>{s.name} ({s.email})</li>
                ))}
              </ul>
            ) : <div>No students enrolled yet.</div>}

            <h2>Units</h2>
            {Array.isArray(course.units) && course.units.length > 0 ? (
              <ul>
                {course.units.map((unit, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <a href={`https://kcsd-elearning.onrender.com${unit.file}`} target="_blank" rel="noopener noreferrer">{unit.label || unit.file}</a>
                  </li>
                ))}
              </ul>
            ) : <div>No units uploaded yet.</div>}
            <h2>Assessments</h2>
            {assessments && assessments.length > 0 ? (
              <ul>
                {assessments.filter(a => a.course === id || a.course?._id === id).map(a => (
                  <li key={a._id}>
                    <b>{a.title}</b> ({a.type}) - {a.questions} questions
                    {a.dueDate && <> | Due: {new Date(a.dueDate).toLocaleDateString()}</>}
                    <button style={{ marginLeft: 8 }} onClick={() => alert('Quiz/assessment feature coming soon!')}>Take Quiz</button>
                  </li>
                ))}
              </ul>
            ) : <div>No assessments for this course.</div>}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudentCoursePage;
