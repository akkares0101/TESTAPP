import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function PhonicsMappingPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 🎥 Path วิดีโอหลัก
  const mainVideoPath = "https://storage.googleapis.com/mtr-system/media-app/public/videos/phonics/phonics_mapping.mp4"; 

  // 🎵 จัดการสถานะวิดีโอ
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ เล่นวิดีโออัตโนมัติพร้อมปรับระดับเสียง 70%
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.7;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  // ⭐ ฟังก์ชันสลับเล่น/หยุด
  const togglePlay = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }

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
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. Header & Back Button */}
      <div className="w-full px-4 pt-4 flex justify-between items-center z-20 shrink-0">
        <button 
          onClick={() => {
            if (!isMuted) { clickSound.currentTime = 0; clickSound.play().catch(()=>{}); }
            navigate(-1);
          }}
          className="bg-white/90 p-2 md:p-3 rounded-full shadow-md border-2 border-white hover:bg-purple-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-purple-500">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="bg-white/95 px-8 py-2 rounded-full shadow-md border-[3px] border-purple-300">
          <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-wide">
            🔠 เทียบเสียง (Mapping)
          </h1>
        </div>
        <div className="w-10 md:w-14"></div>
      </div>

      {/* 2. Video Player Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 px-4 min-h-0 py-4">
        
        {/* จอวิดีโอ (กดเพื่อหยุด/เล่นต่อได้) */}
        <div 
          onClick={togglePlay}
          className="relative w-full max-w-5xl aspect-video max-h-[55vh] md:max-h-[65vh] bg-black rounded-[2rem] border-[6px] md:border-[10px] border-purple-400 shadow-2xl overflow-hidden cursor-pointer group mb-6"
        >
            <video
                ref={videoRef}
                src={mainVideoPath}
                className="w-full h-full object-contain pointer-events-none"
                controls={false} // ปิด control เดิมทิ้งเพื่อความคลีน
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {/* สัญลักษณ์ Pause (จะโชว์ขึ้นมาเมื่อวิดีโอหยุด) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-purple-600 border-b-[12px] border-b-transparent ml-2"></div>
                </div>
              </div>
            )}
        </div>

        {/* 3. ปุ่มกดหยุด/เล่นต่อ (3D Button) */}
        <button 
          onClick={togglePlay}
          className={`
            min-w-[160px] md:min-w-[200px] py-3 rounded-2xl text-xl md:text-2xl font-black text-white 
            shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[6px] 
            transition-all tracking-wide shrink-0
            ${isPlaying ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'}
          `}
        >
          {isPlaying ? '⏸️ หยุดวิดีโอ' : '▶️ เล่นต่อ'}
        </button>

      </div>
    </div>
  );
}

export default PhonicsMappingPage;