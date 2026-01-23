import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม (4 ปุ่ม)
import btnConsonant from '../../assets/images/thai/btn_consonant.png'; 
import btnTone from '../../assets/images/thai/btn_tone.png';           
import btnVowel from '../../assets/images/thai/btn_vowel.png';         
import btnHandwriting from '../../assets/images/thai/btn_handwriting.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function ThaiWritingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnConsonant, path: "/thai-alphabet/write-consonant", title: "พยัญชนะไทย" },
    { id: 2, image: btnTone, path: "/thai-alphabet/write-tone", title: "วรรณยุกต์" },
    { id: 3, image: btnVowel, path: "/thai-alphabet/write-vowel", title: "สระ" },
    { id: 4, image: btnHandwriting, path: "/thai-alphabet/handwriting", title: "คัดลายมือ" },
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
          onClick={() => navigate('/thai-alphabet')} 
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
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
               ✍️ ฝึกเขียน
            </h1>
        </div>

        {/* Grid เมนู 4 ปุ่ม */}
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
                  /* ⭐ ขนาดปุ่มใหญ่มาตรฐาน */
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

export default ThaiWritingMenuPage;