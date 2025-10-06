import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';

export default function VerifyAccount() {
  const [message, setMessage] = useState('Verifying your account...');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) {
      setError('Verification token missing.');
      setMessage('');
      return;
    }
    fetch(`/api/auth/verify?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setMessage(data.message);
          setError('');
        } else {
          setError('Verification failed.');
          setMessage('');
        }
      })
      .catch(() => {
        setError('Verification failed.');
        setMessage('');
      });
  }, []);

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.title}>Account Verification</h2>
        {message && <div style={{ color: 'green', marginTop: 12 }}>{message}</div>}
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </div>
    </div>
  );
}
