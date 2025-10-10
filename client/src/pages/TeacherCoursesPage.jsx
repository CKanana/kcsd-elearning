import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, X, Users, Edit } from 'lucide-react';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import styles from './TeacherPages.module.css';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';


const TeacherCoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [unitLabel, setUnitLabel] = useState('');
  const [unitFile, setUnitFile] = useState(null);
  const unitFileInputRef = useRef();
  const [unitError, setUnitError] = useState('');

  // Fetch teacher's courses on mount
  useEffect(() => {
    setLoading(true);
  fetch('https://kcsd-elearning.onrender.com/api/courses', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        // Only show courses where the logged-in user is the teacher
      const token = localStorage.getItem('jwt');
      fetch('https://kcsd-elearning.onrender.com/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
      fetch('https://kcsd-elearning.onrender.com/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setCategory('');
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Get teacher id from /api/auth/me
      const token = localStorage.getItem('jwt');
      const meRes = await fetch('https://kcsd-elearning.onrender.com/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await meRes.json();
      if (!meRes.ok || !meData.user) throw new Error('Could not get teacher info');
      const teacherId = meData.user.id || meData.user._id;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('teacher', teacherId);
      formData.append('category', category);
      if (image) formData.append('image', image);
      const res = await fetch('https://kcsd-elearning.onrender.com/api/courses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to create course');
      const newCourse = await res.json();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.pageTitle}>My Courses</h1>
                <p className={styles.pageSubtitle}>Manage your courses and create new ones.</p>
              </div>
              <button onClick={openModal} className={styles.headerButton}><Plus size={20} /> Create New Course</button>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.courseGrid}>
              {loading ? (
                <div>Loading courses...</div>
              ) : courses.length === 0 ? (
                <div>No courses found. Create your first course!</div>
              ) : (
                courses.map(course => (
                  <Card key={course._id} title={course.title} className={styles.courseCard}>
                    {course.image && (
                      <img
                        src={course.image.startsWith('http') ? course.image : `https://kcsd-elearning.onrender.com${course.image}`}
                        alt={course.title}
                        className={styles.courseImage}
                        style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                      />
                    )}
                    <p className={styles.courseDescription}>{course.description}</p>
                    <div className={styles.courseStats}>
                      <Users size={16} /> {course.students ? course.students.length : 0} Students Enrolled
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        className={styles.manageButton}
                        onClick={() => navigate(`/teacher/courses/${course._id}/manage`)}
                      >
                        <Edit size={16} /> Manage Course
                      </button>
                      <button
                        className={styles.manageButton}
                        style={{ marginLeft: 8, background: '#1976d2', color: 'white' }}
                        onClick={() => navigate(`/teacher/courses/${course._id}/students`)}
                      >
                        <Users size={16} /> Go to Students
                      </button>
                    </div>
                  </Card>
                ))
              )}
              {error && <div className={dashboardStyles.error}>{error}</div>}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {isModalOpen && (
        <div className={dashboardStyles.modalBackdrop}>
          <div className={dashboardStyles.modalContent}>
            <div className={dashboardStyles.modalHeader}>
              <h2>Create New Course</h2>
              <button onClick={closeModal} className={dashboardStyles.closeModalButton}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="category">Category</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="">Select a category...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Languages">Languages</option>
                  <option value="KSL">KSL</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Technology">Technology</option>
                  <option value="Arts">Arts</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={dashboardStyles.inputGroup}>
                <label htmlFor="image">Course Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={e => setImage(e.target.files[0])}
                />
              </div>
              <div className={dashboardStyles.modalActions}>
                <button type="button" onClick={closeModal} className={dashboardStyles.cancelButton}>Cancel</button>
                <button type="submit" className={dashboardStyles.submitButton}>Create Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCoursesPage;