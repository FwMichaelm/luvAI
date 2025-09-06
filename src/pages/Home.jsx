import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0a0a0a",
        padding: "2rem",
      }}
    >
      <div style={{ marginTop: "4rem", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.5rem", color: "#f8fafc" }}>
          Welcome to <span style={{ color: "#f43f5e" }}>luvAI</span>
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "4rem",
          width: "100%",
        }}
      >
        <button
          onClick={() => navigate("/prepare-male")}
          style={{
            fontSize: "2.5rem",
            padding: "2rem 3rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            flex: 1,
            maxWidth: "600px",
          }}
        >
          👨 Male
        </button>
        <button
          onClick={() => navigate("/prepare-female")}
          style={{
            fontSize: "2.5rem",
            padding: "2rem 3rem",
            backgroundColor: "#f43f5e",
            color: "white",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            flex: 1,
            maxWidth: "600px",
          }}
        >
          👩 Female
        </button>
      </div>
    </motion.div>
  );
}
