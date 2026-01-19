import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

const popSound = new Audio("/sounds/pop.mp3");
popSound.volume = 0.6;

function AlphabetGamePage({ isMuted }) {
  const navigate = useNavigate();
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // A-Z

  // สี Background สุ่ม
  const bgColors = [
    "bg-rose-500",
    "bg-sky-500",
    "bg-green-500",
    "bg-yellow-400",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  const [currentLetter, setCurrentLetter] = useState("A");
  const [currentColor, setCurrentColor] = useState("bg-rose-500");
  const [animate, setAnimate] = useState(false);

  const handleRandomize = () => {
    if (!isMuted) {
      popSound.currentTime = 0;
      popSound.play().catch(() => {});
    }

    setAnimate(true);

    // สุ่มตัวอักษรใหม่
    let newLetter;
    do {
      newLetter = letters[Math.floor(Math.random() * letters.length)];
    } while (newLetter === currentLetter);

    // สุ่มสีใหม่
    const newColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    setCurrentLetter(newLetter);
    setCurrentColor(newColor);

    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <div className="w-full max-w-4xl px-4 mt-2 mb-4 flex justify-between items-center z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden md:inline font-black text-lg">กลับ</span>
        </button>

        <div className="bg-white/90 px-8 py-2 rounded-full shadow-lg border-[3px] border-white backdrop-blur-sm">
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 tracking-wider">
            🎮 เกมสุ่มอักษร
          </h1>
        </div>
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl px-4 z-10">
        <p className="text-white text-xl font-bold mb-6 drop-shadow-lg animate-bounce bg-black/20 px-6 py-2 rounded-full">
           แตะที่การ์ดเพื่อสุ่มตัวใหม่! 
        </p>

        {/* Big Card */}
        <button
          onClick={handleRandomize}
          className={`
            relative
            w-72 h-80 md:w-96 md:h-[28rem]
            rounded-[3rem]
            border-[12px] border-white
            shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]
            flex flex-col items-center justify-center
            cursor-pointer
            ${currentColor}
            transition-all duration-300
            hover:scale-105 active:scale-95
            ${animate ? "rotate-3 scale-95" : "rotate-0 scale-100"}
          `}
        >
          {/* ลายน้ำจางๆ */}
          <span className="absolute text-[15rem] text-white/20 font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            ?
          </span>

          <span className="text-[10rem] md:text-[12rem] font-black text-white drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)] leading-none">
            {currentLetter}
          </span>
          <span className="mt-4 bg-white/20 px-6 py-1 rounded-full text-white font-bold text-lg backdrop-blur-sm border border-white/30">
            แตะเลย!
          </span>
        </button>
      </div>
    </div>
  );
}

export default AlphabetGamePage;
