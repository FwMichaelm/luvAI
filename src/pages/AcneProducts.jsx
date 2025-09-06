import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AcneProducts() {
  const navigate = useNavigate();

  const products = [
    {
      name: "CeraVe Facial Cleanser",
      description: "Gentle cleanser that hydrates and restores the skin’s natural barrier.",
      url: "https://www.cerave.com/skincare/cleansers/foaming-facial-cleanser",
    },
    {
      name: "CeraVe Acne Foaming Cream Cleanser",
      description: "Foaming cleanser that targets acne and helps clear skin.",
      url: "https://www.cerave.com/skincare/cleansers/acne-benzoyl-peroxide-cleanser",
    },
    {
      name: "PanOxyl Acne Foaming Wash",
      description: "Powerful benzoyl peroxide acne wash that fights acne-causing bacteria.",
      url: "https://panoxyl.com/acne-products/acne-foaming-wash-benzoyl-peroxide/",
    },
    {
      name: "Retinol Cream",
      description: "Promotes skin cell turnover and reduces acne breakouts.",
      url: "https://www.amazon.com/dp/B0BHX7NYJG/?tag=thewire06-20&linkCode=xm2&ascsubtag=F0401JQ6P00ZVXPABDT7TYVNFHVJS&th=1",
    },
  ];

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
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          marginTop: "4rem",
          width: "100%",
          textAlign: "center",
          fontSize: "3.5rem",
          color: "#f43f5e",
        }}
      >
        Acne Treatment Products
      </motion.h1>

      <motion.ul
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.8rem",
          backgroundColor: "#111",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(244, 63, 94, 0.5)",
          width: "100%",
          maxWidth: "600px",
          listStyle: "none",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {products.map(({ name, description, url }) => (
          <li key={name} style={{ marginBottom: "1.75rem" }}>
            <strong style={{ fontSize: "1.3rem", color: "#22c55e" }}>{name}</strong>
            <p style={{ margin: "0.3rem 0 0.5rem" }}>{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#38bdf8", textDecoration: "underline" }}
            >
              Buy here
            </a>
          </li>
        ))}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "4rem",
          padding: "1rem 2rem",
          fontSize: "1.5rem",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#2563eb",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(38, 99, 235, 0.5)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        ← Back to Skin Analysis
      </motion.button>
    </motion.div>
  );
}
