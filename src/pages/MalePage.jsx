import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { createDetector, SupportedModels } from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import { useNavigate } from "react-router-dom";

export default function MalePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [suggestion, setSuggestion] = useState("");
  const [faceShape, setFaceShape] = useState("");
  const [confidence, setConfidence] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => resolve();
      });
    }

    async function detectFace() {
      await tf.setBackend("webgl");
      await tf.ready();
      const detector = await createDetector(SupportedModels.MediaPipeFaceMesh, { runtime: "tfjs" });

      const detect = async () => {
        const predictions = await detector.estimateFaces(videoRef.current);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (predictions.length > 0) {
          const keypoints = predictions[0].keypoints;

          // more reliable landmarks
          const top = keypoints[10];          // forehead
          const chin = keypoints[152];        // chin
          const leftCheek = keypoints[93];    // widest cheek (left)
          const rightCheek = keypoints[323];  // widest cheek (right)
          const leftJaw = keypoints[ jawIndex(0) ];   // near jaw corner left
          const rightJaw = keypoints[ jawIndex(16) ]; // near jaw corner right
          const leftTemple = keypoints[127];  // temple (left)
          const rightTemple = keypoints[356]; // temple (right)

          // fallback helper (jawline points run 0–16)
          function jawIndex(i) {
            const base = 0; 
            return base + i;
          }

          // measurements
          const faceHeight = Math.abs(top.y - chin.y);
          const cheekboneWidth = Math.abs(rightCheek.x - leftCheek.x);
          const jawWidth = Math.abs(rightJaw.x - leftJaw.x);
          const foreheadWidth = Math.abs(rightTemple.x - leftTemple.x);

          // normalize
          const normCheek = cheekboneWidth / faceHeight;
          const normJaw = jawWidth / faceHeight;
          const normForehead = foreheadWidth / faceHeight;
          const heightToWidthRatio = faceHeight / cheekboneWidth;

          let shape = "";

          // refined classification rules
          if (heightToWidthRatio > 1.65 && normJaw < normCheek * 0.85) {
            shape = "Oblong";
          } else if (Math.abs(normJaw - normCheek) < 0.08 && heightToWidthRatio < 1.35) {
            shape = "Square";
          } else if (normForehead > normCheek && normJaw < normForehead * 0.85) {
            shape = "Heart";
          } else if (normCheek > normForehead * 1.1 && normCheek > normJaw * 1.1) {
            shape = "Diamond";
          } else if (heightToWidthRatio <= 1.15 && Math.abs(normJaw - normCheek) < 0.15) {
            shape = "Round";
          } else {
            shape = "Oval";
          }

          setFaceShape(shape);
          setSuggestion(`${shape}: AI recommends styles for this shape`);
          setConfidence((predictions[0].score || 1.0) * 100);

          // draw landmarks
          ctx.fillStyle = "red";
          keypoints.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fill();
          });
        } else {
          setSuggestion("No face detected");
          setConfidence(0);
        }

        requestAnimationFrame(detect);
      };

      detect();
    }

    setupCamera().then(() => {
      videoRef.current.play();
      detectFace();
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: "640px", height: "480px" }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          playsInline
          muted
          style={{ borderRadius: "8px" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
          gap: "1rem",
        }}
      >
        <button onClick={() => navigate("/male/skincare")} style={buttonStyle}>
          Skincare
        </button>
        <button
          onClick={() => navigate("/male/haircut", { state: { faceShape } })}
          style={buttonStyle}
        >
          Haircut
        </button>
        <button
          onClick={() => alert("Makeup feature coming soon!")}
          style={buttonStyle}
        >
          Makeup
        </button>
      </div>

      <div
        style={{
          border: "1px solid #333",
          padding: "1rem",
          borderRadius: "8px",
          width: "400px",
          backgroundColor: "#111",
          textAlign: "center",
        }}
      >
        <h3>Skin Analysis</h3>
        <p>Coming soon...</p>
      </div>

      <p style={{ marginTop: "1.5rem", fontSize: "1.2rem", color: "#38bdf8" }}>
        {suggestion}
      </p>
      <p style={{ fontSize: "1rem", color: "#9ca3af" }}>
        Confidence: {confidence.toFixed(1)}%
      </p>
    </div>
  );
}

const buttonStyle = {
  fontSize: "1.2rem",
  padding: "1rem 2rem",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};
