import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  if (!user) return <div style={styles.loading}>Loading profile...</div>;

  return (
    <>
    <Navbar/>
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>

        <div style={styles.divider} />

        <div style={styles.meta}>
          <span>Joined</span>
          <span>{new Date(user.createdAt).toDateString()}</span>
        </div>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

const styles = {
page: {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
},


  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "42px 36px",
    width: "380px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
    transition: "transform 0.25s ease",
  },

  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #5a67d8)",
    color: "#fff",
    fontSize: "38px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    boxShadow: "0 10px 25px rgba(102,126,234,0.5)",
  },

  name: {
    fontSize: "1.9rem",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#1a202c",
  },

  email: {
    color: "#555",
    marginBottom: "20px",
    fontSize: "15px",
  },

  divider: {
    height: "1px",
    background: "#eee",
    margin: "20px 0",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
    marginBottom: "28px",
  },

  logout: {
    padding: "14px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #e63946, #d62828)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 10px 20px rgba(230,57,70,0.4)",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#fff",
  },
};

export default Profile;
