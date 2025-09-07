import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Users, UserCheck, BookUser, Calendar, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState(null); // null, 'parent', or 'student'
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

  const renderContent = () => {
    // View 3: Sign-up form for a specific role
    if (role) {
      return (
        <>
          <button onClick={resetToRoleSelection} className={styles.backButton}>
            <ArrowLeft size={16} /> Back to role selection
          </button>
          <h1 className={styles.title}>Create {role === 'parent' ? 'Parent' : 'Student'} Account</h1>
          <p className={styles.subtitle}>Let's get you started.</p>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={20} />
              <input type="text" placeholder="Full Name" className={styles.input} required />
            </div>
            {role === 'parent' ? (
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={20} />
                <input type="email" placeholder="Email Address" className={styles.input} required />
              </div>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <BookUser className={styles.inputIcon} size={20} />
                  <input type="text" placeholder="Student ID" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input type="email" placeholder="Email Address" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <Calendar className={styles.inputIcon} size={20} />
                  <input type="date" placeholder="Date of Birth" className={styles.input} required />
                </div>
              </>
            )}
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                className={styles.input}
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
                placeholder="Confirm Password"
                className={styles.input}
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
            <button type="submit" className={styles.submitButton}>Create Account</button>
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
            <button onClick={() => handleRoleSelect('parent')} className={styles.roleButton}>
              <Users size={40} />
              <span>I'm a Parent or Guardian</span>
            </button>
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
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail className={styles.inputIcon} size={20} />
            <input type="email" placeholder="Email or Student ID" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
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
          </div>
          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          <button type="submit" className={styles.submitButton}>Log In</button>
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