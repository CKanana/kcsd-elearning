import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import { getMe } from '../services/authService';
import { getAllCourses } from '../services/courseService';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';

const TeacherDashboard = () => {
  const [teacherId, setTeacherId] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get teacher id from /api/auth/me
    const fetchUserAndCourses = async () => {
      try {
        const data = await getMe();
        if (data.user && (data.user._id || data.user.id)) {
          const currentTeacherId = data.user._id || data.user.id;
          setTeacherId(currentTeacherId);

          // Fetch courses and filter them for the current teacher
          const allCourses = await getAllCourses();
          setCourses(
            Array.isArray(allCourses)
              ? allCourses.filter(c => c.teacher && (c.teacher._id === currentTeacherId || c.teacher.id === currentTeacherId))
              : []
          );
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    };
    fetchUserAndCourses();
  }, []);

  return (
    <div>
      <TeacherHeader />
      <main className={dashboardStyles.main}>
        <h1>Teacher Dashboard</h1>
        <section style={{ marginBottom: 32 }}>
          <h2>My Students</h2>
          <p>View student profiles, track their progress, and communicate with them.</p>
          <button
            style={{ background: '#1976d2', color: 'white', padding: '8px 18px', borderRadius: 6, border: 'none', cursor: 'pointer', marginTop: 12 }}
            disabled={courses.length === 0}
            onClick={() => navigate('/teacher/all-students')}
          >Go to Students</button>
        </section>
        <section style={{ marginBottom: 32 }}>
          <h2>My Courses</h2>
          {courses.length > 0 ? (
            <ul>
              {courses.map(course => (
                <li key={course._id} style={{ marginBottom: 12 }}>
                  <b>{course.title}</b> ({course.category})
                  <button
                    style={{ marginLeft: 16, background: '#1976d2', color: 'white', padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
                    onClick={() => navigate(`/teacher/courses/${course._id}/students`)}
                  >Go to Students</button>
                </li>
              ))}
            </ul>
          ) : (
            <div>No courses found.</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
