import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HaircutSuggestionsFemale() {
  const location = useLocation();
  const navigate = useNavigate();
  const faceShape = location.state?.faceShape || "Oval";

  // Hairstyle suggestions tailored to female African American and Korean hairstyles, trendy for high schoolers
  const suggestions = {
    Round: [
      "Twist-Out",
      "Bantu Knots",
      "Layered Bob",
      "Korean Curtain Bangs",
      "Soft Curls with Side Part",
    ],
    Square: [
      "Box Braids with Middle Part",
      "Korean Pixie Cut",
      "Layered Shoulder-Length Waves",
      "High Puff",
      "Asymmetrical Bob",
    ],
    Oval: [
      "Wash and Go Curls",
      "Long Straight Hair with Curtain Bangs",
      "Korean Blunt Cut",
      "Finger Coils",
      "Half-Up Top Knot",
    ],
    Oblong: [
      "Voluminous Afro",
      "Soft Waves with Face-Framing Layers",
      "Korean Soft Layered Cut",
      "Low Bun with Baby Hairs",
      "Braided Crown",
    ],
    Diamond: [
      "Twists with Side Swept Bangs",
      "Korean Layered Bob",
      "Afro Puff",
      "Textured Lob",
      "Space Buns",
    ],
    Heart: [
      "Side-Swept Curls",
      "Long Layers with Bangs",
      "Korean Long Bob with Waves",
      "High Ponytail",
      "Cornrows with Beads",
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
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
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#f43f5e",
          textAlign: "center",
        }}
      >
        Haircut Suggestions for {faceShape} Face
      </motion.h1>

      <motion.ul
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontSize: "1.4rem",
          lineHeight: "2.2rem",
          backgroundColor: "#111",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(244, 63, 94, 0.4)",
          textAlign: "left",
          maxWidth: "90vw",
          width: "400px",
        }}
      >
        {suggestions[faceShape]?.map((style) => (
          <li key={style} style={{ marginBottom: "1rem" }}>
            {style}
          </li>
        ))}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        style={{
          marginTop: "2.5rem",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#f43f5e",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(244, 63, 94, 0.5)",
        }}
      >
        ← Back to Scan
      </motion.button>
    </motion.div>
  );
}
