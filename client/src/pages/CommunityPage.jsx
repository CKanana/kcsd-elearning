import React, { useState, useMemo } from 'react';
import { Search, Users, MessageSquare, BookCopy } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CommunityPage.module.css';

const studentsData = [
  { id: 1, name: 'Jane Doe', profilePhoto: '/assets/images/student-profile.jpg', bio: 'Loves science and art. Eager to learn new things!' },
  { id: 2, name: 'David O.', profilePhoto: '/assets/images/student-1.jpg', bio: 'Passionate about carpentry and vocational skills.' },
  { id: 3, name: 'Grace A.', profilePhoto: '/assets/images/student-2.jpg', bio: 'Future ICT expert and coding enthusiast.' },
  { id: 4, name: 'Samuel K.', profilePhoto: '/assets/images/student-3.jpg', bio: 'Enjoys mathematics and helping classmates.' },
  { id: 5, name: 'Mary W.', profilePhoto: '/assets/images/student-4.jpg', bio: 'Loves reading and is a leader in the English club.' },
  { id: 6, name: 'John P.', profilePhoto: '/assets/images/student-5.jpg', bio: 'Aspiring athlete and team player.' },
];

const forumsData = [
  { id: 1, topic: 'KSL Practice', description: 'Share videos and get feedback on your signing.', posts: 128, lastPost: '2 hours ago' },
  { id: 2, topic: 'Math Help', description: 'Stuck on algebra? Ask for help here.', posts: 74, lastPost: '5 hours ago' },
  { id: 3, topic: 'Vocational Projects Showcase', description: 'Show off your latest carpentry or coding project.', posts: 45, lastPost: '1 day ago' },
  { id: 4, topic: 'General Chat', description: 'Talk about anything and everything with fellow students.', posts: 302, lastPost: 'Just now' },
];

const studyGroupsData = [
  { id: 1, name: 'Advanced Geometry Study Group', members: 5, subject: 'Mathematics' },
  { id: 2, name: 'KSL Conversational Club', members: 12, subject: 'KSL' },
  { id: 3, name: 'ICT Final Exam Prep', members: 8, subject: 'ICT' },
];

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('directory');

  const filteredStudents = useMemo(() =>
    studentsData.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'forums':
        return (
          <div className={styles.forumList}>
            {forumsData.map(forum => (
              <div key={forum.id} className={styles.forumItem}>
                <div className={styles.forumItemInfo}>
                  <h3 className={styles.forumTopic}>{forum.topic}</h3>
                  <p className={styles.forumDescription}>{forum.description}</p>
                </div>
                <div className={styles.forumItemStats}>
                  <span>{forum.posts} posts</span>
                  <small>Last post: {forum.lastPost}</small>
                </div>
              </div>
            ))}
          </div>
        );
      case 'groups':
        return (
          <div className={styles.studentGrid}>
            {studyGroupsData.map(group => (
              <div key={group.id} className={styles.studentCard}>
                <div className={styles.groupIcon}><BookCopy size={40} /></div>
                <h3 className={styles.studentName}>{group.name}</h3>
                <p className={styles.studentBio}>Subject: {group.subject}</p>
                <p className={styles.studentBio}>{group.members} members</p>
                <button className={styles.connectButton}>Join Group</button>
              </div>
            ))}
          </div>
        );
      case 'directory':
      default:
        return (
          <>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search for students by name..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.studentGrid}>
              {filteredStudents.map(student => (
                <div key={student.id} className={styles.studentCard}>
                  <img src={student.profilePhoto} alt={student.name} className={styles.studentImage} />
                  <h3 className={styles.studentName}>{student.name}</h3>
                  <p className={styles.studentBio}>{student.bio}</p>
                  <button className={styles.connectButton}>Connect</button>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Community Hub</h1>
            <p className={styles.pageSubtitle}>
              Connect, learn, and grow with your fellow students.
            </p>
          </div>
        </div>

        <div className={styles.tabNav}>
          <div className={styles.container}>
            <button className={`${styles.tabButton} ${activeTab === 'directory' ? styles.active : ''}`} onClick={() => setActiveTab('directory')}><Users size={18} /> Student Directory</button>
            <button className={`${styles.tabButton} ${activeTab === 'forums' ? styles.active : ''}`} onClick={() => setActiveTab('forums')}><MessageSquare size={18} /> Discussion Forums</button>
            <button className={`${styles.tabButton} ${activeTab === 'groups' ? styles.active : ''}`} onClick={() => setActiveTab('groups')}><BookCopy size={18} /> Study Groups</button>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            {renderContent()}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;