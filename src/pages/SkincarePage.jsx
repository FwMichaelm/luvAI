import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SkincarePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [photoTaken, setPhotoTaken] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [acneResults, setAcneResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  function capturePhoto() {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setImageData(dataUrl);
    setFileName("");
    setPhotoTaken((c) => c + 1);
    setShowResults(false);
    setAcneResults([]);
  }

  function handleUpload(e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
      setFileName(e.target.files[0].name);
      setShowResults(false);
      setAcneResults([]);
      setPhotoTaken((c) => c + 1);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  async function detectAcne() {
    if (!imageData) return;
    setLoading(true);
    setShowResults(false);
    setAcneResults([]);
    try {
      const base64 = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/acne-detection-zukbx/4",
        params: {
          api_key: "l5vpJltAc8H8RoDiFJis",
          confidence: 0,
        },
        data: base64,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setAcneResults(response.data.predictions || []);
      setShowResults(true);
    } catch (err) {
      console.error("Roboflow error:", err.message);
      setShowResults(true);
      setAcneResults([]);
    }
    setLoading(false);
  }

  const acneDetected = acneResults.length > 0;

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
        Skin Analysis
      </motion.h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "3rem",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {/* Webcam Capture */}
        <div style={{ textAlign: "center", maxWidth: "420px", width: "100%" }}>
          <video
            ref={videoRef}
            width="400"
            height="300"
            autoPlay
            playsInline
            muted
            style={{ borderRadius: "16px", maxWidth: "100%" }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <button
            onClick={capturePhoto}
            style={{
              marginTop: "1rem",
              width: "100%",
              fontSize: "1.2rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            📸 Capture Photo
          </button>
        </div>

        {/* Image Upload */}
        <div style={{ textAlign: "center", maxWidth: "420px", width: "100%" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ color: "white", marginBottom: "1rem", width: "100%" }}
          />
          <button
            onClick={detectAcne}
            disabled={!imageData || loading}
            style={{
              width: "100%",
              padding: "0.75rem 1.5rem",
              backgroundColor: imageData ? "#f43f5e" : "#475569",
              color: "white",
              border: "none",
              borderRadius: "16px",
              cursor: imageData ? "pointer" : "not-allowed",
              fontSize: "1.2rem",
            }}
          >
            🔍 Detect Acne
          </button>
        </div>
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.2rem" }}>
          Analyzing...
        </p>
      )}

      {showResults && (
        <>
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                color: acneDetected ? "#22c55e" : "#f87171",
                fontWeight: "700",
              }}
            >
              {acneDetected ? "Acne Detected" : "Normal Skin Type"}
            </h2>
          </div>

          {imageData && (
            <div
              style={{
                marginTop: "1rem",
                textAlign: "center",
                width: "100%",
                maxWidth: "420px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  marginBottom: "0.75rem",
                }}
              >
                {fileName ? `Uploaded Image: ${fileName}` : "Captured Image:"}
              </h3>
              <img
                src={imageData}
                alt="Scanned"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  imageRendering: "auto",
                }}
              />
            </div>
          )}

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              width: "100%",
              maxWidth: "420px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <button
              onClick={() => navigate("/acne-products")}
              disabled={!acneDetected}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1.1rem",
                backgroundColor: acneDetected ? "#f43f5e" : "#475569",
                color: "white",
                border: "none",
                borderRadius: "16px",
                cursor: acneDetected ? "pointer" : "not-allowed",
                opacity: acneDetected ? 1 : 0.5,
                minWidth: "160px",
                fontWeight: "600",
              }}
            >
              Acne Treatment Products
            </button>

            <button
              onClick={() => navigate("/normal-skin-products")}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1.1rem",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                minWidth: "160px",
                fontWeight: "600",
              }}
            >
              Normal Skin Products
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
