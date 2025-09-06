import { createContext, useContext, useState } from "react";

const FaceShapeContext = createContext();

export function FaceShapeProvider({ children }) {
  const [faceShape, setFaceShape] = useState("");
  return (
    <FaceShapeContext.Provider value={{ faceShape, setFaceShape }}>
      {children}
    </FaceShapeContext.Provider>
  );
}

export function useFaceShape() {
  return useContext(FaceShapeContext);
}
