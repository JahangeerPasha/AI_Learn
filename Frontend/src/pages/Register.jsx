import { useState } from "react";
import API from "../Api/api.js";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account 🚀</h2>
        <p style={styles.subtitle}>
          Join AI-powered personalized learning today
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 0 3px rgba(24,90,157,0.15)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 0 3px rgba(24,90,157,0.15)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 0 3px rgba(24,90,157,0.15)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          <button
            style={styles.button}
            type="submit"
            onMouseOver={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "translateY(0)")
            }
            onMouseDown={(e) =>
              (e.target.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
          >
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

/* 🎨 Styles */
const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: "40px",
    width: "380px",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    textAlign: "center",
    animation: "fadeIn 0.6s ease",
  },

  title: {
    marginBottom: "6px",
    fontSize: "1.9rem",
    fontWeight: "600",
  },

  subtitle: {
    marginBottom: "28px",
    color: "#666",
    fontSize: "0.95rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#185a9d",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "12px",
    transition: "all 0.25s ease",
  },

  footer: {
    marginTop: "22px",
    fontSize: "14px",
  },

  link: {
    color: "#185a9d",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
};

export default Register;
