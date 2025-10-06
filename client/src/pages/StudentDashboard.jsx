
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authStyles from "../components/auth/Auth.module.css";
import dashboardStyles from "./StudentDashboard.module.css";
import { BookOpen, ClipboardList, User, Users } from "lucide-react";
import Card from "../components/common/Card";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      setLoading(true);
      setError("");
      try {
  const res = await fetch("https://kcsd-elearning.onrender.com/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch student info");
        setStudent(data.user);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchStudent();
  }, []);

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.container}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : student && (
          <Card title={student.name} icon={student.profilePhoto && <img src={student.profilePhoto} alt="Profile" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />}>
            <div style={{ marginBottom: 8 }}><strong>Email:</strong> {student.email}</div>
            {student.role && <div style={{ marginBottom: 8 }}><strong>Role:</strong> {student.role}</div>}
            {/* Add more fields as needed, e.g. enrolled courses, progress, etc. */}
          </Card>
        )}
        <h1 className={authStyles.title} style={{ marginTop: 32 }}>
          Welcome, {student ? student.name : 'Student'}!
        </h1>
        <div className={authStyles.subtitle}>
          Here’s your dashboard. Access your courses, assignments, and school updates.
        </div>
        <div className={dashboardStyles.grid}>
          <Link to="/my-courses" className={dashboardStyles.cardLink}>
            <Card
              icon={<BookOpen color="#f97316" size={36} />}
              title="My Courses"
            >
              <p>View and access your enrolled courses.</p>
            </Card>
          </Link>
          <Link to="/assessments" className={dashboardStyles.cardLink}>
            <Card
              icon={<ClipboardList color="#f97316" size={36} />}
              title="Assessments"
            >
              <p>Take quizzes and view your results.</p>
            </Card>
          </Link>
          <Link to="/profile" className={dashboardStyles.cardLink}>
            <Card
              icon={<User color="#f97316" size={36} />}
              title="Profile"
            >
              <p>View and edit your student profile.</p>
            </Card>
          </Link>
          <Link to="/community" className={dashboardStyles.cardLink}>
            <Card
              icon={<Users color="#f97316" size={36} />}
              title="Community"
            >
              <p>Connect with other students.</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
