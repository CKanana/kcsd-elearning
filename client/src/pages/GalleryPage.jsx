import React, { useState } from 'react';
import { X } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import styles from './GalleryPage.module.css';

const galleryImages = [
  { id: 1, src: '/assets/images/gallery/gallery-1.jpg', alt: 'Students in a classroom learning sign language' },
  { id: 2, src: '/assets/images/gallery/gallery-2.jpg', alt: 'A student smiling while working on a computer' },
  { id: 3, src: '/assets/images/gallery/gallery-3.jpg', alt: 'Children playing together in the schoolyard' },
  { id: 4, src: '/assets/images/gallery/gallery-4.jpg', alt: 'A teacher guiding a student through a vocational training task' },
  { id: 5, src: '/assets/images/gallery/gallery-5.jpg', alt: 'Students proudly displaying their artwork' },
  { id: 6, src: '/assets/images/gallery/gallery-6.jpg', alt: 'A group photo of students and staff during a school event' },
  { id: 7, src: '/assets/images/gallery/gallery-7.jpg', alt: 'A student engaged in a science experiment' },
  { id: 8, src: '/assets/images/gallery/gallery-8.jpg', alt: 'The school building on a sunny day' },
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
              A glimpse into the vibrant life and community at KCSD.
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.galleryGrid}>
              {galleryImages.map((image) => (
                <div key={image.id} className={styles.galleryItem} onClick={() => openLightbox(image)}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className={styles.itemOverlay}>
                    <span>View Photo</span>
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