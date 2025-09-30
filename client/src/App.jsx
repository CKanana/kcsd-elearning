import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherAllStudentsPage from './pages/TeacherAllStudentsPage';
import TeacherCourseStudentsPage from './pages/TeacherCourseStudentsPage';
import Home from './pages/Home';
import AuthPage from './pages/Auth';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import AssessmentCenterPage from './pages/AssessmentCenterPage';
import CommunityPage from './pages/CommunityPage';
import MyCoursesPage from './pages/MyCoursesPage';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import TeacherProfilePage from './pages/TeacherProfilePage';
import TeacherCoursesPage from './pages/TeacherCoursesPage';
import TeacherAssessmentsPage from './pages/TeacherAssessmentsPage';
import TeacherManageCoursePage from './pages/TeacherManageCoursePage';
import StudentCoursePage from './pages/StudentCoursePage';
import { ForgotPassword, ResetPassword } from './pages/PasswordReset';
import authStyles from './pages/Auth.module.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={
          <div className={authStyles.authPage}> {/* This outer div provides the background */}
            <div className={authStyles.authContainer}>
              <AuthPage />
            </div>
          </div>
        } />
        <Route path="/forgot-password" element={
          <div className={authStyles.authPage}>
            <div className={authStyles.authContainer}>
              <ForgotPassword />
            </div>
          </div>
        } />
        <Route path="/reset-password" element={
          <div className={authStyles.authPage}>
            <div className={authStyles.authContainer}>
              <ResetPassword />
            </div>
          </div>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/assessments" element={<AssessmentCenterPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/teacher-profile" element={<TeacherProfilePage />} />
        <Route path="/my-students" element={<div>My Students Page</div>} />
        <Route path="/teacher-courses" element={<TeacherCoursesPage />} />
        <Route path="/teacher/courses/:id/manage" element={<TeacherManageCoursePage />} />
  <Route path="/teacher/courses/:id/students" element={<TeacherCourseStudentsPage />} />
  <Route path="/teacher/all-students" element={<TeacherAllStudentsPage />} />
        <Route path="/courses/:id" element={<StudentCoursePage />} />
        <Route path="/teacher-assessments" element={<TeacherAssessmentsPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
