import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม
import btnLearn from '../../assets/images/buttons/btn_learn.png'; 
import btnGame from '../../assets/images/buttons/btn_game.png';   

const clickSound = new Audio('/sounds/click.mp3');

function FamilyMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { 
      id: 1, 
      image: btnLearn, 
      path: "/family/learn", 
      title: "Family Vocabulary" 
    },
    { 
      id: 2, 
      image: btnGame, 
      path: "/family/game", 
      title: "Family Game" 
    },
  ];

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. ปุ่มย้อนกลับ (ตำแหน่งมาตรฐาน) */}
      <div className="absolute top-8 left-4 z-50 md:top-40 md:left-70">
         <button 
          onClick={() => navigate('/alphabet')} 
          className="
             group flex items-center gap-3 bg-white text-orange-500 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-orange-100 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">ย้อนกลับ</span>
        </button>
      </div>

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-20 md:-mt-32">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-orange-400/80 px-12 py-4 rounded-full border-[6px] border-white shadow-lg animate-bounce-slow">
            <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md tracking-wide">
              👨‍👩‍👧‍👦 Family (ครอบครัว)
            </h1>
        </div>

        {/* 3. ปุ่มเมนู 2 ปุ่มใหญ่ (Grid) */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
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
                  
                  /* ⭐ ปุ่มใหญ่สะใจ (แบบหน้าเรื่องสี/ABC) */
                  w-[260px] h-[260px]        /* มือถือ */
                  md:w-[400px] md:h-[400px]  /* จอคอม */

                  transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                  hover:scale-110 hover:-rotate-2
                  active:scale-95 active:rotate-0
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

export default FamilyMenuPage;