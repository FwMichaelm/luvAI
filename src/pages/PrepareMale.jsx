import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrepareMale() {
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
        textAlign: "center",
        color: "#f8fafc",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
        Take Your Photo
      </h1>
      <ul
        style={{
          fontSize: "1.5rem",
          lineHeight: "2.5rem",
          color: "#94a3b8",
          marginBottom: "3rem",
          textAlign: "left",
        }}
      >
        <li>• Make sure nobody is in the background</li>
        <li>• Be in a well lit area</li>
        <li>• Turn webcam on</li>
      </ul>
      <button
        onClick={() => navigate("/male")}
        style={{
          fontSize: "2rem",
          padding: "1rem 3rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </motion.div>
  );
}
