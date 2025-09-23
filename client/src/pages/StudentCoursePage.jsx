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

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(setCourse);
    fetch(`/api/assessments?course=${id}`)
      .then(res => res.json())
      .then(setAssessments);
    setLoading(false);
  }, [id]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {loading ? <div>Loading...</div> : course && (
          <>
            <h1>{course.title}</h1>
            {course.image && <img src={course.image.startsWith('http') ? course.image : `http://localhost:3001${course.image}`} alt={course.title} style={{ maxWidth: 300, borderRadius: 8, marginBottom: 8 }} />}
            <p>{course.description}</p>
            <h2>Units</h2>
            {Array.isArray(course.units) && course.units.length > 0 ? (
              <ul>
                {course.units.map((unit, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <a href={`http://localhost:3001${unit.file}`} target="_blank" rel="noopener noreferrer">{unit.label || unit.file}</a>
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
