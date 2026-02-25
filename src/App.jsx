import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
import ThaiWritingMenuPage from "./components/thai/ThaiWritingMenuPage";
import ThaiReadingMenuPage from "./components/thai/ThaiReadingMenuPage";
import ThaiLearningPage from "./components/thai/ThaiLearningPage";
import ThaiReadVowelsPage from "./components/thai/ThaiReadVowelsPage";
import ThaiReadTonePage from "./components/thai/ThaiReadTonePage"; 
import ThaiWriteConsonantPage from "./components/thai/ThaiWriteConsonantPage";
import ThaiWriteVowelsPage from "./components/thai/ThaiWriteVowelsPage";
import ThaiWriteTonePage from "./components/thai/ThaiWriteTonePage";

// ================== Import โซนคณิตศาสตร์ ==================
import MathMenuPage from "./components/math/MathMenuPage";
import MathCountingPage from "./components/math/MathCountingPage";
import MathReadEngPage from "./components/math/MathReadEngPage";
import MathReadArabicPage from "./components/math/MathReadArabicPage";
import MathReadThaiPage from "./components/math/MathReadThaiPage";
import MathWritingPage from "./components/math/MathWritingPage";
import MathMoneyPage from "./components/math/MathMoneyPage";
import MathGamePage from "./components/math/MathGamePage";

// ================== Import โซนวิทยาศาสตร์ ==================
import ScienceMenuPage from "./components/science/ScienceMenuPage";
import ScienceIntroPage from "./components/science/ScienceIntroPage";
import ScienceAnimalsPage from "./components/science/ScienceAnimalsPage";
import ScienceEnvironmentPage from "./components/science/ScienceEnvironmentPage"; 
import ScienceSortingPage from "./components/science/ScienceSortingPage";
import ScienceReviewEnvPage from "./components/science/ScienceReviewEnvPage";
import ScienceReviewBodyPage from "./components/science/ScienceReviewBodyPage";
import ScienceGamePage from "./components/science/ScienceGamePage";

// ================== Import โซนสังคมศึกษา ==================
import SocialMenuPage from "./components/social/SocialMenuPage";
import SocialGamePage from "./components/social/SocialGamePage";
import SocialSelfCarePage from "./components/social/SocialSelfCarePage"; // ⭐
import SocialDressingPage from "./components/social/SocialDressingPage"; // ⭐
import SocialRoutinesPage from "./components/social/SocialRoutinesPage"; // ⭐
import SocialFamilyPage from "./components/social/SocialFamilyPage"; // ⭐
import SocialFlagPage from "./components/social/SocialFlagPage"; // ⭐
import SocialCulturePage from "./components/social/SocialCulturePage"; // ⭐
import SocialImportantDaysPage from "./components/social/SocialImportantDaysPage"; // ⭐
import SocialReligionPage from "./components/social/SocialReligionPage"; // ⭐

// ================== Import โซนศิลปะ ==================
import ArtMenuPage from "./components/art/ArtMenuPage";
import ArtVisualElementsPage from "./components/art/ArtVisualElementsPage"; 
import ArtColoringPage from "./components/art/ArtColoringPage"; 
import ArtTexturePage from "./components/art/ArtTexturePage"; 
import ArtBeautifulWorldPage from "./components/art/ArtBeautifulWorldPage"; 
import ArtColorTonePage from "./components/art/ArtColorTonePage"; 
import ArtLineArtPage from "./components/art/ArtLineArtPage"; 
import ArtToolsPage from "./components/art/ArtToolsPage"; 

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
import PhonicsGamePage from "./components/phonics/PhonicsGamePage";

// ================== Import โซนบัตรคำ (Flashcard) ==================
import FlashcardMenuPage from "./components/flashcard/FlashcardMenuPage";
import FlashcardPlayerPage from "./components/flashcard/FlashcardPlayerPage";

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
import flashcard from "./assets/images/flashcard.png";

const menus = [
  { id: 1, title: "ภาษาอังกฤษ", image: eng },
  { id: 2, title: "Phonics", image: Phonics },
  { id: 3, title: "ภาษาไทย", image: thai },
  { id: 4, title: "คณิตศาสตร์", image: math },
  { id: 5, title: "วิทยาศาสตร์", image: sci },
  { id: 6, title: "สังคมศึกษา", image: cont },
  { id: 7, title: "อาเซียน", image: asean },
  { id: 8, title: "ศิลปะ", image: draw },
  { id: 9, title: "นิทานอีสป", image: story },
  { id: 10, title: "บัตรคำศัพท์", image: flashcard }, // คงไว้สุดท้ายเพื่อให้แถวสวยงาม (4-4-2)
];

// --- Component: ปุ่มย้อนกลับกลาง (ลดขนาดลง) ---
function GlobalBackButton({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const clickSound = new Audio("/sounds/click.mp3");

  if (location.pathname === "/") {
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
    <div className="fixed bottom-4 left-20 z-[9999]">
      <button
        onClick={handleBack}
        className="
          group flex items-center justify-center
          w-12 h-12 md:w-14 md:h-14
          bg-white text-orange-500
          rounded-full
          border-[3px] border-orange-200
          shadow-[0_4px_0_#fed7aa]
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_0_#fed7aa]
          active:scale-95 active:translate-y-1 active:shadow-none
          transition-all duration-200
        "
        title="ย้อนกลับ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="w-7 h-7 md:w-8 md:h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    </div>
  );
}

// --- Component: ปุ่ม Home กลาง (ลดขนาดลง) ---
function GlobalHomeButton({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const clickSound = new Audio("/sounds/click.mp3");

  if (location.pathname === "/") {
    return null;
  }

  const goHome = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    navigate("/");
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <button
        onClick={goHome}
        className="
          group flex items-center justify-center
          w-12 h-12 md:w-14 md:h-14
          bg-white text-pink-500
          rounded-full
          border-[3px] border-pink-200
          shadow-[0_4px_0_#fbcfe8]
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_0_#fbcfe8]
          active:scale-95 active:translate-y-1 active:shadow-none
          transition-all duration-200
        "
        title="กลับหน้าหลัก"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 md:w-8 md:h-8"
        >
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
    else if (item.title === "บัตรคำศัพท์") navigate("/flashcard");
    else alert(`วิชา ${item.title} กำลังอยู่ระหว่างการพัฒนาครับ 🚧`);
  };

  const renderCard = (item) => (
    <MenuCard
      key={item.id}
      image={item.image}
      isMuted={isMuted}
      onClick={() => handleMenuClick(item)}
      className="transform hover:scale-110 transition-transform duration-300 w-14 h-14 md:w-16 md:h-16 2xl:w-20 2xl:h-20" 
    />
  );

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 z-10 flex flex-col items-center gap-2 md:gap-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {menus.slice(0, 4).map(renderCard)}
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {menus.slice(4, 8).map(renderCard)}
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {menus.slice(8, 10).map(renderCard)}
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
function App() {
  const [isMuted, setIsMuted] = useState(false); // 🛠️ เริ่มต้นเปิดเพลงเลย
  const [globalVolume, setGlobalVolume] = useState(0.3);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = globalVolume;
      
      const playAudio = () => {
        if (!isMuted && !isVideoPlaying) {
          audio.play().catch((err) => console.log("รอ User สัมผัสหน้าจอครั้งแรก..."));
        } else {
          audio.pause();
        }
      };

      playAudio();

      const unlock = () => {
        playAudio();
        window.removeEventListener("click", unlock);
      };
      window.addEventListener("click", unlock);
      return () => window.removeEventListener("click", unlock);
    }
  }, [isMuted, isVideoPlaying, globalVolume]);

  const handleVolumeDown = () => {
    setGlobalVolume((prev) => {
      const newVol = Math.max(prev - 0.1, 0.0);
      if (newVol <= 0.01) setIsMuted(true);
      return newVol;
    });
  };

  const handleVolumeUp = () => {
    setGlobalVolume((prev) => {
      const newVol = Math.min(prev + 0.1, 1.0);
      if (newVol > 0 && isMuted) setIsMuted(false);
      return newVol;
    });
  };

  return (
    <BrowserRouter>
      <audio ref={audioRef} src="/sounds/bg_music.mp3" loop />

      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2 bg-white/90 backdrop-blur px-2 py-1.5 rounded-full shadow-lg border-2 border-gray-200">
        <button
          onClick={handleVolumeDown}
          className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold active:scale-95 transition-all"
        >
          -
        </button>
        <div className="min-w-[45px] text-center font-bold text-gray-700 text-xs md:text-sm">
          {Math.round(globalVolume * 100)}%
        </div>
        <button
          onClick={handleVolumeUp}
          className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold active:scale-95 transition-all"
        >
          +
        </button>
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 ${
            isMuted ? "bg-gray-400 text-white" : "bg-green-500 text-white"
          }`}
        >
          <span className="text-base md:text-xl">{isMuted ? "🔇" : "🔊"}</span>
        </button>
      </div>

      <GlobalHomeButton isMuted={isMuted} />
      <GlobalBackButton isMuted={isMuted} />

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Routes>
          <Route path="/" element={<HomeMenu isMuted={isMuted} />} />

          {/* ... Routes ภาษาอังกฤษ ... */}
          <Route path="/alphabet" element={<AlphabetMenuPage isMuted={isMuted} />} />
          <Route path="/alphabet/select" element={<ABCSelectionPage isMuted={isMuted} />} />
          <Route path="/alphabet/learn" element={<AlphabetLearningPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/alphabet/game" element={<AlphabetGamePage isMuted={isMuted} />} />
          <Route path="/alphabet/game-sound" element={<DifferentSoundGamePage isMuted={isMuted} />} />
          <Route path="/feeling" element={<FeelingMenuPage isMuted={isMuted} />} />
          <Route path="/feeling/movement" element={<MovementMatchingPage isMuted={isMuted} />} />
          <Route path="/feeling/emotions" element={<EmotionsGamePage isMuted={isMuted} />} />
          <Route path="/activity" element={<DailyActivityPage isMuted={isMuted} />} />
          <Route path="/family" element={<FamilyMenuPage isMuted={isMuted} />} />
          <Route path="/family/learn" element={<FamilyLearningPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/family/game" element={<FamilyGamePage isMuted={isMuted} />} />
          <Route path="/days" element={<DaysMenuPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/days/learn" element={<DaysLearningPage isMuted={isMuted} />} />
          <Route path="/days/game" element={<DaysGamePage isMuted={isMuted} />} />

          {/* ... Routes ภาษาไทย ... */}
          <Route path="/thai-alphabet" element={<ThaiAlphabetPage isMuted={isMuted} />} />
          <Route path="/thai/writing" element={<ThaiWritingMenuPage isMuted={isMuted} />} />
          <Route path="/thai/reading" element={<ThaiReadingMenuPage isMuted={isMuted} />} />
          <Route path="/thai-alphabet/learn" element={<ThaiWritingMenuPage isMuted={isMuted} />} />
          <Route path="/thai-alphabet/read-vowel" element={<ThaiReadVowelsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/thai-alphabet/read-tone" element={<ThaiReadTonePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/thai-alphabet/read-consonant" element={<ThaiLearningPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/thai-alphabet/write-consonant" element={<ThaiWriteConsonantPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/thai-alphabet/write-vowel" element={<ThaiWriteVowelsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/thai-alphabet/write-tone" element={<ThaiWriteTonePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />

          {/* ... Routes คณิต ... */}
          <Route path="/math" element={<MathMenuPage isMuted={isMuted} />} />
          <Route path="/math/counting" element={<MathCountingPage isMuted={isMuted} />} />
          <Route path="/math/read-eng" element={<MathReadEngPage isMuted={isMuted} />} />
          <Route path="/math/read-arabic" element={<MathReadArabicPage isMuted={isMuted} />} />
          <Route path="/math/read-thai" element={<MathReadThaiPage isMuted={isMuted} />} />
          <Route path="/math/writing" element={<MathWritingPage isMuted={isMuted} />} />
          <Route path="/math/money" element={<MathMoneyPage isMuted={isMuted} />} />
          <Route path="/math/game" element={<MathGamePage isMuted={isMuted} />} />

          {/* ... Routes วิทย์ ... */}
          <Route path="/science" element={<ScienceMenuPage isMuted={isMuted} />} />
          <Route path="/science/intro" element={<ScienceIntroPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/science/animals" element={<ScienceAnimalsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/science/environment" element={<ScienceEnvironmentPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/science/sorting" element={<ScienceSortingPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/science/review-env" element={<ScienceReviewEnvPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/science/review-body" element={<ScienceReviewBodyPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/science/organs-game" element={<ScienceGamePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />

          {/* ================= โซนสังคมศึกษา ================= */}
          <Route path="/social" element={<SocialMenuPage isMuted={isMuted} />} />
          <Route path="/social/game" element={<SocialGamePage isMuted={isMuted} />} />
          <Route path="/social/self-care" element={<SocialSelfCarePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/dressing" element={<SocialDressingPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/routines" element={<SocialRoutinesPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/family" element={<SocialFamilyPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/flag" element={<SocialFlagPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/culture" element={<SocialCulturePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/important-days" element={<SocialImportantDaysPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/social/religion" element={<SocialReligionPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />

          {/* ... Routes ศิลปะ ... */}
          <Route path="/art" element={<ArtMenuPage isMuted={isMuted} />} />
          <Route path="/art/visual-elements" element={<ArtVisualElementsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/coloring" element={<ArtColoringPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/texture" element={<ArtTexturePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/beautiful-world" element={<ArtBeautifulWorldPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/color-tone" element={<ArtColorTonePage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/line-art" element={<ArtLineArtPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 
          <Route path="/art/tools" element={<ArtToolsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} /> 

          {/* ... Routes อาเซียน ... */}
          <Route path="/asean" element={<AseanMenuPage isMuted={isMuted} />} />
          <Route path="/asean/flags" element={<AseanNationalFlagsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/greetings" element={<AseanGreetingsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/national-dishes" element={<AseanNationalDishesPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/national-animals" element={<AseanNationalAnimalsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/national-costumes" element={<AseanNationalCostumesPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/national-flowers" element={<AseanNationalFlowersPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying}/>} />
          <Route path="/asean/game-menu" element={<AseanGameMenuPage isMuted={isMuted} />} />
          <Route path="/asean/asean-trace" element={<AseanGameTraceAnimalPage isMuted={isMuted} />} />
          <Route path="/asean/asean-flags" element={<AseanGameFlagsPage isMuted={isMuted} />} />
          <Route path="/asean/asean-flowers" element={<AseanGameFlowersPage isMuted={isMuted} />} />
          <Route path="/asean/asean-dress" element={<AseanGameDressPage isMuted={isMuted} />} />
          <Route path="/asean/asean-greeting" element={<AseanGameGreetingPage isMuted={isMuted} />} />

          {/* ... Routes Phonics ... */}
          <Route path="/phonics" element={<PhonicsMenuPage isMuted={isMuted} />} />
          <Route path="/phonics/sounds" element={<PhonicsSoundPage isMuted={isMuted} />} />
          <Route path="/phonics/mapping" element={<PhonicsMappingPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/phonics/vowels" element={<PhonicsVowelsPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/phonics/spelling" element={<PhonicsSpellingPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/phonics/reading" element={<PhonicsReadingPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/phonics/game" element={<PhonicsGamePage isMuted={isMuted} />} />

          {/* ================= บัตรคำศัพท์ / อื่นๆ ================= */}
          <Route path="/flashcard" element={<FlashcardMenuPage isMuted={isMuted} />} />
          <Route path="/flashcard/play" element={<FlashcardPlayerPage isMuted={isMuted} />} />
          <Route path="/colors" element={<ColorsMenuPage isMuted={isMuted} />} />
          <Route path="/colors/learn" element={<ColorsLearningPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/colors/game" element={<ColorsGamePage isMuted={isMuted} />} />
          <Route path="/stories" element={<StoryMenuPage isMuted={isMuted} />} />
          <Route path="/stories/watch" element={<StoryPlayerPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
          <Route path="/lesson" element={<LessonPage isMuted={isMuted} onVideoStateChange={setIsVideoPlaying} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;