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

          // multiple landmarks for averaging
          const top = keypoints[10]; // forehead midpoint
          const chin = keypoints[152]; // chin
          const leftTemple = keypoints[127];
          const rightTemple = keypoints[356];
          const leftCheek = keypoints[234];
          const rightCheek = keypoints[454];
          const leftJaw = keypoints[172];
          const rightJaw = keypoints[397];

          // core measurements
          const faceHeight = Math.abs(top.y - chin.y);
          const foreheadWidth = Math.abs(rightTemple.x - leftTemple.x);
          const cheekboneWidth = Math.abs(rightCheek.x - leftCheek.x);
          const jawWidth = Math.abs(rightJaw.x - leftJaw.x);
          const faceWidth = Math.max(foreheadWidth, cheekboneWidth, jawWidth);

          // ratios
          const heightToWidth = faceHeight / faceWidth;
          const cheekToJaw = cheekboneWidth / jawWidth;
          const cheekToForehead = cheekboneWidth / foreheadWidth;
          const foreheadToJaw = foreheadWidth / jawWidth;

          console.log("Ratios =>", {
            heightToWidth: heightToWidth.toFixed(2),
            cheekToJaw: cheekToJaw.toFixed(2),
            cheekToForehead: cheekToForehead.toFixed(2),
            foreheadToJaw: foreheadToJaw.toFixed(2),
          });

          let shape = "";

          // stricter classification rules
          if (heightToWidth >= 1.5) {
            shape = "Oblong"; // long and narrow
          } else if (heightToWidth <= 1.3 && Math.abs(cheekToJaw - 1) <= 0.1) {
            shape = "Round"; // short, soft jaw
          } else if (Math.abs(cheekToJaw - 1) <= 0.1 && heightToWidth > 1.3) {
            shape = "Square"; // strong jaw, balanced width
          } else if (cheekToForehead > 1.05 && cheekToJaw > 1.05) {
            shape = "Diamond"; // widest at cheeks
          } else if (foreheadToJaw > 1.1 && heightToWidth > 1.3) {
            shape = "Heart"; // forehead wide, chin narrow
          } else {
            shape = "Oval"; // default balanced
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
