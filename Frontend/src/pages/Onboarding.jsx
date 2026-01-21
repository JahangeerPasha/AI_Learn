import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    level: "",
    interest: "",
    goal: "",
    dailyTime: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/preferences", form);
    navigate("/dashboard");
  };

//   useEffect(() => {
//     API.get("/preferences").then((res) => {
//       if (res.data) {
//         navigate("/dashboard");
//       }
//     });
//   }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.step}>Step 1 of 1</p>
        <h1 style={styles.title}>Personalize your learning 🎯</h1>
        <p style={styles.subtitle}>
          Help us tailor AI recommendations just for you
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Your skill level</label>
          <select name="level" onChange={handleChange} required style={styles.input}>
            <option value="">Select level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <label style={styles.label}>Primary interest</label>
          <input
            name="interest"
            placeholder="Web Development, DSA, AI..."
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Learning goal</label>
          <input
            name="goal"
            placeholder="Job preparation, exams, concepts..."
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Daily study time</label>
          <select
            name="dailyTime"
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select time</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>2 hours</option>
          </select>

          <button type="submit" style={styles.button}>
            Continue to Dashboard →
          </button>
        </form>
      </div>
    </div>
  );
};

/* 🎨 Styles */
const styles = {
  page: {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
},
card: {
  background: "#ffffff",
  padding: "40px",
  width: "100%",
  maxWidth: "420px",
  borderRadius: "18px",
  boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
  
},

  step: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "6px",
  },
  title: {
    fontSize: "1.9rem",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Onboarding;
