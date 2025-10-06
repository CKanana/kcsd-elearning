import React from 'react';
import AuthPage from './Auth';

// Student-only Auth wrapper
const StudentAuth = () => <AuthPage userType="student" />;

export default StudentAuth;
