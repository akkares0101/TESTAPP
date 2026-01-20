import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';

// ⭐ Import รูปปุ่ม (อย่าลืมเอารูปไปวางและแก้ชื่อไฟล์ให้ตรงนะครับ)
import btnMedia from '../assets/images/buttons/btn_learn.png'; // รูปปุ่มสื่อการสอนเรื่องสี
import btnGame from '../assets/images/buttons/btn_game.png';   // รูปปุ่มเกมทายสี

// โหลดเสียง click
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
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* Header & Back Button */}
      <div className="w-full max-w-4xl px-4 mt-4 mb-8 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/alphabet', { state: { subjectTitle: "ภาษาอังกฤษ" } })} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-lg">กลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-8 px-4 -mt-20">
        
        {/* หัวข้อ (เก็บไว้เพื่อให้รู้ว่าอยู่หน้าไหน) */}
        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-8 py-2 rounded-full border-4 border-white">
          🎨 โลกของสีสัน
        </h1>

        {/* Grid ปุ่มเมนู (สไตล์รูปภาพล้วน) */}
        <div className="flex flex-wrap justify-center gap-8 w-full">
          
          {/* ปุ่ม 1: สื่อการสอน (ใช้รูปภาพ) */}
          <div
            onClick={() => { playClick(); navigate('/colors/learn'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ขนาดปุ่ม */
              w-[200px] h-[200px] md:w-[250px] md:h-[250px]
              
              /* Animation */
              transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
              hover:scale-110 hover:-rotate-2
              active:scale-95 active:rotate-0
            "
          >
             <img 
              src={btnMedia} 
              alt="สื่อการสอน" 
              className="
                w-full h-full object-contain
                drop-shadow-lg group-hover:drop-shadow-2xl
                transition-all duration-300
              "
            />
          </div>

          {/* ปุ่ม 2: เกม (ใช้รูปภาพ) */}
          <div
            onClick={() => { playClick(); navigate('/colors/game'); }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ขนาดปุ่ม */
              w-[200px] h-[200px] md:w-[250px] md:h-[250px]
              
              /* Animation */
              transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
              hover:scale-110 hover:rotate-2
              active:scale-95 active:rotate-0
            "
          >
             <img 
              src={btnGame} 
              alt="เกมทายสี" 
              className="
                w-full h-full object-contain
                drop-shadow-lg group-hover:drop-shadow-2xl
                transition-all duration-300
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ColorsMenuPage;