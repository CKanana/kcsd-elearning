import React from 'react';
import { Route } from 'react-router-dom';
import TeacherAuth from '../pages/TeacherAuth';

export default [
  <Route key="teacher-auth" path="/teacher-auth" element={<TeacherAuth />} />,
];
