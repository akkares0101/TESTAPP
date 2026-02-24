import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม (3 ปุ่ม)
import btnConsonant from '../../assets/images/thai/btn_read_consonant.png'; 
import btnTone from '../../assets/images/thai/btn_read_tone.png';           
import btnVowel from '../../assets/images/thai/46.png';         

const clickSound = new Audio('/sounds/click.mp3');

function ThaiReadingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnConsonant, path: "/thai-alphabet/read-consonant", title: "พยัญชนะไทย" },
    { id: 2, image: btnTone, path: "/thai-alphabet/read-tone", title: "วรรณยุกต์" },
    { id: 3, image: btnVowel, path: "/thai-alphabet/read-vowel", title: "สระ" },
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
      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ (อย่าลืมไปใส่ .animate-bounce-slow ใน index.css นะครับ) */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
              📖 ฝึกอ่าน
            </h1>
        </div>

        {/* Grid เมนู 3 ปุ่ม */}
        <div className="flex flex-wrap justify-center content-center gap-6 md:gap-12 w-full max-w-[95rem]">
            {menuItems.map((item) => (
              <button 
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
                  bg-transparent border-none outline-none focus:outline-none
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ThaiReadingMenuPage;