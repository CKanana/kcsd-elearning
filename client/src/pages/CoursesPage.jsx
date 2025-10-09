import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, BarChart, Hand, Sigma, Code, PlayCircle, List } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CoursesPage.module.css';

// No more dummy data. Courses will be fetched from backend.

const categories = [
  { id: 'all', name: 'All Courses', icon: List },
  { id: 'KSL', name: 'KSL', icon: Hand },
  { id: 'Mathematics', name: 'Mathematics', icon: Sigma },
  { id: 'Vocational', name: 'Vocational', icon: Code },
  { id: 'ICT', name: 'ICT', icon: PlayCircle },
];

const CoursesPage = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('https://kcsd-elearning.onrender.com/api/courses', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const openVideoModal = (url) => setVideoModalUrl(url);
  const closeVideoModal = () => setVideoModalUrl(null);

  const handleEnroll = async (courseId) => {
    try {
  const res = await fetch(`https://kcsd-elearning.onrender.com/api/courses/${courseId}/enroll`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to enroll');
      }
      alert('Successfully enrolled!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Explore Our Courses</h1>
            <p className={styles.pageSubtitle}>
              Find the perfect course to expand your knowledge and skills.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.filterBar}>
          <div className={styles.container}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <cat.icon size={18} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.courseGrid}>
              {loading ? (
                <div>Loading courses...</div>
              ) : filteredCourses.length === 0 ? (
                <div>No courses found.</div>
              ) : filteredCourses.map(course => (
                <div key={course._id} className={styles.courseCard}>
                  <div className={styles.cardImageContainer}>
                    <img src={course.image || '/assets/images/courses/default.jpg'} alt={course.title} className={styles.cardImage} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    <div className={styles.teacherInfo}>
                      {course.teacher && course.teacher.profilePhoto && (
                        <img src={course.teacher.profilePhoto} alt={course.teacher.name} className={styles.teacherImage} />
                      )}
                      <span>{course.teacher ? course.teacher.name : 'Unknown Teacher'}</span>
                    </div>
                    <p className={styles.courseDescription}>{course.description}</p>
                    <p className={styles.category}><strong>Category:</strong> {course.category || 'General'}</p>
                    <button onClick={() => handleEnroll(course._id)} className={styles.enrollButton}>Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {videoModalUrl && (
          <div className={styles.modalBackdrop} onClick={closeVideoModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeVideoModal}><X size={28} /></button>
              <div className={styles.videoWrapper}>
                <iframe
                  src={videoModalUrl}
                  title="KSL Course Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;