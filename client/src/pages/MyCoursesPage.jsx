import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, PlayCircle } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CoursesPage.module.css'; // Reusing styles is efficient

const MyCoursesPage = () => {
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/my-courses', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEnrolledCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openVideoModal = (url) => setVideoModalUrl(url);
  const closeVideoModal = () => setVideoModalUrl(null);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>My Courses</h1>
            <p className={styles.pageSubtitle}>
              Continue your learning journey and track your progress.
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            {loading ? (
              <div>Loading your courses...</div>
            ) : enrolledCourses.length > 0 ? (
              <div className={styles.courseGrid}>
                {enrolledCourses.map(course => (
                  <div key={course._id} className={styles.courseCard}>
                    <div className={styles.cardImageContainer}>
                      <img src={course.image || '/assets/images/courses/default.jpg'} alt={course.title} className={styles.cardImage} />
                      <div className={styles.imageOverlay}>
                        <button className={styles.previewButton} onClick={() => alert('Resume lesson feature coming soon!')}>
                          <PlayCircle size={48} />
                          <span>Resume Lesson</span>
                        </button>
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{course.title}</h3>
                      {course.teacher && (
                        <div className={styles.teacherInfo}>
                          <img src={course.teacher.profilePhoto || '/assets/images/teacher-profile.jpg'} alt={course.teacher.name} className={styles.teacherImage} />
                          <span>{course.teacher.name}</span>
                        </div>
                      )}
                      <div className={styles.progressWrapper}>
                        <div className={styles.progressText}>
                          <span>In Progress</span>
                          <span>{course.progress || 0}%</span>
                        </div>
                        <div className={styles.progressBarContainer}>
                          <div className={styles.progressBar} style={{ width: `${course.progress || 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h2>You are not enrolled in any courses yet.</h2>
              </div>
            )}
            <div className={styles.exploreMore}>
              <Link to="/courses" className={styles.enrollButton}>Explore Course Catalog</Link>
            </div>
          </div>
        </section>

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

export default MyCoursesPage;