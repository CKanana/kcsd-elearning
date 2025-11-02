import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authFetch } from '../services/authService';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';
import styles from './TeacherPages.module.css';

const TeacherManageCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [unitError, setUnitError] = useState('');
  const [unitSuccess, setUnitSuccess] = useState('');
  const [unitLabel, setUnitLabel] = useState('');
  const [unitFile, setUnitFile] = useState(null);
  const unitFileInputRef = useRef();

    // Delete course
    const handleDeleteCourse = async () => {
      if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
      try {
        const res = await authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete course');
        alert('Course deleted successfully');
        navigate('/teacher/courses');
      } catch (err) {
        alert('Error deleting course: ' + err.message);
      }
    };
  useEffect(() => {
    async function fetchData() {
      try {
        const [courseRes, assessmentsRes, studentsRes] = await Promise.all([
          authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}`),
          authFetch(`https://kcsd-elearning.onrender.com/api/assessments?course=${id}`),
          authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/students`)
        ]);
        const courseData = await courseRes.json();
        const assessmentsData = await assessmentsRes.json();
        const studentsData = await studentsRes.json();
        setCourse(courseData);
        setAssessments(assessmentsData);
        setStudents(studentsData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);


  // Upload unit
  const handleUnitUpload = async (e) => {
    e.preventDefault();
    setUnitError('');
    setUnitSuccess('');
    if (!unitFile) {
      setUnitError('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('label', unitLabel);
    formData.append('unitFile', unitFile);
    try {
      const res = await authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/units`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload unit');
      const data = await res.json();
      setCourse(c => ({ ...c, units: [...(c.units || []), data.unit] }));
      setUnitLabel('');
      setUnitFile(null);
      setUnitSuccess('Unit uploaded successfully!');
      setTimeout(() => setUnitSuccess(''), 3000);
      if (unitFileInputRef.current) unitFileInputRef.current.value = '';
    } catch (err) {
      setUnitError(err.message);
    }
  };

  // Delete unit
  const handleDeleteUnit = async (idx) => {
    if (!window.confirm('Delete this unit?')) return;
    try {
      const res = await authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/units/${idx}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete unit');
      setCourse(c => ({ ...c, units: c.units.filter((_, i) => i !== idx) }));
    } catch (err) {
      alert('Error deleting unit: ' + err.message);
    }
  };

  // Edit unit label
  const handleEditUnit = async (idx, newLabel) => {
    try {
      const res = await authFetch(`https://kcsd-elearning.onrender.com/api/courses/${id}/units/${idx}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newLabel })
      });
      if (!res.ok) throw new Error('Failed to update unit');
      setCourse(c => ({ ...c, units: c.units.map((u, i) => i === idx ? { ...u, label: newLabel } : u) }));
    } catch (err) {
      alert('Error updating unit: ' + err.message);
    }
  };

  return (

    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Manage Course</h1>
            <p className={styles.pageSubtitle}>{course ? course.title : 'Loading...'}</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.manageCourseGrid}>
            {/* Left: Course Details Card */}
            <div className={styles.detailsCard}>
              {course ? (
                <>
                  {course.image && (
                    <img src={course.image.startsWith('http') ? course.image : `https://kcsd-elearning.onrender.com${course.image}`} alt={course.title} className={styles.detailsImage} />
                  )}
                  <h2 className={styles.detailsTitle}>{course.title}</h2>
                  <p className={styles.detailsDescription}>{course.description}</p>
                  <div className={styles.detailsMeta}><strong>Category:</strong> {course.category}</div>
                  <div className={styles.detailsMeta}><strong>Teacher:</strong> {course.teacher?.name}</div>
                  <div className={styles.detailsActions}>
                    <button className={styles.actionButtonPrimary} onClick={() => navigate(`/teacher/courses/${id}/students`)}>View Students</button>
                    <button className={styles.actionButtonDanger} onClick={handleDeleteCourse}>Delete Course</button>
                  </div>
                </>
              ) : <div className={styles.loadingText}>Loading course details...</div>}
            </div>

            {/* Right: Management Sections */}
            <div className={styles.managementCards}>
              {/* Units Card */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>Course Units</h3>
                <form onSubmit={handleUnitUpload} className={styles.uploadForm}>
                  <input type="text" placeholder="Unit label" value={unitLabel} onChange={e => setUnitLabel(e.target.value)} className={styles.formInput} required />
                  <input type="file" ref={unitFileInputRef} onChange={e => setUnitFile(e.target.files[0])} className={styles.formInput} required />
                  <button type="submit" className={styles.submitButton}>Upload Unit</button>
                  {unitError && <span className={styles.errorText}>{unitError}</span>}
                  {unitSuccess && <span className={styles.successText}>{unitSuccess}</span>}
                </form>
                {course && Array.isArray(course.units) && course.units.length > 0 ? (
                  <ul className={styles.itemList}>
                    {course.units.map((unit, idx) => (
                      <li key={idx} className={styles.item}>
                        <a href={`https://kcsd-elearning.onrender.com${unit.file}`} target="_blank" rel="noopener noreferrer">{unit.label || unit.file}</a>
                        <div className={styles.itemActions}>
                          <button className={styles.editButton} onClick={() => {
                            const newLabel = prompt('Edit unit label:', unit.label);
                            if (newLabel !== null && newLabel !== unit.label) handleEditUnit(idx, newLabel);
                          }}>Edit</button>
                          <button className={styles.deleteButton} onClick={() => handleDeleteUnit(idx)}>Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <div className={styles.emptyState}>No units uploaded yet.</div>}
              </div>

              {/* Assessments Card */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>Assessments</h3>
                {assessments && assessments.length > 0 ? (
                  <ul className={styles.itemList}>
                    {assessments.filter(a => a.course === id || a.course?._id === id).map(a => (
                      <li key={a._id} className={styles.item}>
                        <span><b>{a.title}</b> ({a.type}) - {a.questions} questions {a.dueDate && <>| Due: {new Date(a.dueDate).toLocaleDateString()}</>}</span>
                      </li>
                    ))}
                  </ul>
                ) : <div className={styles.emptyState}>No assessments for this course.</div>}
              </div>

              {/* Students Card */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>Enrolled Students</h3>
                {students && students.length > 0 ? (
                  <ul className={styles.itemList}>
                    {students.map(s => (
                      <li key={s._id} className={styles.item}>{s.name} ({s.email})</li>
                    ))}
                  </ul>
                ) : <div className={styles.emptyState}>No students enrolled yet.</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherManageCoursePage;
