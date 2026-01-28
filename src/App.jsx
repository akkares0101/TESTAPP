import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Import ภาพพื้นหลังและ Components หลัก
import bgImage from "./assets/images/bg.png";
import MenuCard from "./components/MenuCard";
import LessonPage from "./components/LessonPage"; 

// ================== Import โซนภาษาอังกฤษ ==================
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

// ================== Import โซนภาษาไทย ==================
import ThaiAlphabetPage from "./components/thai/ThaiAlphabetPage";
import ThaiGamePage from "./components/thai/ThaiGamePage";
import ThaiWritingMenuPage from "./components/thai/ThaiWritingMenuPage";
import ThaiReadingMenuPage from "./components/thai/ThaiReadingMenuPage";
import ThaiLearningPage from "./components/thai/ThaiLearningPage";
import ThaiGameMenuPage from "./components/thai/ThaiGameMenuPage";
import ThaiMatchingGamePage from "./components/thai/ThaiMatchingGamePage";

// ================== Import โซนคณิตศาสตร์ ==================
import MathMenuPage from "./components/math/MathMenuPage";
import MathCountingPage from "./components/math/MathCountingPage";
import MathReadEngPage from "./components/math/MathReadEngPage";
import MathReadArabicPage from "./components/math/MathReadArabicPage";
import MathReadThaiPage from "./components/math/MathReadThaiPage";
import MathWritingPage from "./components/math/MathWritingPage";
import MathMoneyPage from "./components/math/MathMoneyPage";

// ================== Import โซนวิทยาศาสตร์ ==================
import ScienceMenuPage from "./components/science/ScienceMenuPage";
import ScienceIntroPage from "./components/science/ScienceIntroPage";

// ================== Import โซนสังคมศึกษา ==================
import SocialMenuPage from "./components/social/SocialMenuPage";

// ================== Import โซนศิลปะ ==================
import ArtMenuPage from "./components/art/ArtMenuPage";

// ================== Import โซนอาเซียน ==================
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

// ================== Import โซน Phonics ==================
import PhonicsMenuPage from "./components/phonics/PhonicsMenuPage";
import PhonicsSoundPage from "./components/phonics/PhonicsSoundPage";
import PhonicsMappingPage from "./components/phonics/PhonicsMappingPage";
import PhonicsVowelsPage from "./components/phonics/PhonicsVowelsPage";
import PhonicsSpellingPage from "./components/phonics/PhonicsSpellingPage";
import PhonicsReadingPage from "./components/phonics/PhonicsReadingPage";

// ================== Import โซนอื่นๆ (สี, นิทาน) ==================
import ColorsMenuPage from "./components/ColorsMenuPage";
import ColorsLearningPage from "./components/ColorsLearningPage";
import ColorsGamePage from "./components/ColorsGamePage";
import StoryMenuPage from "./components/StoryMenuPage";
import StoryPlayerPage from "./components/StoryPlayerPage";

// Import รูปภาพเมนู
import thai from "./assets/images/thai.png";
import eng from "./assets/images/eng.png";
import math from "./assets/images/math.png";
import cont from "./assets/images/cont.png";
import story from "./assets/images/story.png";
import sci from "./assets/images/sci.png";
import draw from "./assets/images/draw.png";
import Phonics from "./assets/images/Phonics.png";
import asean from "./assets/images/asean.png";

// ข้อมูลเมนูหน้าแรก
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

// --- Component: ปุ่มย้อนกลับกลาง (Global Back Button) ---
// ✅ อยู่ซ้ายล่าง (ขยับมาขวาที่ left-24 เพื่อหลบปุ่ม Home)
function GlobalBackButton({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const clickSound = new Audio('/sounds/click.mp3');

  if (location.pathname === '/') {
    return null;
  }

  const handleBack = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    navigate(-1);
  };

  return (
    <div className="fixed bottom-4 left-24 z-[9999]">
      <button
        onClick={handleBack}
        className="
          group flex items-center justify-center
          w-14 h-14 md:w-16 md:h-16
          bg-white text-orange-500
          rounded-full
          border-4 border-orange-200
          shadow-[0_4px_0_#fed7aa]
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_0_#fed7aa] hover:bg-orange-50
          active:scale-95 active:translate-y-1 active:shadow-none
          transition-all duration-200
        "
        title="ย้อนกลับ"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-8 h-8 md:w-9 md:h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  );
}

// --- Component: ปุ่ม Home กลาง (Global Home Button) ---
// ✅ ย้ายมาอยู่ซ้ายล่างสุด (left-4)
function GlobalHomeButton({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const clickSound = new Audio('/sounds/click.mp3');

  if (location.pathname === '/') {
    return null;
  }

  const goHome = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    navigate('/');
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <button
        onClick={goHome}
        className="
          group flex items-center justify-center
          w-14 h-14 md:w-16 md:h-16
          bg-white text-pink-500
          rounded-full
          border-4 border-pink-200
          shadow-[0_4px_0_#fbcfe8]
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_0_#fbcfe8] hover:bg-pink-50
          active:scale-95 active:translate-y-1 active:shadow-none
          transition-all duration-200
        "
        title="กลับหน้าหลัก"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-9 md:h-9">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.635 8.635a.75.75 0 11-1.06 1.06l-2.035-2.035V20.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V11.49l-2.035 2.035a.75.75 0 11-1.06-1.06l8.635-8.635z" />
          <path d="M11.25 19.5h1.5v-6h-1.5v6z" />
        </svg>
      </button>
    </div>
  );
}

// --- Component: หน้าเมนูหลัก ---
function HomeMenu({ isMuted }) {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item.title === "ภาษาอังกฤษ") navigate("/alphabet");
    else if (item.title === "ภาษาไทย") navigate("/thai-alphabet");
    else if (item.title === "คณิตศาสตร์") navigate("/math");
    else if (item.title === "วิทยาศาสตร์") navigate("/science");
    else if (item.title === "สังคมศึกษา") navigate("/social");
    else if (item.title === "ศิลปะ") navigate("/art");
    else if (item.title === "นิทานอีสป") navigate("/stories");
    else if (item.title === "อาเซียน") navigate("/asean");
    else if (item.title === "Phonics") navigate("/phonics");
    else alert(`วิชา ${item.title} กำลังอยู่ระหว่างการพัฒนาครับ 🚧`);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <div className="
           flex flex-wrap justify-center items-center
           gap-6 md:gap-10 2xl:gap-14
           max-w-[80rem] 2xl:max-w-[100rem]
        ">
          {menus.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              isMuted={isMuted}
              onClick={() => handleMenuClick(item)}
              className="transform hover:scale-110 transition-transform duration-300 2xl:scale-125"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = useRef(null);

  // จัดการเสียงเพลงพื้นหลัง (หยุดเมื่อปิดเสียง หรือดูวิดีโอ)
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted || isVideoPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
      }
    }
  }, [isMuted, isVideoPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.3;
  }, []);

  // ฟังก์ชันซูม
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <BrowserRouter>
      <audio ref={audioRef} src="/sounds/bg_music.mp3" loop />

      {/* --- Control Panel (มุมขวาบน) --- */}
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2 bg-white/90 backdrop-blur px-2 py-2 rounded-full shadow-lg border-2 border-gray-200">
        <button onClick={handleZoomOut} className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold active:scale-95 transition-all" title="ย่อขนาด">-</button>
        <button onClick={handleResetZoom} className="min-w-[50px] text-center font-bold text-gray-700 text-sm md:text-base hover:text-blue-500" title="คืนค่าเดิม">{Math.round(zoomLevel * 100)}%</button>
        <button onClick={handleZoomIn} className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold active:scale-95 transition-all" title="ขยายขนาด">+</button>
        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 ${
            isMuted ? "bg-gray-400 text-white" : "bg-green-500 text-white"
          }`}
          title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
        >
          <span className="text-lg md:text-2xl">{isMuted ? "🔇" : "🔊"}</span>
        </button>
      </div>

      {/* ✅ 1. ปุ่ม Home (ซ้ายล่างสุด) */}
      <GlobalHomeButton isMuted={isMuted} />

      {/* ✅ 2. ปุ่มย้อนกลับ (ซ้ายล่าง ถัดจากปุ่ม Home) */}
      <GlobalBackButton isMuted={isMuted} />

      {/* --- พื้นที่แสดงผลหลัก (Zoomable) --- */}
      <div 
        style={{ 
          zoom: zoomLevel, 
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<HomeMenu isMuted={isMuted} />} />

          {/* ================= โซนภาษาอังกฤษ ================= */}
          <Route path="/alphabet" element={<AlphabetMenuPage isMuted={isMuted} />} />
          <Route path="/alphabet/select" element={<ABCSelectionPage isMuted={isMuted} />} />
          <Route path="/alphabet/learn" element={<AlphabetLearningPage isMuted={isMuted} />} />
          <Route path="/alphabet/game" element={<AlphabetGamePage isMuted={isMuted} />} />
          <Route path="/alphabet/game-sound" element={<DifferentSoundGamePage isMuted={isMuted} />} />
          <Route path="/feeling" element={<FeelingMenuPage isMuted={isMuted} />} />
          <Route path="/feeling/movement" element={<MovementMatchingPage isMuted={isMuted} />} />
          <Route path="/feeling/emotions" element={<EmotionsGamePage isMuted={isMuted} />} />
          <Route path="/activity" element={<DailyActivityPage isMuted={isMuted} />} />
          <Route path="/family" element={<FamilyMenuPage isMuted={isMuted} />} />
          <Route path="/family/learn" element={<FamilyLearningPage isMuted={isMuted} />} />
          <Route path="/family/game" element={<FamilyGamePage isMuted={isMuted} />} />
          <Route path="/days" element={<DaysMenuPage isMuted={isMuted} />} />
          <Route path="/days/learn" element={<DaysLearningPage isMuted={isMuted} />} />
          <Route path="/days/game" element={<DaysGamePage isMuted={isMuted} />} />

          {/* ================= โซนภาษาไทย ================= */}
          <Route path="/thai-alphabet" element={<ThaiAlphabetPage isMuted={isMuted} />} />
          <Route path="/thai/writing" element={<ThaiWritingMenuPage isMuted={isMuted} />} />
          <Route path="/thai/reading" element={<ThaiReadingMenuPage isMuted={isMuted} />} />
          <Route path="/thai-alphabet/learn" element={<ThaiWritingMenuPage isMuted={isMuted} />} />
          <Route path="/thai-vowels" element={<ThaiReadingMenuPage isMuted={isMuted} />} />
          <Route path="/thai-alphabet/write-consonant" element={<ThaiLearningPage isMuted={isMuted} />} />
          <Route path="/thai-alphabet/read-consonant" element={<ThaiLearningPage isMuted={isMuted} />} />
          <Route path="/thai/game" element={<ThaiGameMenuPage isMuted={isMuted} />} />
          <Route path="/thai/game/guess" element={<ThaiGamePage isMuted={isMuted} />} />
          <Route path="/thai/game/match" element={<ThaiMatchingGamePage isMuted={isMuted} />} />

          {/* ================= โซนคณิตศาสตร์ ================= */}
          <Route path="/math" element={<MathMenuPage isMuted={isMuted} />} />
          <Route path="/math/counting" element={<MathCountingPage isMuted={isMuted} />} />
          <Route path="/math/read-eng" element={<MathReadEngPage isMuted={isMuted} />} />
          <Route path="/math/read-arabic" element={<MathReadArabicPage isMuted={isMuted} />} />
          <Route path="/math/read-thai" element={<MathReadThaiPage isMuted={isMuted} />} />
          <Route path="/math/writing" element={<MathWritingPage isMuted={isMuted} />} />
          <Route path="/math/money" element={<MathMoneyPage isMuted={isMuted} />} />

          {/* ================= โซนวิทยาศาสตร์ ================= */}
          <Route path="/science" element={<ScienceMenuPage isMuted={isMuted} />} />
          <Route path="/science/intro" element={<ScienceIntroPage isMuted={isMuted} />} />

          {/* ================= โซนสังคมศึกษา ================= */}
          <Route path="/social" element={<SocialMenuPage isMuted={isMuted} />} />

          {/* ================= โซนศิลปะ ================= */}
          <Route path="/art" element={<ArtMenuPage isMuted={isMuted} />} />

          {/* ================= โซนอาเซียน ================= */}
          <Route path="/asean" element={<AseanMenuPage isMuted={isMuted} />} />
          <Route path="/asean/flags" element={<AseanNationalFlagsPage isMuted={isMuted} />} />
          <Route path="/asean/greetings" element={<AseanGreetingsPage isMuted={isMuted} />} />
          <Route path="/asean/national-dishes" element={<AseanNationalDishesPage isMuted={isMuted} />} />
          <Route path="/asean/national-animals" element={<AseanNationalAnimalsPage isMuted={isMuted} />} />
          <Route path="/asean/national-costumes" element={<AseanNationalCostumesPage isMuted={isMuted} />} />
          <Route path="/asean/national-flowers" element={<AseanNationalFlowersPage isMuted={isMuted} />} />
          <Route path="/asean/game-menu" element={<AseanGameMenuPage isMuted={isMuted} />} />
          <Route path="/asean/asean-trace" element={<AseanGameTraceAnimalPage isMuted={isMuted} />} />
          <Route path="/asean/asean-flags" element={<AseanGameFlagsPage isMuted={isMuted} />} />
          <Route path="/asean/asean-flowers" element={<AseanGameFlowersPage isMuted={isMuted} />} />
          <Route path="/asean/asean-dress" element={<AseanGameDressPage isMuted={isMuted} />} />
          <Route path="/asean/asean-greeting" element={<AseanGameGreetingPage isMuted={isMuted} />} />

          {/* ================= โซน Phonics ================= */}
          <Route path="/phonics" element={<PhonicsMenuPage isMuted={isMuted} />} />
          <Route path="/phonics/sounds" element={<PhonicsSoundPage isMuted={isMuted} />} />
          <Route path="/phonics/mapping" element={<PhonicsMappingPage isMuted={isMuted} />} />
          <Route path="/phonics/vowels" element={<PhonicsVowelsPage isMuted={isMuted} />} />
          <Route path="/phonics/spelling" element={<PhonicsSpellingPage isMuted={isMuted} />} />
          <Route path="/phonics/reading" element={<PhonicsReadingPage isMuted={isMuted} />} />

          {/* ================= โซนอื่นๆ (สี, นิทาน) ================= */}
          <Route path="/colors" element={<ColorsMenuPage isMuted={isMuted} />} />
          <Route path="/colors/learn" element={<ColorsLearningPage isMuted={isMuted} />} />
          <Route path="/colors/game" element={<ColorsGamePage isMuted={isMuted} />} />
          <Route path="/stories" element={<StoryMenuPage isMuted={isMuted} />} />
          
          {/* ================= หน้าเล่นวิดีโอ (Lesson & Story Player) ================= */}
          {/* ส่ง setIsVideoPlaying เพื่อปิดเพลงพื้นหลังตอนเล่นวิดีโอ */}
          <Route 
            path="/stories/watch" 
            element={
              <StoryPlayerPage 
                isMuted={isMuted} 
                onVideoStateChange={setIsVideoPlaying} 
              />
            } 
          />

          <Route 
            path="/lesson" 
            element={
              <LessonPage 
                isMuted={isMuted} 
                onVideoStateChange={setIsVideoPlaying} 
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;