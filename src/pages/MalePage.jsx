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
  const [capturedImage, setCapturedImage] = useState(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [premium] = useState(false); // Toggle to true if user purchases premium

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

          // landmarks
          const top = keypoints[10];       // forehead
          const chin = keypoints[152];     // chin
          const leftCheek = keypoints[234];
          const rightCheek = keypoints[454];
          const leftJaw = keypoints[172];
          const rightJaw = keypoints[397];
          const leftTemple = keypoints[127];
          const rightTemple = keypoints[356];

          // measurements
          const faceHeight = Math.abs(top.y - chin.y);
          const cheekboneWidth = Math.abs(rightCheek.x - leftCheek.x);
          const jawWidth = Math.abs(rightJaw.x - leftJaw.x);
          const foreheadWidth = Math.abs(rightTemple.x - leftTemple.x);

          // normalize by face height to reduce zoom bias
          const normCheek = cheekboneWidth / faceHeight;
          const normJaw = jawWidth / faceHeight;
          const normForehead = foreheadWidth / faceHeight;
          const heightToWidthRatio = faceHeight / cheekboneWidth;

          let shape = "";

          // tuned rules
          if (heightToWidthRatio > 1.6 && normJaw < normCheek * 0.9) {
            shape = "Oblong";
          } else if (Math.abs(normJaw - normCheek) < 0.05 && heightToWidthRatio < 1.3) {
            shape = "Square";
          } else if (normForehead > normJaw && heightToWidthRatio > 1.3) {
            shape = "Heart";
          } else if (normCheek > normForehead && normCheek > normJaw && heightToWidthRatio > 1.4) {
            shape = "Diamond";
          } else if (heightToWidthRatio <= 1.1 && normJaw >= 0.9 && normJaw <= 1.1) {
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

  function handleCapturePhoto() {
    if (!premium && captureCount >= 2) return;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    setCapturedImage(canvas.toDataURL("image/png"));
    setCaptureCount((prev) => prev + 1);
  }

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

      {!premium && captureCount >= 2 ? (
        <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "1rem" }}>
          📸 Free capture limit reached. Upgrade to Premium for unlimited photos.
        </p>
      ) : (
        <button
          onClick={handleCapturePhoto}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            backgroundColor: "#38bdf8",
            color: "#fff",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📸 Capture Photo
        </button>
      )}

      {capturedImage && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ borderRadius: "8px", width: "320px" }}
          />
        </div>
      )}

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
