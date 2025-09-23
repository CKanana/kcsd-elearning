import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Auth.module.css'; // Use the same styles as the main Auth page

export default function TeacherAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Invalid credentials');
        setSuccess('Login successful!');
        // Assuming successful teacher login redirects to teacher dashboard
        navigate('/teacher-dashboard');
      } else {
        // Signup logic
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ ...form, role: 'teacher' }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signup failed');
        setSuccess('Account created! You can now log in.');
        setIsLogin(true);
        setForm({ email: '', password: '', name: '' }); // Reset form
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // The wrapping divs are in App.jsx, so we just return the content.
    <>
      <Link to="/" className={styles.homeLink}>
        <img src="/assets/images/logo.jpg" alt="KCSD Logo" />
        <span>Back to Home</span>
      </Link>
      <h1 className={styles.title}>{isLogin ? 'Teacher Login' : 'Teacher Signup'}</h1>
      <p className={styles.subtitle}>
        {isLogin ? 'Please log in to access your dashboard.' : "Let's get you started."}
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={20} />
            <input type="text" name="name" placeholder="Full Name" className={styles.input} value={form.name} onChange={handleChange} required />
          </div>
        )}
        <div className={styles.inputGroup}>
          <Mail className={styles.inputIcon} size={20} />
          <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <Lock className={styles.inputIcon} size={20} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            required
            style={{ paddingRight: '2.5rem' }}
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword((v) => !v)}
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            tabIndex={0}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>{success}</div>}
        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? (isLogin ? 'Logging in...' : 'Creating...') : (isLogin ? 'Log In' : 'Create Account')}
        </button>
      </form>
      <p className={styles.toggleText}>
        {isLogin ? (
          <>
            Don&apos;t have an account?{' '}
            <button onClick={() => setIsLogin(false)} className={styles.toggleButton}>Sign Up</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)} className={styles.toggleButton}>Log In</button>
          </>
        )}
      </p>
    </>
  );
}
