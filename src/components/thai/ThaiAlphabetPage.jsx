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
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed' 
      }}
    >
      
      {/* เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-12 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
              ภาษาไทย
            </h1>
        </div>

        {/* Grid เมนู 3 ปุ่ม */}
        <div className="flex flex-wrap justify-center content-center gap-6 md:gap-16 w-full max-w-[95rem]">
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
                  /* ⭐⭐⭐ ขยายใหญ่ขึ้นเพราะมีแค่ 3 ปุ่ม ⭐⭐⭐ */
                  w-auto 
                  h-[180px]      /* มือถือ: ใหญ่ขึ้น (จาก 130 เป็น 180) */
                  md:h-[320px]   /* จอคอม: ใหญ่ขึ้น (จาก 220 เป็น 320) */
                  
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