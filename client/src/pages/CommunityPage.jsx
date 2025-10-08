import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, MessageSquare, BookCopy } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './CommunityPage.module.css';


// No more dummy data. Students will be fetched from backend.

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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredStudents = useMemo(() =>
    students
      .filter(student => student.role === 'student')
      .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    , [searchTerm, students]
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
              {loading ? (
                <div>Loading students...</div>
              ) : filteredStudents.length === 0 ? (
                <div>No students found.</div>
              ) : filteredStudents.map(student => (
                <div key={student._id} className={styles.studentCard}>
                  <img src={student.profilePhoto || '/assets/images/student-profile.jpg'} alt={student.name} className={styles.studentImage} />
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