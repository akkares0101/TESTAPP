import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

function AlphabetLearningPage({ isMuted }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // สร้าง Array A-Z
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  // ชุดสี
  const colorThemes = [
    { bg: "bg-rose-400", border: "border-rose-500" },
    { bg: "bg-sky-400", border: "border-sky-500" },
    { bg: "bg-green-400", border: "border-green-500" },
    { bg: "bg-yellow-400", border: "border-yellow-500" },
    { bg: "bg-purple-400", border: "border-purple-500" },
  ];

  const [selectedLetter, setSelectedLetter] = useState('A');
  const [isUpperCase, setIsUpperCase] = useState(true); // True = พิมพ์ใหญ่, False = พิมพ์เล็ก

  // ✅ ฟังก์ชันเลือกไฟล์วิดีโอตามโหมด
  const getVideoSrc = (char) => {
    if (isUpperCase) {
      // โหมดพิมพ์ใหญ่: ใช้ชื่อไฟล์ A.mp4, B.mp4
      return `/videos/alphabet/${char}.mp4`;
    } else {
      // โหมดพิมพ์เล็ก: ใช้ชื่อไฟล์ a_small.mp4, b_small.mp4
      return `/videos/alphabet/${char.toLowerCase()}_small.mp4`;
    }
  };

  // โหลดวิดีโอใหม่ทุกครั้งที่เปลี่ยนตัวอักษร หรือ เปลี่ยนโหมดพิมพ์ใหญ่/เล็ก
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
    }
  }, [selectedLetter, isUpperCase]);

  return (
    <div 
      className="h-screen w-full flex flex-col items-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* Header */}
      <div className="w-full max-w-5xl px-4 py-3 flex justify-between items-center z-10 shrink-0 gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform"><path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" /></svg>
          <span className="hidden md:inline font-black text-lg">กลับ</span>
        </button>

        <div className="flex-1 flex justify-center items-center px-6 py-2 rounded-[2rem] shadow-xl border-[4px] border-white bg-rose-400">
           <h1 className="text-lg md:text-3xl font-black text-white tracking-wider flex items-center gap-3">
             <span className="text-lg hidden md:inline">สื่อการสอน:</span>
             <div className="bg-white/20 px-4 py-1 rounded-xl min-w-[3rem] text-center">
                <span className="text-4xl md:text-5xl drop-shadow-md">
                    {isUpperCase ? selectedLetter : selectedLetter.toLowerCase()}
                </span>
             </div>
           </h1>
        </div>
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* Video Player */}
      <div className="w-full max-w-4xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 mb-2">
        <div className="w-full h-full max-h-[50vh] bg-black rounded-[2rem] border-[8px] border-rose-200 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-8 md:h-10 bg-white/10 z-20 pointer-events-none border-b border-white/10 backdrop-blur-sm flex items-center px-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-white/80 text-xs font-bold tracking-widest">ENGLISH PLAYER</span>
          </div>

          <video 
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            muted={isMuted}
            poster={`https://via.placeholder.com/800x450/000000/FFFFFF?text=${isUpperCase ? selectedLetter : selectedLetter.toLowerCase()}`}
          >
            {/* ✅ เรียกใช้ฟังก์ชัน getVideoSrc */}
            <source src={getVideoSrc(selectedLetter)} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Buttons Area */}
      <div className="w-full max-w-5xl h-[38vh] shrink-0 bg-white/60 backdrop-blur-xl rounded-t-[2rem] border-t-4 border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col z-10">
        
        {/* ปุ่มสลับโหมด */}
        <div className="flex justify-center gap-4 py-3 shrink-0 border-b border-white/30">
            <button 
                onClick={() => setIsUpperCase(true)}
                className={`px-6 py-2 rounded-full font-bold text-lg transition-all shadow-sm border-2 ${isUpperCase ? 'bg-blue-500 text-white border-blue-600 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
                ABC พิมพ์ใหญ่
            </button>
            <button 
                onClick={() => setIsUpperCase(false)}
                className={`px-6 py-2 rounded-full font-bold text-lg transition-all shadow-sm border-2 ${!isUpperCase ? 'bg-pink-500 text-white border-pink-600 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
                abc พิมพ์เล็ก
            </button>
        </div>

        {/* ตารางตัวอักษร */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-3 pb-8">
            {letters.map((char, index) => {
              const theme = colorThemes[index % colorThemes.length];
              const displayChar = isUpperCase ? char : char.toLowerCase();

              return (
                <button
                  key={char}
                  onClick={() => setSelectedLetter(char)}
                  className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-xl text-3xl md:text-4xl font-black text-white shadow-md transition-all duration-150
                    flex items-center justify-center
                    ${theme.bg} border-b-4 border-r-2 ${theme.border}
                    ${selectedLetter === char ? 'translate-y-1 border-b-0 brightness-110 ring-4 ring-white' : 'hover:-translate-y-1 hover:brightness-105'}
                  `}
                >
                  {displayChar}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlphabetLearningPage;