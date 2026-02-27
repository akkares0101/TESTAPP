import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsReadingPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const colorThemes = [
    { bg: "bg-rose-400", border: "border-rose-500" },
    { bg: "bg-sky-400", border: "border-sky-500" },
    { bg: "bg-green-400", border: "border-green-500" },
    { bg: "bg-yellow-400", border: "border-yellow-500" },
    { bg: "bg-purple-400", border: "border-purple-500" },
    { bg: "bg-orange-400", border: "border-orange-500" },
  ];

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const words = [
    { id: 1, word: "CAT", th: "แมว", time: 9 },      
    { id: 2, word: "BAT", th: "ค้างคาว", time: 34 },   
    { id: 3, word: "RAT", th: "หนู", time: 54 },      
    { id: 4, word: "PIG", th: "หมู", time: 75 },       
    { id: 5, word: "BEE", th: "ผึ้ง", time: 97 },        
    { id: 6, word: "DUCK", th: "เป็ด", time: 121 },    
    { id: 7, word: "KID", th: "เด็ก", time: 146 },     
    { id: 8, word: "SIT", th: "นั่ง", time: 169 },       
    { id: 9, word: "HOT", th: "ร้อน", time: 194 },      
    { id: 10, word: "RUN", th: "วิ่ง", time: 217 },       
    { id: 11, word: "GUN", th: "ปืน", time: 239 },      
    { id: 12, word: "FUN", th: "สนุก", time: 259 },     
    { id: 13, word: "LIP", th: "ริมฝีปาก", time: 279 },    
    { id: 14, word: "WIG", th: "วิกผม", time: 289 },    
  ];

  const handleSelectWord = (item) => {
    playClick();
    setSelectedWord(item);
    if (videoRef.current) {
      videoRef.current.currentTime = item.time;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Header (เล็กมาก เพื่อคืนพื้นที่) */}
      <div className="w-full px-4 flex justify-center items-center py-1 shrink-0 z-10">
        <div className="bg-white/90 px-8 py-1 rounded-full border-[2px] border-purple-400">
            <h1 className="text-lg md:text-xl font-black text-purple-600 tracking-tight">
              📖 ฝึกอ่าน Phonics
            </h1>
        </div>
      </div>

      {/* 2. Video Player Area (ขยายใหญ่สุด 70vh) */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 px-2 min-h-0">
        <div className="relative w-full max-w-[1100px] aspect-video max-h-[70vh] bg-black rounded-[2rem] border-[4px] md:border-[8px] border-purple-400 shadow-[0_8px_0_#a855f7] overflow-hidden">
            <video
                ref={videoRef}
                src="/videos/phonics/reading.mp4" 
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
      </div>

      {/* 3. แผงปุ่มจิ๋ว (บีบพื้นที่สุดๆ เพื่อไม่ให้เกิด Scroll) */}
      <div className="w-full max-w-[1150px] shrink-0 bg-white/90 backdrop-blur-md rounded-t-[2.5rem] border-t-2 border-white shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center z-20 pt-2 pb-4">
        
        {/* แถวปุ่มเล่น/หยุด */}
        <div className="flex items-center gap-4 mb-2 shrink-0">
            <button 
                onClick={togglePlay}
                className={`px-8 py-1.5 rounded-full text-base font-black text-white shadow-md transition-all ${isPlaying ? 'bg-rose-500' : 'bg-emerald-500'}`}
            >
                {isPlaying ? 'หยุด' : 'เล่นต่อ'}
            </button>
            <span className="text-purple-500 font-bold text-xs uppercase tracking-widest">Select Word</span>
        </div>

        {/* ตารางคำศัพท์ (ปุ่มเล็กมาก w-20 เพื่อให้จบในหน้าเดียว) */}
        <div className="w-full px-4">
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {words.map((item, index) => {
              const theme = colorThemes[index % colorThemes.length];
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWord(item)}
                  className={`
                    flex flex-col items-center justify-center shrink-0
                    w-16 h-10 md:w-20 md:h-12
                    rounded-lg text-white shadow-sm transition-all
                    ${theme.bg} border-b-[3px] border-r-[1px] ${theme.border}
                    ${selectedWord?.id === item.id ? 'translate-y-1 border-b-0 ring-2 ring-white scale-105' : 'hover:-translate-y-0.5'}
                  `}
                >
                  <span className="text-sm md:text-lg font-black leading-none uppercase">{item.word}</span>
                  <span className="text-[8px] md:text-[10px] font-bold opacity-90 leading-none">{item.th}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhonicsReadingPage;