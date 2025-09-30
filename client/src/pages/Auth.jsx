import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Users, UserCheck, BookUser, Calendar, Eye, EyeOff, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState(null); // null, 'student', or 'teacher'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setIsLoginView(false);
  };

  const resetToRoleSelection = () => {
    setRole(null);
    setIsLoginView(false);
  };

  const switchToLogin = () => {
    setRole(null);
    setIsLoginView(true);
  };

  const switchToSignup = () => {
    setRole(null);
    setIsLoginView(false);
  };

  // State for form fields, errors, and navigation
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess('Account created successfully! Please log in.');
      switchToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      if (data.user.role === 'teacher') navigate('/teacher-dashboard');
      else if (data.user.role === 'student') navigate('/student-dashboard');
  else navigate('/student-dashboard'); // Default to student dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    // View 3: Sign-up form for a specific role
    if (role) {
      return (
        <>
          <button onClick={resetToRoleSelection} className={styles.backButton}>
            <ArrowLeft size={16} /> Back to role selection
          </button>
          <h1 className={styles.title}>Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</h1>
          <p className={styles.subtitle}>Let's get you started.</p>
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={20} />
              <input type="text" name="name" placeholder="Full Name" className={styles.input} value={form.name} onChange={handleInput} required />
            </div>
            {role === 'teacher' ? (
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={20} />
                <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleInput} required />
              </div>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <BookUser className={styles.inputIcon} size={20} />
                  <input type="text" placeholder="Student ID" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleInput} required />
                </div>
                <div className={styles.inputGroup}>
                  <Calendar className={styles.inputIcon} size={20} />
                  <input type="date" name="dob" placeholder="Date of Birth" className={styles.input} value={form.dob} onChange={handleInput} required />
                </div>
              </>
            )}
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                className={styles.input}
                value={form.password}
                onChange={handleInput}
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
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={styles.input}
                value={form.confirmPassword}
                onChange={handleInput}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword((v) => !v)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                tabIndex={0}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {success && <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>{success}</div>}
            {error && <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{error}</div>}
            <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className={styles.toggleText}>
            Already have an account?{' '}
            <button onClick={switchToLogin} className={styles.toggleButton}>Log In</button>
          </p>
        </>
      );
    }

    // View 2: Role selection for sign-up
    if (!isLoginView) {
      return (
        <>
          <h1 className={styles.title}>Join Our Community</h1>
          <p className={styles.subtitle}>First, please tell us who you are.</p>
          <div className={styles.roleSelection}>
            {/* Parent role removed */}
            <button onClick={() => handleRoleSelect('student')} className={styles.roleButton}>
              <UserCheck size={40} />
              <span>I'm a Student</span>
            </button>
            <button onClick={() => handleRoleSelect('teacher')} className={styles.roleButton}>
              <Briefcase size={40} />
              <span>I'm a Teacher</span>
            </button>
          </div>
          <p className={styles.toggleText}>
            Already have an account?{' '}
            <button onClick={switchToLogin} className={styles.toggleButton}>Log In</button>
          </p>
        </>
      );
    }

    // View 1: Login form (default)
    return (
      <>
        <h1 className={styles.title}>Welcome Back!</h1>
        <p className={styles.subtitle}>Please log in to access your dashboard.</p>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <Mail className={styles.inputIcon} size={20} />
            <input type="email" name="email" placeholder="Email or Student ID" className={styles.input} value={form.email} onChange={handleInput} required />
          </div>
            <Lock className={styles.inputIcon} size={20} />
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
                name="password"
                value={form.password} onChange={handleInput}
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
          {success && <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{error}</div>}
          <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
          <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Logging In...' : 'Log In'}</button>
        </form>
        <p className={styles.toggleText}>
          Don't have an account?{' '}
          <button onClick={switchToSignup} className={styles.toggleButton}>Sign Up</button>
        </p>
      </>
    );
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <Link to="/" className={styles.homeLink}>
          <img src="/assets/images/logo.jpg" alt="KCSD Logo" />
          <span>Back to Home</span>
        </Link>
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthPage;