import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/Game Color.png";

// โหลดเสียง
const popSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/pop.mp3");
popSound.volume = 0.6;

function ColorsGamePage({ isMuted }) {
  const navigate = useNavigate();

  // 🎨 ข้อมูลสีทั้งหมด
  const colors = [
    { id: 'red', name: 'RED', bg: 'bg-red-500', text: 'text-white' },
    { id: 'orange', name: 'ORANGE', bg: 'bg-orange-500', text: 'text-white' },
    { id: 'yellow', name: 'YELLOW', bg: 'bg-yellow-400', text: 'text-yellow-900' },
    { id: 'green', name: 'GREEN', bg: 'bg-green-500', text: 'text-white' },    
    { id: 'sky', name: 'SKY', bg: 'bg-sky-400', text: 'text-white' },
    { id: 'blue', name: 'BLUE', bg: 'bg-blue-600', text: 'text-white' },
    { id: 'purple', name: 'PURPLE', bg: 'bg-purple-500', text: 'text-white' },
    { id: 'pink', name: 'PINK', bg: 'bg-pink-400', text: 'text-white' },
    { id: 'brown', name: 'BROWN', bg: 'bg-amber-900', text: 'text-white' },
    { id: 'gray', name: 'GRAY', bg: 'bg-gray-500', text: 'text-white' },
    { id: 'black', name: 'BLACK', bg: 'bg-gray-900', text: 'text-white' },
    { id: 'white', name: 'WHITE', bg: 'bg-white', text: 'text-black' },
  ];

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [animate, setAnimate] = useState(false);

  const handleColorClick = (color) => {
    if (!isMuted) {
      popSound.currentTime = 0;
      popSound.play().catch(() => {});
    }
    setActiveColor(color);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. Header - ปรับให้เล็กลงคลีนๆ */}
      <div className="w-full px-4 pt-3 flex justify-between items-center z-20 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/90 p-2 rounded-full shadow-sm border border-white hover:bg-rose-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-rose-500">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="bg-white/95 px-6 py-1.5 rounded-full shadow-sm border-2 border-purple-200">
           <h1 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
             🎮 เกมจิ้มสีหรรษา
           </h1>
        </div>
        <div className="w-10"></div>
      </div>

      {/* 2. Instruction Box - ปรับให้ Compact */}
      <div className="bg-white/80 backdrop-blur-md px-5 py-2 mt-3 rounded-2xl border border-white shadow-sm text-center max-w-sm w-full z-20 shrink-0">
          <p className="text-gray-700 font-bold text-xs md:text-sm">
             <span className="text-purple-600 font-black">วิธีเล่น:</span> แตะเลือกสีด้านล่าง แล้วฝึกอ่านออกเสียง!
          </p>
      </div>

      {/* 3. จอแสดงผล (Compact Card) */}
      <div className="flex-1 w-full max-w-xl px-4 flex flex-col items-center justify-center z-10 min-h-0 py-2">
        <div 
          onClick={() => {
             if(!isMuted) { popSound.currentTime=0; popSound.play().catch(()=>{}); }
             setAnimate(true);
             setTimeout(() => setAnimate(false), 300);
          }}
          className={`
            relative w-full aspect-video max-h-[35vh] md:max-h-[40vh]
            rounded-[2rem] border-[8px] md:border-[10px] border-white shadow-xl
            flex items-center justify-center
            transition-all duration-300 cursor-pointer
            ${activeColor.bg} 
            ${animate ? 'scale-95 brightness-110 rotate-1' : 'scale-100'}
          `}
        >
          <div className="absolute top-3 left-3 w-1/4 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm"></div>
          <h2 className={`text-5xl md:text-7xl font-black drop-shadow-md tracking-wider uppercase select-none ${activeColor.text}`}>
            {activeColor.name}
          </h2>
        </div>
      </div>

      {/* 4. แผงปุ่มกด (Mini Palette) */}
      <div className="w-full flex justify-center items-center px-4 pb-8 pt-1 z-20 shrink-0">
        <div className="w-full max-w-2xl mx-auto bg-white/30 backdrop-blur-lg rounded-[2rem] p-3 md:p-4 border border-white/50 shadow-md">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorClick(color)}
                className={`
                  aspect-square w-10 h-10 md:w-14 md:h-14
                  rounded-full ${color.bg} border-[3px] border-white
                  shadow-sm transition-all duration-200
                  ${activeColor.id === color.id 
                    ? 'scale-110 ring-2 ring-offset-2 ring-purple-400 -translate-y-1.5 z-10' 
                    : 'hover:scale-105 opacity-90 hover:opacity-100'
                  }
                `}
              ></button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ColorsGamePage;