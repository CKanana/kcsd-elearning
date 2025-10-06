import React from 'react';
import { Route } from 'react-router-dom';
import StudentAuth from '../pages/StudentAuth';

export default [
  <Route key="student-auth" path="/student-auth" element={<StudentAuth />} />,
];
