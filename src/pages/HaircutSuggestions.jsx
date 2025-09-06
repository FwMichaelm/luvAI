import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HaircutSuggestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const faceShape = location.state?.faceShape || "Oval";

  const suggestions = {
    Round: [
      "Pompadour Fade",
      "Faux Hawk",
      "High Top Fade (African American style)",
      "Curtain Bangs (Korean style)",
      "Tapered Afro (African American style)"
    ],
    Square: [
      "Slick Back Undercut",
      "Buzz Cut",
      "360 Waves (African American style)",
      "Comma Hair (Korean style)",
      "Shadow Fade"
    ],
    Oval: [
      "Messy Fringe",
      "Twists (African American style)",
      "Textured Crop",
      "Side Part",
      "Curtain Cut (Korean style)"
    ],
    Oblong: [
      "Crew Cut",
      "Twist Sponge Top (African American style)",
      "Side Swept Undercut",
      "Soft Two-Block (Korean style)",
      "Flat Top"
    ],
    Diamond: [
      "Fringe",
      "Low Taper Fade",
      "Layered Mop Top",
      "Sponged Fro (African American style)",
      "Hush Cut (Korean style)"
    ],
    Heart: [
      "Buzz Cut",
      "Side Sweep",
      "Fade with Line Design",
      "Comma Bangs (Korean style)",
      "Drop Fade (African American style)"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden" // prevents accidental scrolling
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#38bdf8",
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
          boxShadow: "0 0 20px rgba(38, 99, 235, 0.4)",
          textAlign: "left",
          width: "100%",
          maxWidth: "600px", // keeps it readable
          listStyleType: "disc"
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
          backgroundColor: "#2563eb",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(38, 99, 235, 0.5)",
        }}
      >
        ← Back to Scan
      </motion.button>
    </motion.div>
  );
}
