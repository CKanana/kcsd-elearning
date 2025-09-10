import React, { useState } from 'react';
import { User, Settings, Shield, Upload, Save, Eye, Contrast, Languages } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './ProfilePage.module.css';

const userProfile = {
  name: 'Jane Doe',
  studentId: 'KCSD-12345',
  email: 'jane.doe@kcsd.ac.ke',
  dob: '2008-05-20',
  profilePhoto: '/assets/images/student-profile.jpg',
  emergencyContact: {
    name: 'John Doe',
    relationship: 'Father',
    phone: '+254 712 345 678'
  },
  preferences: {
    highContrast: false,
    fontSize: 'medium',
    language: 'KSL',
    notifications: {
      grades: true,
      assignments: true,
      announcements: false,
    },
    profileVisibility: 'teachers'
  }
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(userProfile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (pref, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [pref]: value }
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.profilePhotoSection}>
              <img src={profileData.profilePhoto} alt="Profile" className={styles.profilePhoto} />
              <button className={styles.uploadButton}><Upload size={16} /> Upload New Photo</button>
              <p>For best results, use a clear, front-facing photo.</p>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="studentId">Student ID</label>
                <input type="text" id="studentId" name="studentId" value={profileData.studentId} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" name="dob" value={profileData.dob} onChange={handleInputChange} />
              </div>
            </div>
            <h3 className={styles.sectionTitle}>Emergency Contact</h3>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="emergencyName">Contact Name</label>
                <input type="text" id="emergencyName" name="emergencyName" value={profileData.emergencyContact.name} onChange={() => {}} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="emergencyRelationship">Relationship</label>
                <input type="text" id="emergencyRelationship" name="emergencyRelationship" value={profileData.emergencyContact.relationship} onChange={() => {}} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="emergencyPhone">Phone Number</label>
                <input type="tel" id="emergencyPhone" name="emergencyPhone" value={profileData.emergencyContact.phone} onChange={() => {}} />
              </div>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Accessibility</h3>
            <div className={styles.preferenceItem}>
              <div>
                <h4><Contrast size={18} /> High Contrast Mode</h4>
                <p>Increases text and background contrast for better readability.</p>
              </div>
              <button className={`${styles.toggle} ${profileData.preferences.highContrast ? styles.active : ''}`} onClick={() => handlePreferenceChange('highContrast', !profileData.preferences.highContrast)}>
                <span className={styles.toggleKnob}></span>
              </button>
            </div>
            <h3 className={styles.sectionTitle}>Language</h3>
            <div className={styles.preferenceItem}>
              <div>
                <h4><Languages size={18} /> Preferred Language</h4>
                <p>Set the language for the platform interface.</p>
              </div>
              <select value={profileData.preferences.language} onChange={(e) => handlePreferenceChange('language', e.target.value)}>
                <option value="English">English</option>
                <option value="Swahili">Swahili</option>
                <option value="KSL">KSL (Visuals & Icons)</option>
              </select>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Notification Settings</h3>
            <p>Choose how you receive updates from the school.</p>
            <div className={styles.preferenceItem}>
              <h4>New Grade Notifications</h4>
              <button className={`${styles.toggle} ${profileData.preferences.notifications.grades ? styles.active : ''}`} onClick={() => {}}>
                <span className={styles.toggleKnob}></span>
              </button>
            </div>
            <div className={styles.preferenceItem}>
              <h4>Assignment Reminders</h4>
              <button className={`${styles.toggle} ${profileData.preferences.notifications.assignments ? styles.active : ''}`} onClick={() => {}}>
                <span className={styles.toggleKnob}></span>
              </button>
            </div>
            <h3 className={styles.sectionTitle}>Privacy Controls</h3>
            <div className={styles.preferenceItem}>
              <div>
                <h4><Eye size={18} /> Profile Visibility</h4>
                <p>Control who can see your profile information.</p>
              </div>
              <select value={profileData.preferences.profileVisibility} onChange={() => {}}>
                <option value="teachers">Teachers Only</option>
                <option value="all-students">All Students</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Profile & Settings</h1>
          <div className={styles.settingsLayout}>
            <aside className={styles.sidebar}>
              <button className={activeTab === 'profile' ? styles.active : ''} onClick={() => setActiveTab('profile')}><User /> Profile</button>
              <button className={activeTab === 'preferences' ? styles.active : ''} onClick={() => setActiveTab('preferences')}><Settings /> Preferences</button>
              <button className={activeTab === 'security' ? styles.active : ''} onClick={() => setActiveTab('security')}><Shield /> Security</button>
            </aside>
            <div className={styles.content}>
              {renderContent()}
              <div className={styles.formActions}>
                <button className={styles.saveButton}><Save size={16} /> Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;