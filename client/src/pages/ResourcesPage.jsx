import React, { useState, useEffect } from 'react';
// ...existing code...
import { X, ZoomIn, Book, Download, Video, Link as LinkIcon, FileText, Calendar } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import styles from './GalleryPage.module.css';

const resourceImages = [
  { id: 1, src: '/assets/images/1.jpg', alt: 'Gallery image 1' },
  { id: 2, src: '/assets/images/2.jpg', alt: 'Gallery image 2' },
  { id: 3, src: '/assets/images/3.jpg', alt: 'Gallery image 3' },
  { id: 4, src: '/assets/images/4.jpg', alt: 'Gallery image 4' },
  { id: 5, src: '/assets/images/5.jpg', alt: 'Gallery image 5' },
  { id: 6, src: '/assets/images/6.jpg', alt: 'Gallery image 6' },
  { id: 7, src: '/assets/images/7.jpg', alt: 'Gallery image 7' },
  { id: 8, src: '/assets/images/8.jpg', alt: 'Gallery image 8' },
  { id: 9, src: '/assets/images/9.jpg', alt: 'Gallery image 9' },
  { id: 10, src: '/assets/images/10.jpg', alt: 'Gallery image 10' }
];

const imageSources = resourceImages.map(img => img.src);

const ResourcesPage = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % imageSources.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>
  <HomepageHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Resources</h1>
            <p className={styles.pageSubtitle}>
              Explore our resources, see our students in action, and get a glimpse into life at KCSD.
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>Image Gallery</h2>
            <div className={styles.slideshowContainer}>
              <img 
                src={imageSources[currentSlide]} 
                alt={resourceImages[currentSlide].alt} 
                className={styles.slideshowImage} />
            </div>
          </div>
        </section>

        {/* New Resource Hub Section */}
        <section className={`${styles.section} ${styles.lightBackground}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Resource Hub</h2>
            <p className={styles.pageSubtitle} style={{ color: '#6b7280', marginBottom: '3rem' }}>
              Downloadable guides, videos, and helpful links for our community.
            </p>

            {/* For Parents & Families */}
            <h3 className={styles.resourceCategoryTitle}>For Parents & Families</h3>
            <div className={styles.resourceGrid}>
              <div className={styles.resourceCard}>
                <Book className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Intro to Kenyan Sign Language (KSL)</h4>
                <p className={styles.resourceDescription}>Start your journey into Kenyan Sign Language. This introductory guide is perfect for families, covering the KSL alphabet and essential daily phrases to help you communicate and connect.</p>
              </div>
              <div className={styles.resourceCard}>
                <FileText className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Supporting Visual Learners</h4>
                <p className={styles.resourceDescription}>Discover effective strategies for supporting children who thrive on visual information. This resource provides practical tips and printable templates for creating structured daily routines, reducing anxiety and enhancing comprehension.</p>
              </div>
              <div className={styles.resourceCard}>
                <Video className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Creating a Supportive Home</h4>
                <p className={styles.resourceDescription}>Learn how to create a calm and supportive study space at home. This video tutorial walks you through simple adjustments to create a sensory-friendly environment that helps your child focus and learn effectively.</p>
              </div>
            </div>

            {/* For Educators & The Public */}
            <h3 className={styles.resourceCategoryTitle}>For Educators & The Public</h3>
            <div className={styles.resourceGrid}>
              <div className={styles.resourceCard}>
                <Book className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Our Program Brochure</h4>
                <p className={styles.resourceDescription}>Get a comprehensive look at everything KCSD has to offer. Our brochure details our unique curriculum, specialized programs, and the faith-based approach that makes our school a nurturing place for every child.</p>
              </div>
              <div className={styles.resourceCard}>
                <LinkIcon className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Inclusive Teaching Strategies</h4>
                <p className={styles.resourceDescription}>A valuable resource for educators. This guide offers insights and practical strategies for adapting the Competency-Based Curriculum (CBC) to create an inclusive and effective classroom for deaf and autistic students.</p>
              </div>
              <div className={styles.resourceCard}>
                <Calendar className={styles.resourceIcon} />
                <h4 className={styles.resourceTitle}>Admissions Information</h4>
                <p className={styles.resourceDescription}>Ready to join the KCSD family? This section provides all the information you need about our admissions process, including enrollment requirements, important deadlines, and answers to frequently asked questions.</p>
              </div>
            </div>
          </div>
        </section>

        {lightboxImage && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <button className={styles.closeButton} aria-label="Close image view">
              <X size={32} />
            </button>
            <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
              <img src={lightboxImage.src} alt={lightboxImage.alt} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;