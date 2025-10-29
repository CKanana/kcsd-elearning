import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { getMe, updateProfile, updateProfilePhoto } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { User, Settings, Shield, Upload, Save, Eye, Contrast, Languages } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const defaultProfile = {
  name: '',
  studentId: '',
  email: '',
  dob: '',
  profilePhoto: '',
  emergencyContact: {
    name: '',
    relationship: '',
    phone: ''
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
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const data = await getMe();
        setProfileData({
          ...defaultProfile,
          ...data.user,
          emergencyContact: { ...defaultProfile.emergencyContact, ...data.user.emergencyContact },
          preferences: { ...defaultProfile.preferences, ...data.user.preferences }
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [name]: value }
    }));
  };

  const handlePreferenceChange = (pref, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [pref]: value }
    }));
  };

  const handleNotificationChange = (notif, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: { ...prev.preferences.notifications, [notif]: value }
      }
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('profilePhoto', file);
    try {
      const data = await updateProfilePhoto(formData);
      setProfileData(prev => ({ ...prev, profilePhoto: data.profilePhoto }));
      updateUser({ ...user, profilePhoto: data.profilePhoto });
      setSuccess('Profile photo updated!');
    } catch (err) {
      setError('Could not upload photo.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateProfile(profileData);
      updateUser(profileData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Could not save profile.');
    }
    setSaving(false);
  };

  // Compute the correct photo URL for display
  const photoUrl = profileData.profilePhoto
    ? profileData.profilePhoto.startsWith('http')
      ? profileData.profilePhoto
  : `https://kcsd-elearning.onrender.com${profileData.profilePhoto}`
    : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profileData.name || 'User');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.profilePhotoSection}>
              <img src={photoUrl} alt="Profile" className={styles.profilePhoto} />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handlePhotoUpload}
              />
              <button
                className={styles.uploadButton}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                type="button"
              >
                <Upload size={16} /> Upload New Photo
              </button>
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
                <input type="email" id="email" name="email" value={profileData.email} readOnly />
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
                <input type="text" id="emergencyName" name="name" value={profileData.emergencyContact.name} onChange={handleEmergencyChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="emergencyRelationship">Relationship</label>
                <input type="text" id="emergencyRelationship" name="relationship" value={profileData.emergencyContact.relationship} onChange={handleEmergencyChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="emergencyPhone">Phone Number</label>
                <input type="tel" id="emergencyPhone" name="phone" value={profileData.emergencyContact.phone} onChange={handleEmergencyChange} />
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
              <button className={`${styles.toggle} ${profileData.preferences.notifications.grades ? styles.active : ''}`} onClick={() => handleNotificationChange('grades', !profileData.preferences.notifications.grades)}>
                <span className={styles.toggleKnob}></span>
              </button>
            </div>
            <div className={styles.preferenceItem}>
              <h4>Assignment Reminders</h4>
              <button className={`${styles.toggle} ${profileData.preferences.notifications.assignments ? styles.active : ''}`} onClick={() => handleNotificationChange('assignments', !profileData.preferences.notifications.assignments)}>
                <span className={styles.toggleKnob}></span>
              </button>
            </div>
            <h3 className={styles.sectionTitle}>Privacy Controls</h3>
            <div className={styles.preferenceItem}>
              <div>
                <h4><Eye size={18} /> Profile Visibility</h4>
                <p>Control who can see your profile information.</p>
              </div>
              <select value={profileData.preferences.profileVisibility} onChange={(e) => handlePreferenceChange('profileVisibility', e.target.value)}>
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
          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <div>
              <p style={{ color: 'red' }}>Error: {error}</p>
              <button onClick={fetchProfile} className={styles.saveButton}>Retry</button>
            </div>
          ) : (
            <div className={styles.settingsLayout}>
              <aside className={styles.sidebar}>
                <button className={activeTab === 'profile' ? styles.active : ''} onClick={() => setActiveTab('profile')}><User /> Profile</button>
                <button className={activeTab === 'preferences' ? styles.active : ''} onClick={() => setActiveTab('preferences')}><Settings /> Preferences</button>
                <button className={activeTab === 'security' ? styles.active : ''} onClick={() => setActiveTab('security')}><Shield /> Security</button>
              </aside>
              <div className={styles.content}>
                {renderContent()}
                <div className={styles.formActions}>
                  {error && <div className={styles.error}>{error}</div>}
                  {success && <div className={styles.success}>{success}</div>}
                  <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;