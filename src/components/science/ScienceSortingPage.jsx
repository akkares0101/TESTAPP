import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function ScienceSortingPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);

  // ♻️ Path วิดีโอหลัก
  // ⚠️ เตรียมไฟล์วิดีโอไว้ที่: public/videos/science/sorting.mp4
  const mainVideo = "/videos/science/sorting.mp4";

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
      
      {/* 1. ส่วนหัว (❌ ไม่มีปุ่มกลับ จัดกึ่งกลางสวยๆ) */}
      <div className="w-full max-w-[95rem] px-4 py-4 flex justify-center items-center z-20 shrink-0 mt-4 md:mt-8">
        {/* ป้ายชื่อเรื่อง */}
        <div className="px-8 py-2 md:px-12 md:py-3 rounded-[3rem] shadow-lg border-[4px] md:border-[6px] border-emerald-300 bg-white/90 backdrop-blur-md max-w-4xl">
           <h1 className="text-xl md:text-4xl font-black tracking-wide text-emerald-600 text-center drop-shadow-sm">
             ♻️ แยกขยะสิ่งมีชีวิต และสิ่งไม่มีชีวิต
           </h1>
        </div>
      </div>

      {/* 2. Video Player Area (ตรงกลางจอใหญ่ๆ) */}
      <div className="w-full max-w-6xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 pb-8">
        <div className="relative w-full aspect-video bg-black rounded-[2rem] border-[8px] border-emerald-400 shadow-[0_15px_0_#10b981] overflow-hidden group transition-transform duration-300 hover:scale-[1.01]">
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

export default ScienceSortingPage;