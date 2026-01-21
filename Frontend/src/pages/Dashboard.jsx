import { useEffect, useState } from "react";
import API from "../Api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userRes = await API.get("/users/profile");
        setUser(userRes.data);

        // Preferences are OPTIONAL
        const prefRes = await API.get("/preferences");
        setPreferences(prefRes.data || null);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, []);

  if (!user) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1 style={styles.heading}>
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>
        <p style={styles.subheading}>
          Your AI-powered personalized learning dashboard
        </p>

        <div style={styles.grid}>
          {/* Learning Profile */}
          <div style={styles.card}>
            <h3>🎯 Learning Profile</h3>
            {preferences ? (
              <>
                <p><strong>Level:</strong> {preferences.level}</p>
                <p><strong>Interest:</strong> {preferences.interest}</p>
                <p><strong>Goal:</strong> {preferences.goal}</p>
                <p><strong>Daily Time:</strong> {preferences.dailyTime}</p>
              </>
            ) : (
              <p style={{ color: "#777" }}>
                No preferences set yet
              </p>
            )}
          </div>

          {/* AI Insights */}
          <div style={styles.card}>
            <h3>🤖 AI Insights</h3>
            {preferences ? (
              <ul>
                <li>Personalized roadmap available</li>
                <li>AI tutor adapts to your goals</li>
                <li>Practice consistently for best results</li>
              </ul>
            ) : (
              <p style={{ color: "#777" }}>
                Set preferences to unlock AI insights
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={styles.card}>
            <h3>⚡ Quick Actions</h3>

            <button style={styles.btn} onClick={() => navigate("/chat")}>
              Ask AI Tutor
            </button>

            <button
              style={styles.btn}
              onClick={() => navigate("/learning-path")}
            >
              View Learning Path
            </button>

            <button
              style={styles.btnSecondary}
              onClick={() => navigate("/Onboarding")}
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* 🎨 Styles */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #eef2f3, #ffffff)",
  },
  heading: {
    fontSize: "2.2rem",
  },
  subheading: {
    color: "#555",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  btn: {
    width: "100%",
    padding: "11px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
  },
  btnSecondary: {
    width: "100%",
    padding: "11px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #667eea",
    background: "#fff",
    color: "#667eea",
    cursor: "pointer",
    transition: "0.2s",
  },
  loading: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
};

export default Dashboard;
