import { useState } from "react";
import API from "../Api/api";
// import Navbar from "../components/Navbar";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi 👋 I’m your AI Tutor. Ask me anything about your learning!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        message: input,
      });

      const aiMessage = {
        role: "ai",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ AI failed to respond. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.title}>🤖 AI Tutor</h2>
          <p style={styles.subtitle}>
            Get instant help based on your learning preferences
          </p>

          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user" ? "#667eea" : "#f1f3f5",
                  color: msg.role === "user" ? "#fff" : "#000",
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
  {msg.content}
</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.message, background: "#f1f3f5" }}>
                🤖 Thinking...
              </div>
            )}
          </div>

          <div style={styles.inputBar}>
            <input
              style={styles.input}
              placeholder="Ask your AI Tutor..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.sendBtn} onClick={sendMessage}>
              Send
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
    background: "linear-gradient(135deg, #eef2f3, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
  subtitle: {
    color: "#666",
    marginBottom: "16px",
  },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowY: "auto",
    padding: "16px",
    background: "#f8f9fb",
    borderRadius: "12px",
    marginBottom: "16px",
  },
 
 message: {
  maxWidth: "50%",
  padding: "8px 12px",       
  borderRadius: "10px",      
  marginBottom: "10px",
  fontSize: "14px",           
  lineHeight: "1.4",
  whiteSpace: "pre-wrap",
},


  inputBar: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "1rem",
  },
  sendBtn: {
    padding: "0 20px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  code: {
  background: "#1e293b",
  color: "#e5e7eb",
  padding: "8px",
  borderRadius: "6px",
  display: "block",
  overflowX: "auto",
}

};

export default Chat;
