import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

const popSound = new Audio("/sounds/pop.mp3");
popSound.volume = 0.6;

function AlphabetGamePage({ isMuted }) {
  const navigate = useNavigate();
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const bgColors = [
    "bg-rose-500", "bg-sky-500", "bg-emerald-500", "bg-yellow-400",
    "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-indigo-500",
  ];

  const [currentLetter, setCurrentLetter] = useState("A");
  const [currentColor, setCurrentColor] = useState("bg-rose-500");
  const [animate, setAnimate] = useState(false);

  // ⭐ ฟังก์ชันสำหรับ AI อ่านออกเสียง (แก้บัคเสียงหายแล้ว)
  const speakLetter = (letter) => {
    // ถ้าสถานะแอปโดน Mute อยู่ ให้ข้ามไปเลย
    if (isMuted) return;

    // 1. สั่งล้างคิวเสียงเก่าทิ้ง
    window.speechSynthesis.cancel();
    
    // 2. ดีเลย์นิดนึง (50ms) ป้องกันบัคเบราว์เซอร์กลืนเสียงใหม่
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 1; // บังคับให้เสียงดังสุดของระบบ AI
      
      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  const handleRandomize = () => {
    if (!isMuted) {
      popSound.currentTime = 0;
      popSound.play().catch(() => {});
    }

    setAnimate(true);

    let newLetter;
    do {
      newLetter = letters[Math.floor(Math.random() * letters.length)];
    } while (newLetter === currentLetter);

    const newColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    setCurrentLetter(newLetter);
    setCurrentColor(newColor);
    
    // สั่งให้ AI อ่าน
    speakLetter(newLetter);

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

      {/* 1. Header */}
      <div className="w-full px-4 pt-4 flex justify-between items-center z-20 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/90 p-2 md:p-3 rounded-full shadow-md border-2 border-white hover:bg-rose-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-rose-500">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="bg-white/95 px-8 py-2 rounded-full shadow-md border-[3px] border-indigo-300">
          <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 tracking-wide">
            🎮 เกมสุ่มอักษร A-Z
          </h1>
        </div>
        <div className="w-10 md:w-14"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 z-10 min-h-0">
        
        {/* ⭐ 2. กล่องวิธีเล่นเกม ⭐ */}
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-3xl border-2 border-white shadow-lg text-center mb-6 max-w-lg w-full animate-fade-in">
          <h2 className="text-lg md:text-xl font-black text-indigo-600 mb-1">
            วิธีเล่นเกม 🎯
          </h2>
          <p className="text-gray-700 font-bold text-sm md:text-base leading-relaxed">
            ให้เด็กๆ <span className="text-rose-500 bg-rose-100 px-2 py-0.5 rounded-md">แตะที่การ์ด</span> เพื่อสุ่มตัวอักษร 
            และ <span className="text-indigo-600">กดปุ่มลำโพง</span> เพื่อฟังเสียงอีกรอบครับ!
          </p>
        </div>

        {/* 3. Game Card Area */}
        <div className="relative">
          <button
            onClick={handleRandomize}
            className={`
              relative w-64 h-72 md:w-80 md:h-96 rounded-[3rem] border-[10px] md:border-[12px] border-white
              shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center
              ${currentColor} transition-all duration-300 hover:scale-105 active:scale-95
              ${animate ? "rotate-6 scale-90 brightness-110" : "rotate-0 scale-100"}
            `}
          >
            <span className="absolute text-[12rem] md:text-[15rem] text-white/20 font-black select-none pointer-events-none">?</span>
            <span className="text-[8rem] md:text-[12rem] font-black text-white drop-shadow-lg z-10 select-none">{currentLetter}</span>
            <span className="mt-2 bg-white/30 px-6 py-1 rounded-full text-white font-black text-sm md:text-base backdrop-blur-sm border-2 border-white/50 z-10 animate-pulse">👆 แตะสุ่มเลย!</span>
          </button>

          {/* 4. ปุ่มเล่นเสียงอีกครั้ง */}
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              speakLetter(currentLetter);
            }}
            className="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-4 md:p-5 rounded-full shadow-xl border-4 border-white hover:bg-indigo-500 hover:scale-110 active:scale-90 transition-all z-30 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5A2.25 2.25 0 0 0 2.25 9.75v4.5a2.25 2.25 0 0 0 2.25 2.25h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.75 9a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V9ZM16.5 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM21 7.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

export default AlphabetGamePage;