import React from "react";
import { Link } from "react-router-dom";
import authStyles from "../components/auth/Auth.module.css";
import dashboardStyles from "./StudentDashboard.module.css";
import { BookOpen, ClipboardList, User, Users } from "lucide-react";
import Card from "../components/common/Card";

export default function StudentDashboard() {
  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.container}>
        <h1 className={authStyles.title}>
          Welcome, Student!
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
