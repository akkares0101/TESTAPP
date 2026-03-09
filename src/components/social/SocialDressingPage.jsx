import React, { useRef, useEffect, useState } from 'react';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

function SocialDressingPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 👗 Path วิดีโอหลัก
  const mainVideo = "https://storage.googleapis.com/mtr-system/media-app/public/videos/social/dress.mp4";

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ สั่งให้วิดีโอเริ่มเล่นอัตโนมัติ
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.volume = 0.5;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  // ⭐ ฟังก์ชันสำหรับปุ่มกดหยุด/เล่นต่อ
  const togglePlay = () => {
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
      className="h-screen w-full flex flex-col items-center relative overflow-hidden py-4 md:py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาด */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. ส่วนหัว (❌ ไม่มีปุ่มกลับ โทนสีน้ำเงิน Blue) */}
      <div className="w-full px-4 flex justify-center items-center z-20 shrink-0 mb-2 md:mb-4">
        <div className="px-8 py-2 md:px-12 md:py-3 rounded-[3rem] shadow-lg border-[4px] md:border-[6px] border-blue-300 bg-white/90 backdrop-blur-md">
           <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-wide text-blue-600 text-center drop-shadow-sm">
             👗 เรื่อง การแต่งกาย
           </h1>
        </div>
      </div>

      {/* 2. Video Player Area (สูตรผอมเพรียว 950px ตัดขอบดำกวนใจ) */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 px-4 min-h-0">
        <div className="relative w-full max-w-[950px] aspect-video max-h-[70vh] bg-black rounded-[2rem] border-[6px] md:border-[8px] border-blue-400 shadow-[0_10px_0_#3b82f6] overflow-hidden group mb-4 md:mb-6">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                muted={isMuted} 
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}   
                onPause={() => setIsPlaying(false)} 
            />
        </div>

        {/* ⭐ 3. ปุ่มกดหยุด/เล่นต่อ (คลีนๆ) */}
        <button 
          onClick={togglePlay}
          className={`
            px-12 py-3 md:px-18 md:py-4 rounded-full text-xl md:text-2xl font-black text-white 
            shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[6px] 
            transition-all border-[4px] md:border-[6px] border-white tracking-wide shrink-0
            ${isPlaying ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}
          `}
        >
          {isPlaying ? 'หยุดวิดีโอ' : 'เล่นต่อ'}
        </button>

      </div>

    </div>
  );
}

export default SocialDressingPage;