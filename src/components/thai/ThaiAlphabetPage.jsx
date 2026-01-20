import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม
import btnWrite from '../../assets/images/thai/write.png';
import btnRead from '../../assets/images/thai/read.png';
import btnGame from '../../assets/images/thai/game.png';

const clickSound = new Audio('/sounds/click.mp3');

function ThaiAlphabetPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnWrite, path: "/thai/writing", title: "การเขียน" },
    { id: 2, image: btnRead, path: "/thai/reading", title: "การอ่าน" },
    { id: 3, image: btnGame, path: "/thai/game", title: "เกมภาษาไทย" }, 
  ];

  return (
    <div 
      // 1. ใช้ h-screen และ relative เพื่อเป็นกรอบอ้างอิง
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed' 
      }}
    >
      {/* 2. ⭐ แก้ไขตรงนี้: ใช้ absolute เพื่อลอยปุ่มไว้มุมจอ
         ทำให้ขยับปุ่มได้อิสระ โดยไม่ดันเนื้อหาตรงกลาง 
      */}
      <div className="absolute top-8 left-4 z-50 md:top-50 md:left-100">
         <button 
          onClick={() => navigate('/')} 
          className="
             group flex items-center gap-3 bg-white text-orange-500 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-orange-100 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">กลับหน้าหลัก</span>
        </button>
      </div>

      {/* 3. เนื้อหาหลัก (จัดกึ่งกลาง justify-center) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
              ภาษาไทย
            </h1>
        </div>

        {/* Grid เมนู 3 ปุ่ม */}
        <div className="flex flex-wrap justify-center content-center gap-6 md:gap-12 w-full max-w-[95rem]">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  playClick();
                  if (item.path) navigate(item.path);
                }}
                className="
                  group relative cursor-pointer
                  flex items-center justify-center
                  /* ขนาดปุ่ม (ปรับให้ใหญ่เท่าหน้าอื่นๆ) */
                  w-auto 
                  h-[180px]      
                  md:h-[300px]   
                  
                  transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
                />
              </div>
            ))}
        </div>
      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default ThaiAlphabetPage;