import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 AI Learn</h1>
        <p style={styles.subtitle}>
          Smarter learning powered by AI, personalized just for you
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
            onMouseOver={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "translateY(0)")
            }
          >
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
            onMouseOver={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "translateY(0)")
            }
          >
            Register
          </button>
        </div>
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
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    padding: "60px 50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.8s ease",
  },

  title: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#333",
  },

  subtitle: {
    fontSize: "1.05rem",
    color: "#666",
    maxWidth: "420px",
    marginBottom: "40px",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "22px",
  },

  loginBtn: {
    padding: "14px 36px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#667eea",
    color: "#fff",
    fontWeight: "600",
    transition: "all 0.25s ease",
  },

  registerBtn: {
    padding: "14px 36px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ffcc00",
    color: "#333",
    fontWeight: "600",
    transition: "all 0.25s ease",
  },
};

export default Home;
