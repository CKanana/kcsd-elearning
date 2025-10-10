import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, Shield, Upload, Save } from 'lucide-react';
import { authFetch } from '../services/authService';
import TeacherHeader from '../components/common/TeacherHeader';
import Footer from '../components/common/Footer';
import styles from './ProfilePage.module.css';

const defaultProfile = {
  name: '',
  email: '',
  profilePhoto: '',
  department: '',
  phone: '',
  office: '',
  bio: '',
};

const TeacherProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Password change state
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [pwChangeLoading, setPwChangeLoading] = useState(false);
  const [pwChangeMsg, setPwChangeMsg] = useState('');
  // Password change logic
  const handlePasswordInput = (e) => {
    setPasswordFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPwChangeMsg('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    setPwChangeMsg('');
    if (!passwordFields.currentPassword || !passwordFields.newPassword || !passwordFields.confirmNewPassword) {
      setPwChangeMsg('Please fill in all password fields.');
      return;
    }
    if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
      setPwChangeMsg('New passwords do not match.');
      return;
    }
    setPwChangeLoading(true);
    try {
      const res = await authFetch('https://kcsd-elearning.onrender.com/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword
        })
      });
      if (!res.ok) throw new Error('Failed to change password');
      setPwChangeMsg('Password changed successfully!');
      setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      setPwChangeMsg(err.message);
    }
    setPwChangeLoading(false);
  };

  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await authFetch('https://kcsd-elearning.onrender.com/api/auth/me');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
        setProfileData({ ...defaultProfile, ...data.user });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);
    // ...existing code...
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('profilePhoto', file);
    try {
      const res = await authFetch('https://kcsd-elearning.onrender.com/api/auth/profile/photo', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload photo');
      const data = await res.json();
      setProfileData(prev => ({ ...prev, profilePhoto: data.profilePhoto }));
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
      const res = await authFetch('https://kcsd-elearning.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error('Failed to save profile');
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
    : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profileData.name || 'Teacher');

  return (
    <div className={styles.page}>
      <TeacherHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Teacher Profile & Settings</h1>
          <div className={styles.settingsLayout}>
            <aside className={styles.sidebar}>
              <button className={activeTab === 'profile' ? styles.active : ''} onClick={() => setActiveTab('profile')}><User /> Profile</button>
              <button className={activeTab === 'settings' ? styles.active : ''} onClick={() => setActiveTab('settings')}><Settings /> Settings</button>
              <button className={activeTab === 'security' ? styles.active : ''} onClick={() => setActiveTab('security')}><Shield /> Security</button>
            </aside>
            <div className={styles.content}>
              {activeTab === 'profile' && (
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
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={profileData.email} readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="department">Department</label>
                      <input type="text" id="department" name="department" value={profileData.department} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="office">Office Location</label>
                      <input type="text" id="office" name="office" value={profileData.office} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="bio">Short Bio</label>
                      <textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows={3} />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Notification Preferences</h3>
                  <div className={styles.inputGroup}>
                    <label>
                      <input
                        type="checkbox"
                        checked={profileData.notifyAnnouncements || false}
                        onChange={e => setProfileData(prev => ({ ...prev, notifyAnnouncements: e.target.checked }))}
                      />
                      Receive school announcements
                    </label>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>
                      <input
                        type="checkbox"
                        checked={profileData.notifyAssignments || false}
                        onChange={e => setProfileData(prev => ({ ...prev, notifyAssignments: e.target.checked }))}
                      />
                      Assignment notifications
                    </label>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>
                      <input
                        type="checkbox"
                        checked={profileData.notifyMessages || false}
                        onChange={e => setProfileData(prev => ({ ...prev, notifyMessages: e.target.checked }))}
                      />
                      New message alerts
                    </label>
                  </div>
                </div>
              )}
              {activeTab === 'security' && (
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Change Password</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" autoComplete="current-password" value={passwordFields.currentPassword} onChange={handlePasswordInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" autoComplete="new-password" value={passwordFields.newPassword} onChange={handlePasswordInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" autoComplete="new-password" value={passwordFields.confirmNewPassword} onChange={handlePasswordInput} />
                  </div>
                  {pwChangeMsg && <div className={pwChangeMsg.includes('success') ? styles.success : styles.error}>{pwChangeMsg}</div>}
                  <button className={styles.saveButton} type="button" style={{marginTop:8}} onClick={handleChangePassword} disabled={pwChangeLoading}>
                    {pwChangeLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              )}
              <div className={styles.formActions}>
                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}
                <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherProfilePage;
