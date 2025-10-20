import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, ArrowLeft, Users, UserCheck, BookUser, Calendar, Eye, EyeOff, Briefcase, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { login as apiLogin, register as apiRegister } from '../services/authService';


const AuthPage = ({ userType }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  // If userType is provided, role is fixed
  const [role, setRole] = useState(userType || null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Remove role selection logic

  const switchToLogin = () => {
    setIsLoginView(true);
  };

  const switchToSignup = () => {
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
      await apiRegister({ ...form, role });
      setSuccess('Account created! Please check your email to verify your account before logging in.');
      switchToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const data = await apiLogin(form.email, form.password, role);
      // Use AuthContext login to store token and user
      if (data.token) {
        login(data.token, data.user);
      }
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
    // Student-only signup/login
    if (userType === 'student') {
      if (!isLoginView) {
        return (
          <>
            <h1 className={styles.title}>Create Student Account</h1>
            <p className={styles.subtitle}>Let's get you started.</p>
            <form className={styles.form} onSubmit={handleSignup}>
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} size={20} />
                <input type="text" name="name" placeholder="Full Name" className={styles.input} value={form.name} onChange={handleInput} required />
              </div>
              <div className={styles.inputGroup}>
                <BookUser className={styles.inputIcon} size={20} />
                <input type="text" name="studentId" placeholder="Student ID" className={styles.input} value={form.studentId} onChange={handleInput} required />
              </div>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={20} />
                <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleInput} required />
              </div>
              <div className={styles.inputGroup}>
                <Calendar className={styles.inputIcon} size={20} />
                <input type="date" name="dob" placeholder="Date of Birth" className={styles.input} value={form.dob} onChange={handleInput} required />
              </div>
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
              {success && (
                <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>
                  {success}<br />
                  <span>
                    <Link to="/verify-account?token=" style={{ color: '#007bff' }}>
                      Click here to verify your account
                    </Link> (or check your email)
                  </span>
                </div>
              )}
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
      // Student login
      return (
        <>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>Please log in to access your dashboard.</p>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input type="email" name="email" placeholder="Email or Student ID" className={styles.input} value={form.email} onChange={handleInput} required />
            </div>
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
    }
    // Teacher-only signup/login
    if (userType === 'teacher') {
      if (!isLoginView) {
        return (
          <>
            <h1 className={styles.title}>Create Teacher Account</h1>
            <p className={styles.subtitle}>Let's get you started.</p>
            <form className={styles.form} onSubmit={handleSignup}>
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} size={20} />
                <input type="text" name="name" placeholder="Full Name" className={styles.input} value={form.name} onChange={handleInput} required />
              </div>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={20} />
                <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleInput} required />
              </div>
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
      // Teacher login
      return (
        <>
          <h1 className={styles.title}>Teacher Login</h1>
          <p className={styles.subtitle}>Please log in to access your dashboard.</p>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input type="email" name="email" placeholder="Email Address" className={styles.input} value={form.email} onChange={handleInput} required />
            </div>
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
    }
    // ...existing code for fallback (should not be shown)
    return null;
  };

  // Main component render
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
}

export default AuthPage;