import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const imgWakeUp = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/daily/wakeup.png";
const imgSchool = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/daily/school.png";
const imgafter = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/daily/after.png";
const imggametime = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/daily/gametime.png";
const imgnight = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/daily/night.png";
const vidWakeUp = "https://storage.googleapis.com/mtr-system/media-app/public/videos/daily/wakeup.mp4";
const vidSchool = "https://storage.googleapis.com/mtr-system/media-app/public/videos/daily/school.mp4";
const vidafter = "https://storage.googleapis.com/mtr-system/media-app/public/videos/daily/after.mp4";
const vidgametime = "https://storage.googleapis.com/mtr-system/media-app/public/videos/daily/gametime.mp4";
const vidnight = "https://storage.googleapis.com/mtr-system/media-app/public/videos/daily/night.mp4";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

// ⭐ รับ onVideoStateChange เข้ามาจัดการเพลง Background
function DailyActivityPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  // ⭐ จัดการสถานะเพลงพื้นหลังตามการเลือกวิดีโอ
  useEffect(() => {
    if (onVideoStateChange) {
      // ถ้ามีการเลือกกิจกรรม (ดูวิดีโอ) ให้หยุดเพลง Background
      onVideoStateChange(activeItem !== null);
    }
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [activeItem, onVideoStateChange]);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const activities = [
    { id: 1, image: imgWakeUp, title: "Wake Up", video: vidWakeUp },
    { id: 2, image: imgSchool, title: "Go to School", video: vidSchool },
    { id: 3, image: imgafter, title: "After school", video: vidafter },
    { id: 5, image: imgnight, title: "Night", video: vidnight },
  ];

  const handleBack = () => {
    playClick();
    if (activeItem) {
      setActiveItem(null); 
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center transition-all"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Header & Back Button */}
      <div className="w-full px-4 pt-4 flex justify-between items-center z-20 shrink-0 mb-2">
        <button 
          onClick={handleBack}
          className="bg-white/90 p-2 md:p-3 rounded-full shadow-md border-2 border-white hover:bg-orange-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-orange-500">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="bg-white/95 px-8 py-2 rounded-full shadow-md border-[3px] border-orange-300 transition-all">
          <h1 className="text-xl md:text-3xl font-black text-orange-600 tracking-wide">
            {activeItem ? `📺 ${activeItem.title}` : "📅 Daily Activity"}
          </h1>
        </div>
        <div className="w-10 md:w-14"></div>
      </div>

      {/* 🟢 สถานะที่ 1: หน้าเมนูรวม */}
      {!activeItem && (
        <div className="flex-1 w-full flex flex-col items-center justify-center z-10 px-4 min-h-0 py-4 animate-fade-in">
          <div className="bg-white/60 backdrop-blur-md px-6 py-2 mb-6 rounded-2xl border border-white shadow-sm shrink-0">
            <p className="text-gray-700 font-bold text-sm md:text-base text-center">เลือกช่วงเวลาที่ต้องการเรียนรู้ได้เลยครับ! 👇</p>
          </div>

          <div className="w-full max-w-5xl flex flex-col items-center gap-4 md:gap-8 overflow-y-auto pb-6 scrollbar-hide">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {activities.map((item) => (
                <div key={item.id} onClick={() => { playClick(); setActiveItem(item); }} className="group relative cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 w-32 md:w-56 lg:w-64">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-0.5 rounded-full border border-orange-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                     <span className="text-xs md:text-sm font-black text-orange-600">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔴 สถานะที่ 2: หน้าเล่นวิดีโอ */}
      {activeItem && (
        <div className="flex-1 w-full flex flex-col items-center justify-between z-10 px-4 min-h-0 animate-fade-in">
          
          <div className="w-full max-w-5xl h-[55vh] md:h-[65vh] mt-2 flex justify-center items-center shrink-0">
            <div className="relative w-full h-full bg-black rounded-[2rem] border-[6px] md:border-[10px] border-orange-400 shadow-2xl overflow-hidden">
              <video 
                key={activeItem.video}
                src={activeItem.video} 
                controls 
                autoPlay 
                muted={isMuted}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* แถบเมนูทางลัดด้านล่าง (Compact & Scrollable) */}
          <div className="w-full flex flex-col items-center pb-6 pt-4 shrink-0">
            <div className="flex items-center gap-2 mb-2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm animate-bounce">
              <span className="text-orange-600 font-bold text-xs">👈 เลือกดูช่วงเวลาอื่น 👉</span>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 px-4 py-2 md:px-6 md:py-3 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border-2 border-white/50 shadow-xl overflow-x-auto max-w-full scrollbar-hide">
              {activities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { playClick(); setActiveItem(item); }}
                  className={`
                    relative transition-all duration-300 hover:scale-110 active:scale-95 shrink-0
                    w-12 h-12 md:w-20 md:h-20
                    ${activeItem.id === item.id ? 'scale-110 brightness-110 drop-shadow-lg -translate-y-1' : 'opacity-70 hover:opacity-100'}
                  `}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  {activeItem.id === item.id && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyActivityPage;