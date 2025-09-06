import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MalePage from "./pages/MalePage";
import SkincarePage from "./pages/SkincarePage";
import HaircutSuggestions from "./pages/HaircutSuggestions";
import PrepareMale from "./pages/PrepareMale";
import PremiumPage from "./pages/PremiumPage";
import AcneProducts from "./pages/AcneProducts";
import NormalSkinProducts from "./pages/NormalSkinProducts";

import PrepareFemale from "./pages/PrepareFemale";
import FemalePage from "./pages/FemalePage";
import FemaleSkincarePage from "./pages/FemaleSkincarePage";
import HaircutSuggestionsFemale from "./pages/HaircutSuggestionsFemale";
import MakeupPage from "./pages/MakeupPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PremiumPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/prepare-male" element={<PrepareMale />} />
      <Route path="/male" element={<MalePage />} />
      <Route path="/male/skincare" element={<SkincarePage />} />
      <Route path="/male/haircut" element={<HaircutSuggestions />} />
      <Route path="/acne-products" element={<AcneProducts />} />
      <Route path="/normal-skin-products" element={<NormalSkinProducts />} />

      <Route path="/prepare-female" element={<PrepareFemale />} />
      <Route path="/female" element={<FemalePage />} />
      <Route path="/female/skincare" element={<FemaleSkincarePage />} />
      <Route path="/female/haircut" element={<HaircutSuggestionsFemale />} />
      <Route path="/female/makeup" element={<MakeupPage />} />
    </Routes>
  );
}
