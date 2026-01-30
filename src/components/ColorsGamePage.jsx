import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/Game Color.png';

// โหลดเสียง (ใช้เสียง Pop น่ารักๆ)
const popSound = new Audio('/sounds/pop.mp3');
popSound.volume = 0.6;

function ColorsGamePage({ isMuted }) {
  const navigate = useNavigate();

  // 🎨 ข้อมูลสีทั้งหมด
  const colors = [
    // --- โทนร้อน ---
    { id: 'red', name: 'RED', bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' },
    { id: 'orange', name: 'ORANGE', bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600' },
    { id: 'yellow', name: 'YELLOW', bg: 'bg-yellow-400', text: 'text-yellow-900', border: 'border-yellow-500' },
    
    // --- โทนเย็น/เขียว ---
    { id: 'green', name: 'GREEN', bg: 'bg-green-500', text: 'text-white', border: 'border-green-600' },    
    // --- โทนฟ้า/ม่วง ---
    { id: 'sky', name: 'SKY', bg: 'bg-sky-400', text: 'text-white', border: 'border-sky-500' },
    { id: 'blue', name: 'BLUE', bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-700' },
    { id: 'purple', name: 'PURPLE', bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-600' },
    { id: 'pink', name: 'PINK', bg: 'bg-pink-400', text: 'text-white', border: 'border-pink-500' },

    // --- สีพื้นฐาน ---
    { id: 'brown', name: 'BROWN', bg: 'bg-amber-900', text: 'text-white', border: 'border-amber-950' },
    { id: 'gray', name: 'GRAY', bg: 'bg-gray-500', text: 'text-white', border: 'border-gray-600' },
    { id: 'black', name: 'BLACK', bg: 'bg-gray-900', text: 'text-white', border: 'border-black' },
    { id: 'white', name: 'WHITE', bg: 'bg-white', text: 'text-black', border: 'border-gray-300' },
  ];

  // State สีที่เลือกอยู่ปัจจุบัน (เริ่มที่สีแรก)
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
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* Header */}
      <div className="w-full max-w-4xl px-4 mt-2 mb-4 flex justify-between items-center z-10">

        <div className="bg-white/90 px-8 py-2 rounded-full shadow-lg border-[3px] border-white backdrop-blur-sm">
           <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 tracking-wider">
             🎮 เกมจิ้มสีหรรษา
           </h1>
        </div>
        
        {/* Spacer ให้ Title อยู่ตรงกลาง */}
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* จอแสดงผลใหญ่ */}
      <div className="flex-1 w-full max-w-2xl px-4 flex flex-col items-center justify-center z-10 mb-4">
        
        <div 
          className={`
            relative
            w-full aspect-square md:aspect-video max-h-[50vh]
            rounded-[3rem]
            border-[12px] border-white
            shadow-2xl
            flex items-center justify-center
            transition-all duration-300
            cursor-pointer
            ${activeColor.bg} 
            ${animate ? 'scale-105 rotate-2' : 'scale-100 rotate-0'}
            ${activeColor.id === 'white' ? 'shadow-inner' : ''}
          `}
          onClick={() => {
             if(!isMuted) { popSound.currentTime=0; popSound.play().catch(()=>{}); }
             setAnimate(true);
             setTimeout(() => setAnimate(false), 300);
          }}
        >
          {/* แสงเงา */}
          <div className="absolute top-4 left-4 w-1/3 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-[2rem] blur-sm"></div>

          {/* ชื่อสี */}
          <h2 className={`text-5xl md:text-7xl font-black drop-shadow-md tracking-wider uppercase ${activeColor.text}`}>
            {activeColor.name}
          </h2>
        </div>
      </div>

      {/* แผงปุ่มกด */}
      <div className="
        w-full max-w-5xl px-4 
        bg-white/60 backdrop-blur-xl 
        rounded-t-[3rem] border-t-4 border-white/50
        shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
        py-6 z-10
      ">
        <p className="text-center text-gray-500 font-bold mb-4 bg-white/50 inline-block px-4 py-1 rounded-full mx-auto block">
          เลือกสีที่ชอบเลย! 👇
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorClick(color)}
              className={`
                group relative
                w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
                rounded-full
                ${color.bg}
                border-4 border-white
                shadow-md hover:shadow-xl
                transition-all duration-200
                ${activeColor.id === color.id 
                  ? 'scale-110 ring-4 ring-offset-2 ring-orange-300 -translate-y-2 z-10' 
                  : 'hover:scale-110 hover:-translate-y-1 opacity-90 hover:opacity-100'
                }
              `}
            >
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ColorsGamePage;