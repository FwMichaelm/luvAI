import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function MakeupPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: "2.5rem", color: "#f43f5e", marginBottom: "1.5rem" }}
      >
        Makeup Recommendations
      </motion.h1>

      <div style={{
        backgroundColor: "#111",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "90%",
        textAlign: "center",
        fontSize: "1.2rem",
        color: "#ccc",
      }}>
        <p>
          Coming soon: personalized makeup suggestions, product links, and trendy looks.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        style={{
          marginTop: "2.5rem",
          padding: "1rem 2rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
      >
        ← Back
      </motion.button>
    </motion.div>
  );
}
