import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrepareFemale() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#f43f5e" }}>
        Take Your Photo
      </h1>
      <ul style={{ fontSize: "1.5rem", lineHeight: "2.5rem", textAlign: "left" }}>
        <li>• No one else in the frame</li>
        <li>• Well-lit environment</li>
        <li>• Activate your webcam</li>
      </ul>
      <button
        onClick={() => navigate("/female")}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </motion.div>
  );
}
