import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, BarChart, Hand, Sigma, Code, PlayCircle, List } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CoursesPage.module.css';

const courseData = [
  { id: 1, title: 'KSL Level 1: Foundations', category: 'KSL', teacher: { name: 'Samuel Kiprop', image: '/assets/images/teacher-1.jpg' }, difficulty: 'Beginner', prerequisites: ['None'], rating: 4.8, reviews: 120, enrolled: true, progress: 75, previewVideo: 'https://www.youtube.com/embed/CrUk8oOPUKM' },
  { id: 2, title: 'Introduction to Algebra', category: 'Mathematics', teacher: { name: 'Dr. Evelyn Wanjiku', image: '/assets/images/founder.jpg' }, difficulty: 'Beginner', prerequisites: ['Basic Arithmetic'], rating: 4.6, reviews: 95, enrolled: false },
  { id: 3, title: 'Vocational Skills: Carpentry', category: 'Vocational', teacher: { name: 'Grace Adhiambo', image: '/assets/images/teacher-2.jpg' }, difficulty: 'Intermediate', prerequisites: ['Safety Basics'], rating: 4.9, reviews: 150, enrolled: true, progress: 30 },
  { id: 4, title: 'Conversational KSL', category: 'KSL', teacher: { name: 'Samuel Kiprop', image: '/assets/images/teacher-1.jpg' }, difficulty: 'Intermediate', prerequisites: ['KSL Level 1'], rating: 4.7, reviews: 88, enrolled: false },
  { id: 5, title: 'Basic ICT Skills', category: 'ICT', teacher: { name: 'Dr. Evelyn Wanjiku', image: '/assets/images/founder.jpg' }, difficulty: 'Beginner', prerequisites: ['None'], rating: 4.5, reviews: 110, enrolled: true, progress: 100 },
  { id: 6, title: 'Advanced Geometry', category: 'Mathematics', teacher: { name: 'Dr. Evelyn Wanjiku', image: '/assets/images/founder.jpg' }, difficulty: 'Advanced', prerequisites: ['Introduction to Algebra'], rating: 4.8, reviews: 75, enrolled: false },
];

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

  const filteredCourses = selectedCategory === 'all'
    ? courseData
    : courseData.filter(course => course.category === selectedCategory);

  const openVideoModal = (url) => setVideoModalUrl(url);
  const closeVideoModal = () => setVideoModalUrl(null);

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
              {filteredCourses.map(course => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.cardImageContainer}>
                    <img src={`/assets/images/courses/course-${course.id}.jpg`} alt={course.title} className={styles.cardImage} />
                    <div className={styles.imageOverlay}>
                      <button className={styles.previewButton} onClick={() => openVideoModal(course.previewVideo)}>
                        <PlayCircle size={48} />
                        <span>KSL Preview</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={`${styles.difficultyBadge} ${styles[course.difficulty.toLowerCase()]}`}>{course.difficulty}</span>
                      <div className={styles.rating}>
                        <Star size={16} className={styles.starIcon} />
                        <span>{course.rating} ({course.reviews} reviews)</span>
                      </div>
                    </div>
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    <div className={styles.teacherInfo}>
                      <img src={course.teacher.image} alt={course.teacher.name} className={styles.teacherImage} />
                      <span>{course.teacher.name}</span>
                    </div>
                    <p className={styles.prerequisites}>
                      <strong>Prerequisites:</strong> {course.prerequisites.join(', ')}
                    </p>
                    {course.enrolled ? (
                      <div className={styles.progressWrapper}>
                        <div className={styles.progressText}>
                          <span>In Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className={styles.progressBarContainer}>
                          <div className={styles.progressBar} style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ) : (
                      <button className={styles.enrollButton}>Enroll Now</button>
                    )}
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