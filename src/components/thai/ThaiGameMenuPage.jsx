import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่มเกม
import btnGameGuess from '../../assets/images/thai/btn_game_guess.png'; 
// ⭐ เพิ่มรูปปุ่มเกมจับคู่ (ถ้ายังไม่มีใช้รูปเดิมแก้ขัดไปก่อนได้ครับ)
import btnGameMatch from '../../assets/images/thai/btn_game_match.png';   

const clickSound = new Audio('/sounds/click.mp3');

function ThaiGameMenuPage({ isMuted }) {
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
      image: btnGameGuess, 
      path: "/thai/game/guess", 
      title: "เกมทายภาพ" 
    },
    // ⭐ เพิ่มปุ่มที่ 2 กลับมา
    { 
      id: 2, 
      image: btnGameMatch, 
      path: "/thai/game/match", 
      title: "เกมจับคู่" 
    },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%", 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-10">
        
        <div className="relative z-10 bg-white px-10 py-4 rounded-full border-[6px] border-orange-400 shadow-[0_6px_0_#fb923c] mb-6 animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl font-black text-orange-500 tracking-wide flex items-center gap-3">
              🎮 เกมภาษาไทย
            </h1>
        </div>

        {/* Grid ปุ่มเมนู (มี 2 ปุ่มแล้ว) */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate(item.path);
                }}
                className="
                  group relative cursor-pointer
                  w-[200px] h-[200px] md:w-[300px] md:h-[300px]
                  transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                />
                
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border-4 border-orange-200 shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl font-bold text-orange-500">{item.title}</span>
                </div>
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

export default ThaiGameMenuPage;