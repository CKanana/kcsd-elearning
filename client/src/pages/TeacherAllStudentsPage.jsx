import React, { useEffect, useState } from 'react';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';

const TeacherAllStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch aggregated student data from the new endpoint
  fetch('https://kcsd-elearning.onrender.com/api/courses/teacher/my-students', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
  setStudents(Array.isArray(data) ? data.filter(s => s.role === 'student') : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <TeacherHeader />
      <main className={dashboardStyles.main}>
        <h1>All My Students</h1>
        <p>View all students you are teaching, their emails, and the units they are enrolled in.</p>
        {loading ? (
          <div>Loading students...</div>
        ) : students.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left' }}>Units Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 16px' }}>{student.name}</td>
                    <td style={{ padding: '10px 16px' }}>{student.email}</td>
                    <td style={{ padding: '10px 16px' }}>
                      {student.courses && student.courses.length > 0 ? (
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                          {student.courses.flatMap(course =>
                            (course.units || []).map((unit, idx) => (
                              <li key={`${course.title}-${idx}`} style={{ marginBottom: 4 }}>
                                <span style={{ fontWeight: 500 }}>{unit.label}</span> <span style={{ color: '#888' }}>({course.title})</span>
                              </li>
                            ))
                          )}
                        </ul>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No students found.</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherAllStudentsPage;
