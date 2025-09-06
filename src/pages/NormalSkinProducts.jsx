import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NormalSkinProducts() {
  const navigate = useNavigate();

  const products = [
    {
      name: "CeraVe Foaming Facial Cleanser",
      description: "Gentle cleanser suitable for normal skin.",
      url: "https://www.cerave.com/skincare/cleansers/foaming-facial-cleanser",
    },
    {
      name: "Neutrogena Hydro Boost Water Gel",
      description: "Lightweight moisturizer that hydrates without heaviness.",
      url: "https://www.neutrogena.com/products/hydro-boost-water-gel",
    },
    {
      name: "La Roche-Posay Toleriane Moisturizer",
      description: "Soothing moisturizer ideal for sensitive, normal skin.",
      url: "https://www.laroche-posay.us/face-and-body-care/moisturizers/toleriane-moisturizer-3337872414005.html",
    },
    {
      name: "EltaMD UV Clear Broad-Spectrum SPF 46",
      description: "Daily sunscreen that protects and calms normal skin.",
      url: "https://eltamd.com/products/uv-clear-broad-spectrum-spf-46",
    },
    {
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      description: "Balances sebum and improves skin texture.",
      url: "https://theordinary.deciem.com/product/rdn-niacinamide-10pct-zinc-1pct-30ml",
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
        Skincare Products for Normal Skin
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
