import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import bgImage from "./assets/images/bg.png";
import MenuCard from "./components/MenuCard";
import LessonPage from "./components/LessonPage";

// --- โซนภาษาอังกฤษ ---
import DifferentSoundGamePage from "./components/english/DifferentSoundGamePage";
import AlphabetMenuPage from "./components/english/AlphabetMenuPage";
import AlphabetLearningPage from "./components/english/AlphabetLearningPage";
import AlphabetGamePage from "./components/english/AlphabetGamePage";
import ABCSelectionPage from "./components/english/ABCSelectionPage";
import DailyActivityPage from "./components/english/DailyActivityPage";
import FeelingMenuPage from "./components/english/FeelingMenuPage";
import MovementMatchingPage from "./components/english/MovementMatchingPage";
import EmotionsGamePage from './components/english/EmotionsGamePage';

// --- โซนภาษาไทย ---
import ThaiAlphabetPage from "./components/thai/ThaiAlphabetPage";
import ThaiGamePage from "./components/thai/ThaiGamePage";
import ThaiWritingMenuPage from "./components/thai/ThaiWritingMenuPage"; // เมนูการเขียน
import ThaiReadingMenuPage from "./components/thai/ThaiReadingMenuPage"; // ⭐ เมนูการอ่าน (เพิ่มใหม่)
import ThaiLearningPage from "./components/thai/ThaiLearningPage"; // (เก็บไว้ใช้เป็นหน้าเนื้อหา)

// --- โซนอื่นๆ ---
import ColorsMenuPage from "./components/ColorsMenuPage";
import ColorsLearningPage from "./components/ColorsLearningPage";
import ColorsGamePage from "./components/ColorsGamePage";
import StoryMenuPage from "./components/StoryMenuPage";
import StoryPlayerPage from "./components/StoryPlayerPage";

// Import รูปภาพ
import thai from "./assets/images/thai.png";
import eng from "./assets/images/eng.png";
import math from "./assets/images/math.png";
import cont from "./assets/images/cont.png";
import story from "./assets/images/story.png";
import sci from "./assets/images/sci.png";
import draw from "./assets/images/draw.png";
import Phonics from "./assets/images/Phonics.png";
import asean from "./assets/images/asean.png";
// เพิ่มอาเซียน
const menus = [
  { id: 1, title: "ภาษาไทย", image: thai },
  { id: 2, title: "ภาษาอังกฤษ", image: eng },
  { id: 3, title: "คณิตศาสตร์", image: math },
  { id: 4, title: "สังคมศึกษา", image: cont },
  { id: 5, title: "นิทานอีสป", image: story },
  { id: 6, title: "วิทยาศาสตร์", image: sci },
  { id: 7, title: "ศิลปะ", image: draw },
  { id: 8, title: "Phonics", image: Phonics },
  { id: 9, title: "อาเซียน", image: asean },
];

function HomeMenu({ isMuted }) {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item.title === "ภาษาอังกฤษ") {
      navigate("/alphabet");
    } else if (item.title === "ภาษาไทย") {
      navigate("/thai-alphabet");
    } else if (item.title === "นิทานอีสป") {
      navigate("/stories");
    } else {
      alert(`วิชา ${item.title} กำลังอยู่ระหว่างการพัฒนาครับ 🚧`);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {menus.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              isMuted={isMuted}
              onClick={() => handleMenuClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <BrowserRouter>
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-xl border-4 border-white transition-all hover:scale-110 ${
          isMuted ? "bg-gray-400" : "bg-green-500"
        }`}
      >
        <span className="text-3xl">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      <Routes>
        <Route path="/" element={<HomeMenu isMuted={isMuted} />} />
        {/* --- โซนภาษาอังกฤษ --- */}
        <Route
          path="/alphabet"
          element={<AlphabetMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/alphabet/select"
          element={<ABCSelectionPage isMuted={isMuted} />}
        />
        <Route
          path="/alphabet/learn"
          element={<AlphabetLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/alphabet/game"
          element={<AlphabetGamePage isMuted={isMuted} />}
        />
        <Route
          path="/feeling"
          element={<FeelingMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/feeling/movement"
          element={<MovementMatchingPage isMuted={isMuted} />}
        />
        <Route
          path="/activity"
          element={<DailyActivityPage isMuted={isMuted} />}
        />
        <Route
          path="/alphabet/game-sound"
          element={<DifferentSoundGamePage isMuted={isMuted} />}
        />
        <Route
          path="/feeling/emotions"
          element={<EmotionsGamePage isMuted={isMuted} />}
        />{" "}
        {/* <-- อันใหม่ */}
        {/* --- โซนภาษาไทย --- */}
        <Route
          path="/thai-alphabet"
          element={<ThaiAlphabetPage isMuted={isMuted} />}
        />
        {/* เมนูการเขียน (5 ปุ่ม) */}
        <Route
          path="/thai-alphabet/learn"
          element={<ThaiWritingMenuPage isMuted={isMuted} />}
        />
        {/* เดิม: /thai-vowels (จากหน้า ThaiAlphabetPage ปุ่มที่ 2) */}
        <Route
          path="/thai-vowels"
          element={<ThaiReadingMenuPage isMuted={isMuted} />}
        />
        {/* Route ย่อยๆ ข้างใน (ชี้ไปหน้าเรียนรู้เนื้อหาเดิมก่อน กัน Error) */}
        <Route
          path="/thai-alphabet/write-consonant"
          element={<ThaiLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-alphabet/read-consonant"
          element={<ThaiLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-alphabet/game"
          element={<ThaiGamePage isMuted={isMuted} />}
        />
        {/* --- โซนอื่นๆ --- */}
        <Route path="/colors" element={<ColorsMenuPage isMuted={isMuted} />} />
        <Route
          path="/colors/learn"
          element={<ColorsLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/colors/game"
          element={<ColorsGamePage isMuted={isMuted} />}
        />
        <Route path="/stories" element={<StoryMenuPage isMuted={isMuted} />} />
        <Route
          path="/stories/watch"
          element={<StoryPlayerPage isMuted={isMuted} />}
        />
        <Route path="/lesson" element={<LessonPage isMuted={isMuted} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
