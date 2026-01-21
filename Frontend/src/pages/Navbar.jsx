import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.container}>
        {/* Left: Logo */}
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          AI Learn
        </div>

        {/* Center: Links */}
        <div style={styles.links}>
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "AI Tutor", path: "/chat" },
            { name: "Learning Path", path: "/learning-path" },
            { name: "Preferences", path: "/OnBoarding" },
          ].map((item) => (
            <span
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.link,
                ...(isActive(item.path) ? styles.activeLink : {}),
              }}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Right: Profile */}
        <div style={styles.profile}>
          <div
            style={styles.avatar}
            onClick={() => navigate("/profile")}
          >
            S
          </div>
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🎨 Styles */
const styles = {
  navbar: {
    width: "100vw",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    height: "64px",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#667eea",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "28px",
  },
  link: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#444",
    cursor: "pointer",
    paddingBottom: "4px",
  },
  activeLink: {
    color: "#667eea",
    borderBottom: "2px solid #667eea",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#667eea",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    cursor: "pointer",
  },
  logout: {
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default Navbar;
