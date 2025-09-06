import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PremiumPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      {/* ❌ Close button */}
      <button
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          fontSize: "1.5rem",
          backgroundColor: "transparent",
          border: "none",
          color: "#f87171",
          cursor: "pointer"
        }}
      >
        ✕
      </button>

      <h1 style={{ fontSize: "3rem", color: "#f43f5e", marginBottom: "1rem" }}>
        Premium Plan
      </h1>

      <ul style={{ fontSize: "1.4rem", lineHeight: "2.5rem", textAlign: "center", color: "#e2e8f0" }}>
        <li>Unlimited Photo Captures</li>
        <li>Korean Skin Color Analysis</li>
        <li>Makeup & Skincare AI Insights</li>
        <li>Just $3.99/month</li>
      </ul>

      <button
        onClick={() => alert("Premium purchase coming soon!")}
        style={{
          marginTop: "2rem",
          fontSize: "1.2rem",
          padding: "1rem 2rem",
          backgroundColor: "#f43f5e",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer"
        }}
      >
        Purchase Premium
      </button>
    </motion.div>
  );
}
