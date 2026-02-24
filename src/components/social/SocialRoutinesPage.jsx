import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function SocialRoutinesPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);

  // 🧼 Path วิดีโอหลัก
  // ⚠️ เตรียมไฟล์วิดีโอไว้ที่: public/videos/social/กิจวัตรประจำวัน.mp4
  const mainVideo = "/videos/social/กิจวัตรประจำวัน.mp4";

  // 🎵 จัดการเสียง BGM (ให้เพลงพื้นหลังดับเมื่อเข้ามาหน้านี้)
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ สั่งให้วิดีโอเริ่มเล่นอัตโนมัติเมื่อเข้ามา
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.volume = 0.5; // ระดับเสียงวิดีโอ 50%
        videoRef.current.play().catch(() => {
          console.log("วิดีโอรอการสัมผัสหน้าจอเพื่อเล่นอัตโนมัติ");
        });
    }
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      {/* 1. ส่วนหัว (ชื่อเรื่อง) */}
      <div className="w-full max-w-[95rem] px-4 py-4 flex justify-center items-center z-20 shrink-0 mt-4 md:mt-8">
        <div className="px-8 py-2 md:px-12 md:py-3 rounded-[3rem] shadow-lg border-[4px] md:border-[6px] border-amber-300 bg-white/90 backdrop-blur-md max-w-4xl">
           <h1 className="text-xl md:text-4xl font-black tracking-wide text-amber-600 text-center drop-shadow-sm">
             🧼 เรื่อง กิจวัตรประจำวัน
           </h1>
        </div>
      </div>

      {/* 2. Video Player Area (แสดงวิดีโอขนาดใหญ่พอดีจอ) */}
      <div className="w-full max-w-6xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 pb-10">
        <div className="relative w-full aspect-video bg-black rounded-[2rem] border-[8px] border-amber-400 shadow-[0_15px_0_#f59e0b] overflow-hidden group transition-transform duration-300 hover:scale-[1.01]">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                muted={isMuted} // อิงตามสถานะเปิด/ปิดเสียงหลัก
                autoPlay
                playsInline
            />
        </div>
      </div>

    </div>
  );
}

export default SocialRoutinesPage;