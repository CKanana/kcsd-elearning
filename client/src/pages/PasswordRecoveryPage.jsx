import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { requestPasswordReset, resetPassword as apiResetPassword } from '../services/authService';
import styles from './Auth.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await requestPasswordReset(email);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Forgot Password</h2>
      <p className={styles.subtitle}>Enter your email and we'll send you a link to reset your password.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <div style={{ color: 'green', marginTop: 12, textAlign: 'center' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: 12, textAlign: 'center' }}>{error}</div>}
      <p className={styles.toggleText}>
        Remember your password? <Link to="/auth" className={styles.toggleButton}>Log In</Link>
      </p>
    </>
  );
};

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    setLoading(true);
    try {
      await apiResetPassword(token, password);
      setSuccess('Password reset successful! You can now log in.');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Reset Your Password</h2>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>{success}</div>}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </>
  );
};

const PasswordRecoveryPage = () => {
  const query = useQuery();
  const token = query.get('token');

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <Link to="/" className={styles.homeLink}>
          <img src="/assets/images/logo.jpg" alt="KCSD Logo" />
          <span>Back to Home</span>
        </Link>
        {token ? <ResetPasswordForm token={token} /> : <ForgotPasswordForm />}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;