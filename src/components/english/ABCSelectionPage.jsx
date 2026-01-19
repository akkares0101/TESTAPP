import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่มทางแยก (เตรียมรูปให้พร้อมนะครับ)
// แนะนำให้ใช้รูปเดิมที่มี หรือทำรูปใหม่ที่เขียนว่า "สื่อการสอน" กับ "เกม"
import btnMedia from '../../assets/images/buttons/btn_media.png'; // ตั้งชื่อไฟล์ตามจริง
import btnGame from '../../assets/images/buttons/btn_game.png';   // ตั้งชื่อไฟล์ตามจริง

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
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. ปุ่มย้อนกลับ (กลับไปหน้าเมนูภาษาอังกฤษ) */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/alphabet')} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-lg">ย้อนกลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-10 px-4 -mt-10">
        
        {/* 2. หัวข้อเรื่อง */}
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-12 py-4 rounded-full border-4 border-white">
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
              w-[220px] h-[220px] md:w-[300px] md:h-[300px]
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
              w-[220px] h-[220px] md:w-[300px] md:h-[300px]
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
    </div>
  );
}

export default ABCSelectionPage;