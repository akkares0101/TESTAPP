import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ลบ coverImg ออกได้เลยเพราะเราใช้ Video Player แทนแล้ว

function ScienceIntroPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 🧪 Path วิดีโอหลัก
  // ⚠️ เตรียมไฟล์วิดีโอไว้ที่: public/videos/science/science_intro.mp4
  const mainVideo = "/videos/science/science_intro.mp4";

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
        videoRef.current.volume = 0.5; // ลดเสียงวิดีโอลงระดับกลาง
        videoRef.current.play().catch(() => {});
    }
  }, []);

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
      
      {/* 1. ส่วนหัว (Header & ปุ่มกลับ) */}
      <div className="w-full max-w-[95rem] px-4 py-4 flex justify-between items-center z-20 shrink-0 mt-4">
        {/* ปุ่มกลับ */}
        <button 
          onClick={() => navigate('/science')} 
          className="
            group flex items-center justify-center
            w-12 h-12 md:w-16 md:h-16
            bg-white text-green-600 rounded-full 
            shadow-[0_4px_0_#86efac] border-[3px] border-green-200 
            hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_0_#86efac] 
            active:scale-95 active:translate-y-1 active:shadow-none
            transition-all duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* ป้ายชื่อเรื่อง */}
        <div className="flex-1 flex justify-center items-center px-6 py-2 md:py-3 rounded-[3rem] shadow-lg border-[4px] border-green-300 bg-white/90 backdrop-blur-md mx-4 max-w-2xl">
           <h1 className="text-xl md:text-3xl font-black tracking-wide text-green-600 truncate">
             🧪 บทนำ: วิทยาศาสตร์คืออะไร?
           </h1>
        </div>
        
        {/* ตัวดัน Layout ให้ป้ายชื่ออยู่ตรงกลาง */}
        <div className="w-12 md:w-16"></div>
      </div>

      {/* 2. Video Player Area (ตรงกลางจอใหญ่ๆ) */}
      <div className="w-full max-w-6xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 pb-8">
        <div className="relative w-full aspect-video bg-black rounded-[2rem] border-[8px] border-green-400 shadow-[0_15px_0_#22c55e] overflow-hidden group">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                muted={isMuted} // ลิงก์กับปุ่มเปิด/ปิดเสียงหลักของแอป
                autoPlay
                playsInline
            />
        </div>
      </div>

    </div>
  );
}

export default ScienceIntroPage;