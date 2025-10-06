import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';

const TeacherCourseStudentsPage = () => {
  const { id } = useParams(); // course id
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
  const courseRes = await fetch(`https://kcsd-elearning.onrender.com/api/courses/${id}`);
      const courseData = await courseRes.json();
      setCourse(courseData);
  const studentsRes = await fetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/students`);
      const studentsData = await studentsRes.json();
      setStudents(studentsData);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <TeacherHeader />
      <main className={dashboardStyles.main}>
        <h1>Students in {course ? course.title : 'Course'}</h1>
        {loading ? (
          <div>Loading students...</div>
        ) : students.length > 0 ? (
          <div className={dashboardStyles.cardGrid}>
            {students.map(student => (
              <div key={student._id} className={dashboardStyles.card} style={{ minWidth: 220, margin: 12 }}>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>{student.name}</div>
                <div style={{ color: '#555' }}>{student.email}</div>
                {/* Add more student info if available */}
              </div>
            ))}
          </div>
        ) : (
          <div>No students enrolled in this course.</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherCourseStudentsPage;
