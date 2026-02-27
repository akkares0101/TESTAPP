import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';

// Import รูปปุ่ม
import btnMedia from '../assets/images/buttons/btn_learn.png'; 
import btnGame from '../assets/images/buttons/btn_game.png';   

const clickSound = new Audio('/sounds/click.mp3');

function ColorsMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  return (
    <div 
      className="h-full min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >

      {/* 2. เนื้อหาหลัก (เอา -mt ออกเพื่อให้จัดกึ่งกลางพอดี) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[90rem] gap-6 md:gap-12 px-4 py-10">
        
        {/* หัวข้อ (ปรับขนาดให้ไล่ระดับตามจอ) */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-md mb-2 bg-orange-400/90 px-8 py-3 md:px-16 md:py-4 rounded-full border-[4px] md:border-[6px] border-white animate-bounce-slow">
          🎨 โลกของสีสัน
        </h1>

        {/* Grid ปุ่มเมนู (2 ปุ่มใหญ่) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-20 w-full">
          
          {/* ปุ่ม 1: สื่อการสอน */}
          <div
            onClick={() => { playClick(); navigate('/colors/learn'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ⭐ ปรับขนาดให้ไล่สเต็ปอย่างสมดุล ไม่ใหญ่ทะลุจอทีวี */
              w-48 h-48                 /* มือถือ */
              sm:w-56 sm:h-56           /* มือถือแนวนอน */
              md:w-64 md:h-64           /* แท็บเล็ต */
              lg:w-72 lg:h-72           /* โน๊ตบุ๊ค */
              xl:w-[320px] xl:h-[320px] /* ทีวี (หยุดใหญ่แค่นี้) */
              
              transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95
            "
          >
             <img 
              src={btnMedia} 
              alt="สื่อการสอน" 
              className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
            />
          </div>

          {/* ปุ่ม 2: เกม */}
          <div
            onClick={() => { playClick(); navigate('/colors/game'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ⭐ ขนาดเหมือนปุ่มด้านซ้ายเป๊ะ */
              w-48 h-48 
              sm:w-56 sm:h-56 
              md:w-64 md:h-64 
              lg:w-72 lg:h-72 
              xl:w-[320px] xl:h-[320px] 
              
              transition-transform duration-300 hover:scale-110 hover:rotate-2 active:scale-95
            "
          >
             <img 
              src={btnGame} 
              alt="เกมทายสี" 
              className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
            />
          </div>

        </div>
      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default ColorsMenuPage;