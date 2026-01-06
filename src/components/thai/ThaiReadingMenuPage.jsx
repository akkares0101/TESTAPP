import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม 4 ปุ่ม (อย่าลืมเตรียมรูปและแก้ชื่อไฟล์นะครับ)
// แนะนำให้ตั้งชื่อไฟล์ตามนี้ครับ
import btnConsonant from '../../assets/images/thai/btn_read_consonant.png'; // พยัญชนะไทย
import btnTone from '../../assets/images/thai/btn_read_tone.png';           // วรรณยุกต์
import btnVowel from '../../assets/images/thai/btn_read_vowel.png';         // สระ
import btnGame from '../../assets/images/thai/btn_read_game.png';           // เกมอ่านออกเสียง

const clickSound = new Audio('/sounds/click.mp3');

function ThaiReadingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // รายการเมนู 4 ปุ่ม
  const menuItems = [
    { id: 1, image: btnConsonant, path: "/thai-alphabet/read-consonant", title: "พยัญชนะไทย" },
    { id: 2, image: btnTone, path: "/thai-alphabet/read-tone", title: "วรรณยุกต์ในภาษาไทย" },
    { id: 3, image: btnVowel, path: "/thai-alphabet/read-vowel", title: "สระในภาษาไทย" },
    { id: 4, image: btnGame, path: "/thai-alphabet/read-game", title: "เกมอ่านออกเสียง" },
  ];

  const renderButton = (item) => (
    <div
      key={item.id}
      onClick={() => { playClick(); if (item.path) navigate(item.path); }}
      className="
        group relative cursor-pointer
        flex items-center justify-center
        
        /* ขนาดปุ่มใหญ่ */
        w-[160px] h-[160px] 
        md:w-[240px] md:h-[240px]
        
        /* Animation */
        transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        hover:scale-110 hover:-rotate-2
        active:scale-95 active:rotate-0
      "
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="
          w-full h-full object-contain
          drop-shadow-lg group-hover:drop-shadow-2xl
          transition-all duration-300
        "
      />
    </div>
  );

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
      {/* 1. ปุ่มย้อนกลับ (กลับไปหน้าเมนูภาษาไทยหลัก) */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/thai-alphabet')} 
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

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-10">
        
        {/* 2. หัวข้อ */}
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-12 py-4 rounded-full border-4 border-white">
           📖 ฝึกอ่าน
        </h1>

        {/* 3. Grid ปุ่มเมนู (4 ปุ่ม) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
            {menuItems.map(renderButton)}
        </div>

      </div>
    </div>
  );
}

export default ThaiReadingMenuPage;