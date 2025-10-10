import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Users, UserCheck, BookUser, Calendar, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState(null); // null, 'student'
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

  // State for form fields and errors
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    dob: '',
    profilePhoto: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInput = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, profilePhoto: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);
  formData.append('role', 'student');
      formData.append('name', form.name);
      if (form.profilePhoto) {
        formData.append('profilePhoto', form.profilePhoto);
      }
  const res = await fetch('https://kcsd-elearning.onrender.com/api/auth/signup', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setIsLoginView(true);
      setRole(null);
      setForm({ name: '', email: '', password: '', confirmPassword: '', studentId: '', dob: '', profilePhoto: null });
      alert('Account created! Please log in.');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://kcsd-elearning.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
        credentials: 'include', // Send cookies
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Check verification and role from users table
      if (!data.user.isVerified) {
        setError('Please verify your account before logging in.');
        setLoading(false);
        return;
      }
      if (data.user.role === 'student') {
        window.location.href = '/student-dashboard';
      } else if (data.user.role === 'teacher') {
        window.location.href = '/teacher-dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const renderContent = () => {
    // View 3: Sign-up form for a specific role
    if (role) {
      return (
        <>
          <button onClick={resetToRoleSelection} className={styles.backButton}>
            <ArrowLeft size={16} /> Back to role selection
          </button>
          <h1 className={styles.title}>Create Student Account</h1>
          <p className={styles.subtitle}>Let's get you started.</p>
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={20} />
              <input type="text" name="name" placeholder="Full Name" className={styles.input} required value={form.name} onChange={handleInput} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="profilePhoto" style={{ marginRight: 8 }}>Profile Photo:</label>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleInput} />
            </div>
            <>
              <div className={styles.inputGroup}>
                <BookUser className={styles.inputIcon} size={20} />
                <input type="text" name="studentId" placeholder="Student ID" className={styles.input} value={form.studentId} onChange={handleInput} />
              </div>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={20} />
                <input type="email" name="email" placeholder="Email Address" className={styles.input} required value={form.email} onChange={handleInput} />
              </div>
              <div className={styles.inputGroup}>
                <Calendar className={styles.inputIcon} size={20} />
                <input type="date" name="dob" placeholder="Date of Birth" className={styles.input} value={form.dob} onChange={handleInput} />
              </div>
            </>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                className={styles.input}
                required
                style={{ paddingRight: '2.5rem' }}
                value={form.password}
                onChange={handleInput}
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
                required
                style={{ paddingRight: '2.5rem' }}
                value={form.confirmPassword}
                onChange={handleInput}
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
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
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
            <input type="email" name="email" placeholder="Email or Student ID" className={styles.input} required value={form.email} onChange={handleInput} />
          </div>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={styles.input}
              required
              style={{ paddingRight: '2.5rem' }}
              value={form.password}
              onChange={handleInput}
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
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
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
