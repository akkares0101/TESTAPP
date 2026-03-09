import React, { useState, useRef, useEffect } from 'react';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsReadingPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordEndTime, setCurrentWordEndTime] = useState(null); // ⭐ เก็บเวลาจบของคำที่เลือก

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
    return () => { if (onVideoStateChange) onVideoStateChange(false); };
  }, [onVideoStateChange]);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 📝 เพิ่มค่า endTime (เวลาที่คำนั้นจบลง ก่อนคำใหม่จะเริ่ม)
  const words = [
    { id: 1, word: "CAT", th: "แมว", time: 9, endTime: 33 },      
    { id: 2, word: "BAT", th: "ค้างคาว", time: 34, endTime: 53 },   
    { id: 3, word: "RAT", th: "หนู", time: 54, endTime: 74 },      
    { id: 4, word: "PIG", th: "หมู", time: 75, endTime: 96 },       
    { id: 5, word: "BEE", th: "ผึ้ง", time: 97, endTime: 120 },        
    { id: 7, word: "KID", th: "เด็ก", time: 147, endTime: 168 },     
    { id: 8, word: "SIT", th: "นั่ง", time: 169, endTime: 193 },       
    { id: 9, word: "HOT", th: "ร้อน", time: 194, endTime: 216 },      
    { id: 10, word: "RUN", th: "วิ่ง", time: 217, endTime: 238 },       
    { id: 11, word: "GUN", th: "ปืน", time: 239, endTime: 258 },      
    { id: 12, word: "FUN", th: "สนุก", time: 259, endTime: 278 },     
    { id: 13, word: "LIP", th: "ริมฝีปาก", time: 279, endTime: 288 },    
    { id: 14, word: "WIG", th: "วิกผม", time: 289, endTime: 294 },    
  ];

  // ⭐ ตรวจสอบเวลาวิดีโอตลอดเวลา
  const handleTimeUpdate = () => {
    if (videoRef.current && currentWordEndTime !== null) {
      if (videoRef.current.currentTime >= currentWordEndTime) {
        videoRef.current.pause();
        setIsPlaying(false);
        setCurrentWordEndTime(null); // รีเซ็ตเพื่อไม่ให้ค้างที่จุดเดิม
      }
    }
  };

  const handleSelectWord = (item) => {
    playClick();
    setSelectedWord(item);
    if (videoRef.current) {
      videoRef.current.currentTime = item.time;
      videoRef.current.play();
      setIsPlaying(true);
      setCurrentWordEndTime(item.endTime); 
    }
  };

  const togglePlay = () => {
    playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setCurrentWordEndTime(null);
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{` ::-webkit-scrollbar { display: none; } * { -ms-overflow-style: none; scrollbar-width: none; } `}</style>

      {/* 1. Header */}
      <div className="w-full px-4 flex justify-center items-center py-1 shrink-0 z-10">
        <div className="bg-white/95 px-8 py-1 rounded-full border-[2px] border-purple-400 shadow-sm">
            <h1 className="text-base md:text-lg font-black text-purple-600 tracking-tight">📖 ฝึกอ่าน Phonics</h1>
        </div>
      </div>

      {/* 2. Video Player Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 px-2 min-h-0 py-2">
        <div className="relative w-full max-w-[1050px] aspect-video max-h-[65vh] bg-black rounded-[2rem] border-[6px] md:border-[10px] border-white shadow-2xl overflow-hidden">
            <video
                ref={videoRef}
                src="https://storage.googleapis.com/mtr-system/media-app/public/videos/phonics/reading.mp4" 
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate} // ⭐ ดักฟังเวลาเพื่อสั่งหยุด
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                 <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-purple-600 border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
              </div>
            )}
        </div>
      </div>

      {/* 3. แผงปุ่มศัพท์จิ๋ว */}
      <div className="w-full max-w-[1100px] shrink-0 bg-white/40 backdrop-blur-xl rounded-t-[2.5rem] border-t-2 border-white/60 shadow-lg flex flex-col items-center z-20 pt-2 pb-6">
        
        <div className="flex items-center gap-4 mb-3 shrink-0">
            <button onClick={togglePlay} className={`px-10 py-1.5 rounded-full text-base font-black text-white shadow-md transition-all ${isPlaying ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                {isPlaying ? '⏸️ หยุด' : '▶️ เล่นต่อ'}
            </button>
            <span className="text-purple-600 font-black text-xs uppercase bg-purple-100 px-3 py-1 rounded-full border border-purple-200">Select Word</span>
        </div>

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
                    ${selectedWord?.id === item.id ? 'translate-y-1 border-b-0 ring-2 ring-white scale-110' : 'hover:-translate-y-0.5'}
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