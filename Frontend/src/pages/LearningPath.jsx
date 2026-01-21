import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "./Navbar";

const LearningPath = () => {
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/ai/learning-path")
      .then((res) => {
        setPath(res.data.learningPath);
      })
      .catch(() => {
        setPath("⚠️ Unable to generate learning path");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1 style={styles.heading}>📍 Your Learning Path</h1>
        <p style={styles.subheading}>
          AI-generated roadmap based on your preferences
        </p>

        <div style={styles.card}>
          {loading ? (
            <p>🤖 Generating your personalized roadmap...</p>
          ) : (
            path.split("\n").map((step, i) => (
              <div key={i} style={styles.step}>
                {step}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};


const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #eef2f3, #ffffff)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "5px",
  },
  subheading: {
    color: "#666",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    maxWidth: "800px",
  },
  step: {
    padding: "12px 16px",
    marginBottom: "12px",
    borderLeft: "4px solid #667eea",
    background: "#f8f9ff",
    borderRadius: "8px",
    lineHeight: "1.5",
  },
};
export default LearningPath;