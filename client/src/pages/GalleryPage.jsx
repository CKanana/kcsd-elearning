import React, { useState } from 'react';
// ...existing code...
import { X } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import styles from './GalleryPage.module.css';

const galleryImages = [
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

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className={styles.page}>
      <HomepageHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Our Gallery</h1>
            <p className={styles.pageSubtitle}>
              The integration of the four subjects into a cohesive, interdisciplinary and applied learning approach. This isn't academic theory—STEM education includes the appropriate real-world application and teaching methods. As a result, learners in any subject can benefit from STEM education.
            </p>
            {/* Removed old gallery subtitle as requested */}
          </div>
        </div>

                    <section className={styles.section}>
                      <div className={styles.container}>
                        <div className={styles.galleryGrid}>
                          {galleryImages.map((image) => (
                            <div key={image.id} className={styles.galleryItem}>
                              <div className={styles.imgWrapper}>
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  onClick={() => openLightbox(image)}
                                />
                                <div className={styles.imgOverlay} onClick={() => openLightbox(image)}>
                                  <span className={styles.overlayIcon}>
                                    {/* Magnifying glass SVG */}
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                  </span>
                                  <span className={styles.overlayText}>View</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
          </div>
        </section>

        {selectedImage && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <button className={styles.closeButton} aria-label="Close image view">
              <X size={32} />
            </button>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;