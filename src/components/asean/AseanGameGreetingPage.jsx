import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png"; // เช็ค path รูปให้ถูกนะครับ

function AseanGameGreetingPage() {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  useEffect(() => {
    // Focus ที่ตัวเกมเพื่อให้กดเล่นได้เลย
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, []);

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
      {/* 1. Navbar (โค้ดชุดเดียวกับหน้าเมนู เพื่อให้ตำแหน่งเป๊ะ) */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
        <button
          onClick={() => navigate("/asean/game-menu")} // กลับไปหน้าเมนูเกม
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

      {/* 2. ส่วนแสดงผลเกม (จัดกึ่งกลาง + ล็อค 16:9 + พอดีจอ) */}
      <div className="flex-1 w-full flex items-center justify-center px-4 overflow-hidden">
        {/* - aspect-video: ล็อคสัดส่วน 16:9
            - max-h-[80vh]: ห้ามสูงเกิน 80% ของจอ (กันตกขอบ)
            - max-w-[90vw]: ห้ามกว้างเกิน 90% ของจอ
        */}
        <div className="relative w-full max-w-7xl aspect-video max-h-[75vh] shadow-2xl rounded-2xl border-4 border-white overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            title="Asean Godot Game"
            src="/game/asean/asean-greeting/index.html"
            className="w-full h-full border-none block"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default AseanGameGreetingPage;
