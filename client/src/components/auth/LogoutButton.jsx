import React from 'react';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
  await fetch('https://kcsd-elearning.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (onLogout) onLogout();
      window.location.href = '/'; // Redirect to home or login
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
      Log Out
    </button>
  );
};

export default LogoutButton;
