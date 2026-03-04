import React, { useRef, useEffect } from "react";
import bgImage from "../../assets/images/bg.png";

// ⭐ 1. รับ onVideoStateChange เข้ามาจัดการเพลง Background
function PhonicsGamePage({ onVideoStateChange }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // ⭐ 2. สั่งปิดเพลงพื้นหลังทันทีที่เข้าหน้านี้ (หลอกระบบว่ามีวิดีโอเล่นอยู่)
    if (onVideoStateChange) {
      onVideoStateChange(true);
    }

    // Focus ที่ตัวเกมเพื่อให้กดเล่นได้เลยทันที
    if (iframeRef.current) {
      iframeRef.current.focus();
    }

    // ⭐ 3. คืนค่าให้เพลงกลับมาเล่นปกติ เมื่อกดออกจากหน้านี้
    return () => {
      if (onVideoStateChange) {
        onVideoStateChange(false);
      }
    };
  }, [onVideoStateChange]);

  return (
    <div
      className="h-screen w-full flex flex-col items-center relative overflow-hidden py-4 md:py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาดตามโจทย์ */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. ส่วนหัว */}
      <div className="w-full px-4 flex justify-center items-center z-20 shrink-0 mb-2 md:mb-4">
        <div className="px-8 py-2 md:px-12 md:py-3 rounded-[3rem] shadow-lg border-[4px] md:border-[6px] border-sky-300 bg-white/90 backdrop-blur-md">
           <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-wide text-sky-600 text-center drop-shadow-sm">
             🎮 เกมฝึกออกเสียง Phonics
           </h1>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 px-4 min-h-0 pb-6">
        <div className="relative w-full max-w-[1100px] aspect-video max-h-[75vh] bg-black rounded-[2rem] border-[6px] md:border-[10px] border-white shadow-2xl overflow-hidden">
          <iframe
            ref={iframeRef}
            title="Phonics Godot Game"
            src="/game/phonics/gamephonics/index.html"
            className="w-full h-full border-none block"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}

export default PhonicsGamePage;