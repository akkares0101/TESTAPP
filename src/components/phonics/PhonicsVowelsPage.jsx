import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

function PhonicsVowelsPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const mainVideo = "https://storage.googleapis.com/mtr-system/media-app/public/videos/phonics/vowels_song.mp4";

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => { if (onVideoStateChange) onVideoStateChange(false); };
  }, [onVideoStateChange]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5; 
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  const jumpToTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // ⭐ อัปเดตเวลาใหม่ตามที่ระบุ (แปลงเป็นวินาที)
  const timeStamps = [
    { id: 1, char: "A", time: 57, color: "bg-red-500", border: "border-red-600" },    
    { id: 2, char: "E", time: 83, color: "bg-yellow-400", border: "border-yellow-500" }, 
    { id: 3, char: "I", time: 107, color: "bg-green-500", border: "border-green-600" },  
    { id: 4, char: "O", time: 129, color: "bg-blue-500", border: "border-blue-600" },    
    { id: 5, char: "U", time: 154, color: "bg-purple-500", border: "border-purple-600" }, 
  ];

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{` ::-webkit-scrollbar { display: none; } * { -ms-overflow-style: none; scrollbar-width: none; } `}</style>

      {/* 1. Header & Back Button */}
      <div className="w-full px-4 pt-4 flex justify-between items-center z-20 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/90 p-2 md:p-3 rounded-full shadow-md border-2 border-white hover:bg-purple-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-purple-500">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="bg-white/95 px-8 py-2 rounded-full shadow-md border-[3px] border-purple-300">
          <h1 className="text-xl md:text-2xl font-black text-purple-600 tracking-wide">🅰️ สระภาษาอังกฤษ (Vowels)</h1>
        </div>
        <div className="w-10 md:w-14"></div>
      </div>

      {/* 2. Video Area (ขยายใหญ่ขึ้น) */}
      <div className="w-full flex-1 flex justify-center items-center z-10 px-4 min-h-0 py-2">
        <div 
          onClick={togglePlay}
          className="relative w-full max-w-5xl h-full aspect-video bg-black rounded-[2rem] border-[6px] md:border-[10px] border-yellow-400 shadow-2xl overflow-hidden cursor-pointer"
        >
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain pointer-events-none"
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-purple-600 border-b-[12px] border-b-transparent ml-2"></div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 3. แผงควบคุมด้านล่าง (ปุ่มหยุด และ ปุ่มเลือกสระ) */}
      <div className="w-full flex flex-col items-center z-20 pb-8 pt-2 shrink-0">
        <div className="bg-white/40 backdrop-blur-xl px-6 py-4 rounded-[2.5rem] border-2 border-white/60 shadow-xl flex flex-col items-center max-w-3xl w-full mx-4">
            
            <div className="flex items-center gap-4 mb-4 w-full justify-center">
                <button 
                  onClick={togglePlay}
                  className={`flex-1 max-w-[200px] py-2.5 rounded-2xl font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all ${isPlaying ? 'bg-rose-500' : 'bg-emerald-500'}`}
                >
                  {isPlaying ? '⏸️ หยุดวิดีโอ' : '▶️ เล่นต่อ'}
                </button>
                <div className="hidden md:block bg-blue-100 px-4 py-2 rounded-2xl border border-blue-200">
                    <span className="text-blue-600 font-black text-sm uppercase">กดที่ตัวอักษรเพื่อข้ามเวลา 🎵</span>
                </div>
            </div>

            {/* ปุ่มทางลัด A E I O U */}
            <div className="flex gap-2 md:gap-4">
                {timeStamps.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => jumpToTime(item.time)}
                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl ${item.color} ${item.border} border-b-[6px] shadow-lg hover:scale-110 active:translate-y-1 active:border-b-0 transition-all`}
                    >
                        <span className="text-xl md:text-3xl font-black text-white drop-shadow-md">{item.char}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default PhonicsVowelsPage;