import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่มทางแยก
import btnMedia from '../../assets/images/buttons/btn_learn.png'; 
import btnGame from '../../assets/images/buttons/btn_game.png';   

const clickSound = new Audio('/sounds/click.mp3');

function ABCSelectionPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

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

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-20 md:-mt-32">
        
        {/* หัวข้อ */}
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-12 py-4 rounded-full border-[6px] border-white animate-bounce-slow">
          ABC
        </h1>

        {/* 3. ปุ่มทางแยก: สื่อการสอน vs เกม */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
          
          {/* ปุ่มไปหน้าเรียน (Learn) */}
          <div
            onClick={() => { playClick(); navigate('/alphabet/learn'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ⭐ ปุ่มใหญ่สะใจ (แบบหน้าเรื่องสี) */
              w-[260px] h-[260px]        /* มือถือ */
              md:w-[400px] md:h-[400px]  /* จอคอม */

              transition-transform duration-300 hover:scale-110 hover:-rotate-3 active:scale-95
            "
          >
             <img 
              src={btnMedia} 
              alt="สื่อการสอน" 
              className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
            />
          </div>

          {/* ปุ่มไปหน้าเกม (Game) */}
          <div
            onClick={() => { playClick(); navigate('/alphabet/game'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ⭐ ปุ่มใหญ่สะใจ (แบบหน้าเรื่องสี) */
              w-[260px] h-[260px]        /* มือถือ */
              md:w-[400px] md:h-[400px]  /* จอคอม */

              transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95
            "
          >
             <img 
              src={btnGame} 
              alt="เกม" 
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

export default ABCSelectionPage;