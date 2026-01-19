import React, { useState, useEffect, useRef } from "react";
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
import EmotionsGamePage from "./components/english/EmotionsGamePage";
import DaysMenuPage from "./components/english/DaysMenuPage";
import DaysLearningPage from "./components/english/DaysLearningPage";
import DaysGamePage from "./components/english/DaysGamePage";

import FamilyMenuPage from "./components/english/FamilyMenuPage";
import FamilyLearningPage from "./components/english/FamilyLearningPage";
import FamilyGamePage from "./components/english/FamilyGamePage";

// --- โซนภาษาไทย ---
import ThaiAlphabetPage from "./components/thai/ThaiAlphabetPage";
import ThaiGamePage from "./components/thai/ThaiGamePage";
import ThaiWritingMenuPage from "./components/thai/ThaiWritingMenuPage";
import ThaiReadingMenuPage from "./components/thai/ThaiReadingMenuPage";
import ThaiLearningPage from "./components/thai/ThaiLearningPage";
import ThaiGameMenuPage from "./components/thai/ThaiGameMenuPage";
import ThaiMatchingGamePage from "./components/thai/ThaiMatchingGamePage";

// --- โซนคณิตศาสตร์ (เพิ่มใหม่) ---
import MathMenuPage from "./components/math/MathMenuPage";

// --- โซนสังคมศึกษา ---
import SocialMenuPage from "./components/social/SocialMenuPage";

// --- โซนศิลปะ ---
import ArtMenuPage from "./components/art/ArtMenuPage";

// --- โซนอาเซียน ---
import AseanMenuPage from "./components/asean/AseanMenuPage";
import AseanNationalFlagsPage from "./components/asean/AseanNationalFlagsPage";
import AseanGreetingsPage from "./components/asean/AseanGreetingsPage";
import AseanNationalDishesPage from "./components/asean/AseanNationalDishesPage";
import AseanNationalAnimalsPage from "./components/asean/AseanNationalAnimalsPage";
import AseanNationalCostumesPage from "./components/asean/AseanNationalCostumesPage";
import AseanNationalFlowersPage from "./components/asean/AseanNationalFlowersPage";
import AseanGameMenuPage from "./components/asean/AseanGameMenuPage";
import AseanGameTraceAnimalPage from "./components/asean/AseanGameTraceAnimalPage";
import AseanGameFlagsPage from "./components/asean/AseanGameFlagsPage";
import AseanGameFlowersPage from "./components/asean/AseanGameFlowersPage";
import AseanGameDressPage from "./components/asean/AseanGameDressPage";
import AseanGameGreetingPage from "./components/asean/AseanGameGreetingPage";

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
    } else if (item.title === "คณิตศาสตร์") {
      navigate("/math"); // เพิ่มลิ้งค์ไปหน้าคณิตศาสตร์
    } else if (item.title === "สังคมศึกษา") {
      navigate("/social");
    } else if (item.title === "ศิลปะ") {
      navigate("/art");
    } else if (item.title === "นิทานอีสป") {
      navigate("/stories");
    } else if (item.title === "อาเซียน") {
      navigate("/asean");
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
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <BrowserRouter>
      <audio ref={audioRef} src="/sounds/bg_music.mp3" loop />

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
        />
        <Route path="/family" element={<FamilyMenuPage isMuted={isMuted} />} />
        <Route
          path="/family/learn"
          element={<FamilyLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/family/game"
          element={<FamilyGamePage isMuted={isMuted} />}
        />
        <Route path="/days" element={<DaysMenuPage isMuted={isMuted} />} />
        <Route
          path="/days/learn"
          element={<DaysLearningPage isMuted={isMuted} />}
        />
        <Route path="/days/game" element={<DaysGamePage isMuted={isMuted} />} />

        {/* --- โซนภาษาไทย --- */}
        <Route
          path="/thai-alphabet"
          element={<ThaiAlphabetPage isMuted={isMuted} />}
        />
        <Route
          path="/thai/writing"
          element={<ThaiWritingMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/thai/reading"
          element={<ThaiReadingMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-alphabet/learn"
          element={<ThaiWritingMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-vowels"
          element={<ThaiReadingMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-alphabet/write-consonant"
          element={<ThaiLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/thai-alphabet/read-consonant"
          element={<ThaiLearningPage isMuted={isMuted} />}
        />
        <Route
          path="/thai/game"
          element={<ThaiGameMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/thai/game/guess"
          element={<ThaiGamePage isMuted={isMuted} />}
        />
        <Route
          path="/thai/game/match"
          element={<ThaiMatchingGamePage isMuted={isMuted} />}
        />

        {/* --- โซนคณิตศาสตร์ (เพิ่มใหม่) --- */}
        <Route path="/math" element={<MathMenuPage isMuted={isMuted} />} />

        {/* --- โซนสังคมศึกษา --- */}
        <Route path="/social" element={<SocialMenuPage isMuted={isMuted} />} />

        {/* --- โซนศิลปะ --- */}
        <Route path="/art" element={<ArtMenuPage isMuted={isMuted} />} />

        {/* --- โซนอาเซียน --- */}
        <Route path="/asean" element={<AseanMenuPage isMuted={isMuted} />} />
        <Route
          path="/asean/flags"
          element={<AseanNationalFlagsPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/greetings"
          element={<AseanGreetingsPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/national-dishes"
          element={<AseanNationalDishesPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/national-animals"
          element={<AseanNationalAnimalsPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/national-costumes"
          element={<AseanNationalCostumesPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/national-flowers"
          element={<AseanNationalFlowersPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/game-menu"
          element={<AseanGameMenuPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/asean-trace"
          element={<AseanGameTraceAnimalPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/asean-flags"
          element={<AseanGameFlagsPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/asean-flowers"
          element={<AseanGameFlowersPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/asean-dress"
          element={<AseanGameDressPage isMuted={isMuted} />}
        />
        <Route
          path="/asean/asean-greeting"
          element={<AseanGameGreetingPage isMuted={isMuted} />}
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
