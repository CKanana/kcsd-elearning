import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './components/auth/Auth';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import AssessmentCenterPage from './pages/AssessmentCenterPage';
import CommunityPage from './pages/CommunityPage';
import MyCoursesPage from './pages/MyCoursesPage';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import TeacherCoursesPage from './pages/TeacherCoursesPage';
import TeacherAssessmentsPage from './pages/TeacherAssessmentsPage';

function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/assessments" element={<AssessmentCenterPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-students" element={<div>My Students Page</div>} />
        <Route path="/teacher-courses" element={<TeacherCoursesPage />} />
        <Route path="/teacher-assessments" element={<TeacherAssessmentsPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
