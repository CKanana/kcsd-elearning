import React, { useState } from 'react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import { EBOOK_CHAPTERS } from './constants';
import { EbookChapter, EbookPage } from './types';

const PageCard: React.FC<{ page: EbookPage }> = ({ page }) => {
  return (
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
};

const ChapterView: React.FC<{ chapter: EbookChapter }> = ({ chapter }) => {
  return (
    <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-inner">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-brand-dark">{chapter.title}</h2>
        <p className="text-lg text-brand-teal mt-1">{chapter.theme}</p>
        <p className="italic text-gray-600 mt-2">"{chapter.goal}"</p>
      </div>
      
      <div>
        {chapter.pages.map(page => <PageCard key={page.id} page={page} />)}
      </div>

      <div className="mt-10 text-center bg-brand-teal text-white p-6 rounded-lg shadow-lg">
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
};

const ResourcesPage = () => {
  const [selectedChapter, setSelectedChapter] = useState<EbookChapter>(EBOOK_CHAPTERS[0]);

  return (
    <>
      <HomepageHeader />
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">eBook Resources</h1>
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
      <Footer />
    </>
  );
};

export default ResourcesPage;