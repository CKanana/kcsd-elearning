
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import { useState } from 'react';
import { EBOOK_CHAPTERS } from './constants.ts';
import styles from './ResourcesPage.module.css';

const PageCard = ({ page }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-brand-yellow">
    <h4 className="text-xl font-bold text-brand-dark mb-3">
      <span className="text-2xl mr-3">{page.icon}</span>Page {page.pageNumber}: {page.title}
    </h4>
    <div className="space-y-4">
      {page.childText && (
        <div className="prose prose-lg text-gray-700">
          {page.childText.map((text, index) => <p key={index}>{text}</p>)}
        </div>
      )}
      {page.activityPrompt && (
        <div>
          <h5 className="font-semibold text-brand-teal">Activity:</h5>
          <ul className="list-disc list-inside text-gray-600">
            {page.activityPrompt.map((prompt, index) => <li key={index}>{prompt}</li>)}
          </ul>
        </div>
      )}
      {page.interactiveElement && (
        <div>
          <h5 className="font-semibold text-brand-teal">Interactive Element:</h5>
          <ul className="list-disc list-inside text-gray-600">
            {page.interactiveElement.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}
      {page.signNotes && (
        <div>
          <h5 className="font-semibold text-brand-teal">Sign Language Notes:</h5>
          <ul className="list-disc list-inside text-gray-600">
            {page.signNotes.map((note, index) => <li key={index}>{note}</li>)}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const ChapterView = ({ chapter }) => (
  <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-inner">
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-brand-dark">{chapter.title}</h2>
      <p className="text-lg text-brand-teal mt-1">{chapter.theme}</p>
      <p className="italic text-gray-600 mt-2">"{chapter.goal}"</p>
    </div>
    <div>
      {chapter.pages.map(page => <PageCard key={page.id} page={page} />)}
    </div>
    <div className="mt-10 text-center bg-white text-black p-6 rounded-lg shadow-lg border border-gray-200">
      <h4 className="text-2xl font-bold">End-of-Chapter Summary</h4>
      <ul className="mt-4 space-y-1">
        {chapter.summary.map((item, index) => <li key={index}>✅ {item}</li>)}
      </ul>
      <div className="mt-6">
        <p className="text-lg">You've earned the:</p>
        <p className="font-bold text-2xl text-brand-yellow mt-1">🎖 {chapter.badge} 🎖</p>
      </div>
    </div>
  </div>
);

const ResourcesPage = () => {
  const [selectedChapter, setSelectedChapter] = useState(EBOOK_CHAPTERS[0]);
  return (
    <div className={styles.pageContainer}>
      <HomepageHeader />
      <div className="container mx-auto px-6 py-16 text-black">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">eBook Resources</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            An interactive, child-friendly eBook designed for learning and engagement.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 sticky top-20 z-40">
          <div className="flex flex-wrap justify-center gap-2">
            {EBOOK_CHAPTERS.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 ${
                  selectedChapter.id === chapter.id
                    ? 'bg-brand-blue text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Chapter {chapter.id}
              </button>
            ))}
          </div>
        </div>
        {selectedChapter && <ChapterView chapter={selectedChapter} />}
      </div>

      {/* --- Static eBook and Media Section Below --- */}
      <div className={`container mx-auto px-6 py-16 ${styles.mainContent}`}>
        <section id="dedication" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Dedication</h2>
          <p className={styles.sectionText}>To all children who communicate differently—may this book help the world listen better.</p>
        </section>
        <section id="preface" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Preface</h2>
          <p className={styles.sectionText}>Autism and deafness are both diverse conditions... [full text continues]</p>
        </section>
        <section id="foreword" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Foreword</h2>
          <p className={styles.sectionText}>In many communities, children who are deaf and autistic remain unseen... [full text continues]</p>
        </section>
        <section id="chapter1" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Chapter 1: The Overlap Between Deafness and Autism</h2>
          <h3 className={styles.sectionSubtitle}>1.1 What is Autism?</h3>
          <p className={styles.sectionText}>Autism Spectrum Disorder (ASD)...</p>
          <h3 className={styles.sectionSubtitle}>1.2 What is Deafness?</h3>
          <p className={styles.sectionText}>Deafness refers to partial or complete hearing loss...</p>
          <h3 className={styles.sectionSubtitle}>1.3 When Both Conditions Coexist</h3>
          <p className={styles.sectionText}>Approximately 4–9% of deaf children may also be autistic...</p>
          <div className={styles.videoWrapper}>
            <iframe src="https://www.youtube.com/embed/example" title="Understanding Autism in Deaf Children"></iframe>
          </div>
        </section>
        <section id="practice-media" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Practice Exercises: Visual Media</h2>
          <p className={styles.sectionText}>
            Explore the following media resources to support your learning. These images are used in our practice exercises and activities. Click to view in full size.
          </p>
          <div className={styles.mediaGrid}>
            <div className={styles.mediaCard}>
              <img src={process.env.PUBLIC_URL + '/assets/images/media1.png'} alt="Media 1" className={styles.mediaImage} onClick={() => window.open(process.env.PUBLIC_URL + '/assets/images/media1.png', '_blank')} />
              <strong>media1</strong>
            </div>
            <div className={styles.mediaCard}>
              <img src={process.env.PUBLIC_URL + '/assets/images/media2.png'} alt="Media 2" className={styles.mediaImage} onClick={() => window.open(process.env.PUBLIC_URL + '/assets/images/media2.png', '_blank')} />
              <strong>media2</strong>
            </div>
            <div className={styles.mediaCard}>
              <img src={process.env.PUBLIC_URL + '/assets/images/media3.webp'} alt="Media 3" className={styles.mediaImage} onClick={() => window.open(process.env.PUBLIC_URL + '/assets/images/media3.webp', '_blank')} />
              <strong>media3</strong>
            </div>
          </div>
        </section>
        <section id="chapter8" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Chapter 8: Resources and Further Reading</h2>
          <ul className={`${styles.sectionList} ${styles.sectionText}`}>
            <li><a href="https://www.nad.org/resources/autism/" target="_blank" rel="noopener noreferrer">National Association of the Deaf (NAD)</a></li>
            <li><a href="https://www.autismspeaks.org/tool-kit" target="_blank" rel="noopener noreferrer">Autism Speaks Toolkit</a></li>
            <li><a href="https://www.kise.ac.ke/" target="_blank" rel="noopener noreferrer">Kenya Institute of Special Education (KISE)</a></li>
            <li><a href="https://wfdeaf.org/" target="_blank" rel="noopener noreferrer">World Federation of the Deaf (WFD)</a></li>
          </ul>
        </section>
        <section id="afterword" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>Afterword</h2>
          <p className={styles.sectionText}>Let us remember that communication is more than hearing or speaking—it’s about connection...</p>
        </section>
        <section id="author" className={styles.staticSection}>
          <h2 className={styles.sectionTitle}>About the Author</h2>
          <p className={styles.sectionText}>Dr. C. Okello is a specialist in inclusive education and neurodiversity advocacy...</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage;