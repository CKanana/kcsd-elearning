import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import dashboardStyles from '../components/dashboard/Dashboard.module.css';

const TeacherManageCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [unitError, setUnitError] = useState('');
  const [unitLabel, setUnitLabel] = useState('');
  const [unitFile, setUnitFile] = useState(null);
  const unitFileInputRef = useRef();

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(setCourse);
    fetch(`/api/assessments?course=${id}`)
      .then(res => res.json())
      .then(setAssessments);
    fetch(`/api/courses/${id}/students`)
      .then(res => res.json())
      .then(setStudents);
  }, [id]);


  // Upload unit
  const handleUnitUpload = async (e) => {
    e.preventDefault();
    setUnitError('');
    if (!unitFile) {
      setUnitError('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('label', unitLabel);
    formData.append('unitFile', unitFile);
    try {
      const res = await fetch(`/api/courses/${id}/units`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload unit');
      const data = await res.json();
      setCourse(c => ({ ...c, units: [...(c.units || []), data.unit] }));
      setUnitLabel('');
      setUnitFile(null);
      if (unitFileInputRef.current) unitFileInputRef.current.value = '';
    } catch (err) {
      setUnitError(err.message);
    }
  };

  // Delete unit
  const handleDeleteUnit = async (idx) => {
    if (!window.confirm('Delete this unit?')) return;
    try {
      const res = await fetch(`/api/courses/${id}/units/${idx}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to delete unit');
      setCourse(c => ({ ...c, units: c.units.filter((_, i) => i !== idx) }));
    } catch (err) {
      alert('Error deleting unit: ' + err.message);
    }
  };

  // Edit unit label
  const handleEditUnit = async (idx, newLabel) => {
    try {
      const res = await fetch(`/api/courses/${id}/units/${idx}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ label: newLabel })
      });
      if (!res.ok) throw new Error('Failed to update unit');
      setCourse(c => ({ ...c, units: c.units.map((u, i) => i === idx ? { ...u, label: newLabel } : u) }));
    } catch (err) {
      alert('Error updating unit: ' + err.message);
    }
  };

  return (
    <div>
      <TeacherHeader />
      <main className={dashboardStyles.main}>
        <h1>Manage Course</h1>
        {course ? (
          <div style={{ marginBottom: 32 }}>
            <h2>{course.title}</h2>
            {course.image && (
              <img src={course.image.startsWith('http') ? course.image : `http://localhost:3001${course.image}`} alt={course.title} style={{ maxWidth: 300, borderRadius: 8, marginBottom: 8 }} />
            )}
            <p>{course.description}</p>
            <p><b>Category:</b> {course.category}</p>
            <p><b>Teacher:</b> {course.teacher?.name}</p>
          </div>
        ) : <div>Loading course...</div>}

        {/* Units Section */}
        <section style={{ marginBottom: 32 }}>
          <h2>Units</h2>
          <form onSubmit={handleUnitUpload} encType="multipart/form-data" style={{ marginBottom: 16 }}>
            <input type="text" placeholder="Unit label" value={unitLabel} onChange={e => setUnitLabel(e.target.value)} />
            <input type="file" ref={unitFileInputRef} onChange={e => setUnitFile(e.target.files[0])} required />
            <button type="submit">Upload Unit</button>
            {unitError && <span style={{ color: 'red', marginLeft: 8 }}>{unitError}</span>}
          </form>
          {course && Array.isArray(course.units) && course.units.length > 0 ? (
            <ul>
              {course.units.map((unit, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>
                  <a href={`http://localhost:3001${unit.file}`} target="_blank" rel="noopener noreferrer">{unit.label || unit.file}</a>
                  <button style={{ marginLeft: 8 }} onClick={() => handleDeleteUnit(idx)}>Delete</button>
                  <button style={{ marginLeft: 4 }} onClick={() => {
                    const newLabel = prompt('Edit unit label:', unit.label);
                    if (newLabel !== null && newLabel !== unit.label) handleEditUnit(idx, newLabel);
                  }}>Edit</button>
                </li>
              ))}
            </ul>
          ) : <div>No units uploaded yet.</div>}
        </section>

        {/* Assessments Section */}
        <section style={{ marginBottom: 32 }}>
          <h2>Assessments</h2>
          {assessments && assessments.length > 0 ? (
            <ul>
              {assessments.filter(a => a.course === id || a.course?._id === id).map(a => (
                <li key={a._id}>
                  <b>{a.title}</b> ({a.type}) - {a.questions} questions
                  {a.dueDate && <> | Due: {new Date(a.dueDate).toLocaleDateString()}</>}
                </li>
              ))}
            </ul>
          ) : <div>No assessments for this course.</div>}
        </section>

        {/* Students Section */}
        <section>
          <h2>Enrolled Students</h2>
          {students && students.length > 0 ? (
            <ul>
              {students.map(s => (
                <li key={s._id}>{s.name} ({s.email})</li>
              ))}
            </ul>
          ) : <div>No students enrolled yet.</div>}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherManageCoursePage;
