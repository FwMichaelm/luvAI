import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { createDetector, SupportedModels } from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import { useNavigate } from "react-router-dom";

export default function FemalePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [suggestion, setSuggestion] = useState("");
  const [faceShape, setFaceShape] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [premium] = useState(false); // Set true for premium users

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
        if (!videoRef.current) return;

        const predictions = await detector.estimateFaces(videoRef.current);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (predictions.length > 0) {
          const keypoints = predictions[0].keypoints;
          const top = keypoints[10];
          const chin = keypoints[152];
          const leftCheek = keypoints[234];
          const rightCheek = keypoints[454];
          const leftJaw = keypoints[172];
          const rightJaw = keypoints[397];

          const faceHeight = Math.abs(chin.y - top.y);
          const cheekboneWidth = Math.abs(rightCheek.x - leftCheek.x);
          const jawWidth = Math.abs(rightJaw.x - leftJaw.x);
          const heightToWidthRatio = faceHeight / cheekboneWidth;
          const jawToCheekRatio = jawWidth / cheekboneWidth;

          // More strict conditions to reduce overlap
          let shape = "";
         if (heightToWidthRatio >= 1.65 && jawToCheekRatio < 0.85) {
  shape = "Oblong";
} else if (heightToWidthRatio < 1.2 && jawToCheekRatio > 1.05) {
  shape = "Square";
} else if (jawToCheekRatio < 0.75 && heightToWidthRatio >= 1.2) {
  shape = "Heart";
} else if (jawToCheekRatio < 0.9 && heightToWidthRatio >= 1.4) {
  shape = "Diamond";
} else if (
  heightToWidthRatio <= 1.05 &&
  jawToCheekRatio >= 0.95 &&
  jawToCheekRatio <= 1.05
) {
  shape = "Round";
} else {
  shape = "Oval";
}

          setFaceShape(shape);
          setSuggestion(`${shape}: Recommended styles tailored for you`);
          setConfidence((predictions[0].score || 1.0) * 100);

          ctx.fillStyle = "#f43f5e";
          keypoints.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fill();
          });
        } else {
          setSuggestion("No face detected");
          setConfidence(0);
          setFaceShape("");
        }

        requestAnimationFrame(detect);
      };

      detect();
    }

    setupCamera().then(() => {
      videoRef.current.play();
      detectFace();
    });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
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
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 640, height: 480 }}>
        <video
          ref={videoRef}
          width={640}
          height={480}
          autoPlay
          playsInline
          muted
          style={{ borderRadius: 8 }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      {(!premium && captureCount >= 2) ? (
        <p style={{ color: "#f87171", marginTop: 12, fontSize: 16 }}>
          📸 Free capture limit reached. Upgrade to Premium for unlimited photos.
        </p>
      ) : (
        <button
          onClick={handleCapturePhoto}
          style={{
            marginTop: 16,
            padding: "0.75rem 2rem",
            backgroundColor: "#f43f5e",
            color: "#fff",
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          📸 Capture Photo
        </button>
      )}

      {capturedImage && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <h3 style={{ marginBottom: 8 }}>Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ borderRadius: 8, width: 320 }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/female/skincare")}
          style={buttonStyle}
        >
          Skincare
        </button>
        <button
          onClick={() => navigate("/female/haircut", { state: { faceShape } })}
          style={buttonStyle}
        >
          Haircut
        </button>
        <button
          onClick={() => navigate("/female/makeup")}
          style={buttonStyle}
        >
          Makeup
        </button>
      </div>

      <div
        style={{
          border: "1px solid #333",
          padding: "1rem",
          borderRadius: 8,
          width: 400,
          backgroundColor: "#111",
          textAlign: "center",
          minHeight: 80,
        }}
      >
        <h3>Skin Analysis</h3>
        <p>{suggestion || "Analyzing..."}</p>
      </div>

      <p style={{ marginTop: 16, fontSize: 16, color: "#f43f5e" }}>
        Confidence: {confidence.toFixed(1)}%
      </p>
    </div>
  );
}

const buttonStyle = {
  fontSize: 18,
  padding: "1rem 2rem",
  backgroundColor: "#f43f5e",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};
