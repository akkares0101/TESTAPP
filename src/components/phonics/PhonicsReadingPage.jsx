import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsReadingPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [selectedWord, setSelectedWord] = useState(null);

  // ธีมสีปุ่มแบบเดียวกับภาษาอังกฤษ
  const colorThemes = [
    { bg: "bg-rose-400", border: "border-rose-500" },
    { bg: "bg-sky-400", border: "border-sky-500" },
    { bg: "bg-green-400", border: "border-green-500" },
    { bg: "bg-yellow-400", border: "border-yellow-500" },
    { bg: "bg-purple-400", border: "border-purple-500" },
    { bg: "bg-orange-400", border: "border-orange-500" },
  ];

  // 🎵 จัดการเสียง BGM
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

  // 📖 ข้อมูลคำศัพท์ (แปลงเวลาเป็นวินาทีแล้ว)
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

  // ฟังก์ชันเมื่อกดเลือกคำศัพท์
  const handleSelectWord = (item) => {
    playClick();
    setSelectedWord(item);
    if (videoRef.current) {
      videoRef.current.currentTime = item.time;
      videoRef.current.play();
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
      {/* 1. Header (เล็กและกะทัดรัด) */}
      <div className="w-full max-w-5xl px-4 flex justify-center items-center py-2 shrink-0 z-10 mt-1">
        <div className="bg-white px-6 py-1.5 md:px-8 md:py-2 rounded-full border-[3px] md:border-[4px] border-purple-400 shadow-sm text-center">
            <h1 className="text-lg md:text-2xl font-black text-purple-600 tracking-wide">
              📖 ฝึกอ่านคำศัพท์ (Phonics)
            </h1>
        </div>
      </div>

      {/* 2. Video Player Area (จอใหญ่เต็มตา 60-65% ของจอ) */}
      <div className="w-full max-w-5xl px-2 md:px-4 flex-1 min-h-0 flex flex-col justify-center pb-2 z-10">
        <div className="relative w-full h-full max-h-[60vh] md:max-h-[65vh] bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-purple-200 shadow-[0_15px_40px_rgba(0,0,0,0.3)] overflow-hidden group">
            <video
                ref={videoRef}
                src="/videos/phonics/reading.mp4" /* ⚠️ อย่าลืมเตรียมไฟล์วิดีโอนะครับ */
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                playsInline
            />
        </div>
      </div>

      {/* 3. Bottom Grid (ปุ่มคำศัพท์สไตล์อังกฤษ) */}
      <div className="w-full max-w-5xl h-[30vh] shrink-0 bg-white/70 backdrop-blur-xl rounded-t-[2rem] border-t-4 border-white/80 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col z-20 pt-2 pb-4">
        
        <div className="text-center pb-2 shrink-0">
            <span className="text-gray-500 font-bold text-xs md:text-sm bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100">
                เลือกคำศัพท์เพื่อฝึกอ่าน
            </span>
        </div>

        {/* ตารางคำศัพท์ */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto pb-4">
            {words.map((item, index) => {
              const theme = colorThemes[index % colorThemes.length];

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWord(item)}
                  className={`
                    flex flex-col items-center justify-center shrink-0
                    w-[4.5rem] h-14 md:w-24 md:h-16 
                    rounded-xl text-white shadow-sm transition-all duration-150
                    ${theme.bg} border-b-[4px] border-r-2 ${theme.border}
                    ${selectedWord?.id === item.id ? 'translate-y-1 border-b-0 brightness-110 ring-2 ring-white scale-110 z-10' : 'hover:-translate-y-1 hover:brightness-105'}
                  `}
                >
                  <span className="text-xl md:text-2xl font-black leading-none drop-shadow-sm">{item.word}</span>
                  <span className="text-[10px] md:text-xs font-bold mt-0.5 opacity-90 leading-none">{item.th}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default PhonicsReadingPage;