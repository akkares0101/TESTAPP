import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import bgImage from './assets/images/bg.png';     
import MenuCard from './components/MenuCard'; 
import LessonPage from './components/LessonPage'; 

// --- โซนภาษาอังกฤษ ---
import AlphabetMenuPage from './components/english/AlphabetMenuPage';
import AlphabetLearningPage from './components/english/AlphabetLearningPage';
import AlphabetGamePage from './components/english/AlphabetGamePage';
import ABCSelectionPage from './components/english/ABCSelectionPage'; // หน้าทางแยก (เรียน/เกม)
import DailyActivityPage from './components/english/DailyActivityPage'; // ⭐ เพิ่มหน้านี้เข้ามา

// --- โซนภาษาไทย ---
import ThaiAlphabetPage from './components/thai/ThaiAlphabetPage'; 
import ThaiLearningPage from './components/thai/ThaiLearningPage'; 
import ThaiGamePage from './components/thai/ThaiGamePage';        

// --- โซนอื่นๆ ---
import ColorsMenuPage from './components/ColorsMenuPage';
import ColorsLearningPage from './components/ColorsLearningPage';
import ColorsGamePage from './components/ColorsGamePage';
import StoryMenuPage from './components/StoryMenuPage';
import StoryPlayerPage from './components/StoryPlayerPage';

// Import รูปภาพ
import thai from './assets/images/thai.png';
import eng from './assets/images/eng.png';
import math from './assets/images/math.png';
import cont from './assets/images/cont.png';
import story from './assets/images/story.png';
import sci from './assets/images/sci.png';
import draw from './assets/images/draw.png';
import Phonics from './assets/images/Phonics.png';

const menus = [
  { id: 1, title: "ภาษาไทย", image: thai },
  { id: 2, title: "ภาษาอังกฤษ", image: eng },
  { id: 3, title: "คณิตศาสตร์", image: math },
  { id: 4, title: "สังคมศึกษา", image: cont },
  { id: 5, title: "นิทานอีสป", image: story },
  { id: 6, title: "วิทยาศาสตร์", image: sci },
  { id: 7, title: "ศิลปะ", image: draw },
  { id: 8, title: "Phonics", image: Phonics },
];

function HomeMenu({ isMuted }) { 
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    // 1. ภาษาอังกฤษ
    if (item.title === "ภาษาอังกฤษ") { 
      navigate('/alphabet'); 
    }
    // 2. ภาษาไทย
    else if (item.title === "ภาษาไทย") { 
      navigate('/thai-alphabet'); 
    }
    // 3. นิทาน
    else if (item.title === "นิทานอีสป") { 
      navigate('/stories'); 
    } 
    // 4. วิชาอื่นๆ (คณิต, วิทย์ ฯลฯ) -> แจ้งเตือน
    else { 
      alert(`วิชา ${item.title} กำลังอยู่ระหว่างการพัฒนาครับ 🚧`); 
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {menus.map((item) => (
            <MenuCard key={item.id} image={item.image} isMuted={isMuted} onClick={() => handleMenuClick(item)} />
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
      <button onClick={() => setIsMuted(!isMuted)} className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-xl border-4 border-white transition-all hover:scale-110 ${isMuted ? 'bg-gray-400' : 'bg-green-500'}`}>
        <span className="text-3xl">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      <Routes>
        <Route path="/" element={<HomeMenu isMuted={isMuted} />} />
        
        {/* --- โซนภาษาอังกฤษ --- */}
        <Route path="/alphabet" element={<AlphabetMenuPage isMuted={isMuted} />} />
        <Route path="/alphabet/select" element={<ABCSelectionPage isMuted={isMuted} />} />
        <Route path="/alphabet/learn" element={<AlphabetLearningPage isMuted={isMuted} />} />
        <Route path="/alphabet/game" element={<AlphabetGamePage isMuted={isMuted} />} />
        
        {/* ⭐ เพิ่ม Route หน้า Daily Activity (เชื่อมกับปุ่มที่ 7 ของหน้าเมนูอังกฤษ) */}
        <Route path="/activity" element={<DailyActivityPage isMuted={isMuted} />} />

        {/* --- โซนภาษาไทย --- */}
        <Route path="/thai-alphabet" element={<ThaiAlphabetPage isMuted={isMuted} />} />
        <Route path="/thai-alphabet/learn" element={<ThaiLearningPage isMuted={isMuted} />} />
        <Route path="/thai-alphabet/game" element={<ThaiGamePage isMuted={isMuted} />} />

        {/* --- โซนอื่นๆ --- */}
        <Route path="/colors" element={<ColorsMenuPage isMuted={isMuted} />} />
        <Route path="/colors/learn" element={<ColorsLearningPage isMuted={isMuted} />} />
        <Route path="/colors/game" element={<ColorsGamePage isMuted={isMuted} />} />
        <Route path="/stories" element={<StoryMenuPage isMuted={isMuted} />} />
        <Route path="/stories/watch" element={<StoryPlayerPage isMuted={isMuted} />} />
        
        <Route path="/lesson" element={<LessonPage isMuted={isMuted} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;