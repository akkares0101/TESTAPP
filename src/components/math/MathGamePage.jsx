import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png"; 

// ⭐ 1. รับ onVideoStateChange เข้ามาจัดการเพลง Background
function MathGamePage({ onVideoStateChange }) {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  useEffect(() => {
    // ⭐ 2. สั่งปิดเพลงพื้นหลังทันทีที่เข้าหน้านี้
    if (onVideoStateChange) {
      onVideoStateChange(true);
    }

    // Focus ที่ตัวเกมเพื่อให้กดเล่นได้เลย
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
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 1. Navbar */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
        <button
          onClick={() => navigate("/family")} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden md:inline font-black text-lg">
            กลับเมนูเกม
          </span>
        </button>
      </div>

      {/* 2. ส่วนแสดงผลเกม */}
      <div className="flex-1 w-full flex items-center justify-center px-4 overflow-hidden">
        <div className="relative w-full max-w-7xl aspect-video max-h-[75vh] shadow-2xl rounded-2xl border-4 border-white overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            title="Math Godot Game"
            src="https://storage.googleapis.com/mtr-system/media-app/public/game/math/gamenumbers/index.html"
            className="w-full h-full border-none block"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default MathGamePage;