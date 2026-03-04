import React, { useRef, useEffect } from "react";
import bgImage from "../../assets/images/bg.png"; 

// ⭐ 1. รับ onVideoStateChange เข้ามาเพื่อจัดการเพลง Background
function ScienceGamePage({ onVideoStateChange }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // ⭐ 2. สั่งหยุดเพลงพื้นหลังทันทีที่เข้าหน้านี้
    if (onVideoStateChange) {
      onVideoStateChange(true);
    }

    // Focus ที่ตัวเกมเพื่อให้กดเล่นได้เลย
    if (iframeRef.current) {
      iframeRef.current.focus();
    }

    // ⭐ 3. คืนค่าเพลงพื้นหลังให้กลับมาเล่นปกติ เมื่อกดออกจากหน้านี้
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
      {/* 2. ส่วนแสดงผลเกม (จัดกึ่งกลาง + ล็อค 16:9 + พอดีจอ) */}
      <div className="flex-1 w-full flex items-center justify-center px-4 overflow-hidden">
        {/* - aspect-video: ล็อคสัดส่วน 16:9
            - max-h-[75vh]: ห้ามสูงเกิน 75% ของจอ (กันตกขอบ)
            - max-w-[90vw]: ห้ามกว้างเกิน 90% ของจอ
        */}
        <div className="relative w-full max-w-7xl aspect-video max-h-[75vh] shadow-2xl rounded-2xl border-4 border-white overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            title="Science Godot Game"
            src="/game/science/gamescience/index.html"
            className="w-full h-full border-none block"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default ScienceGamePage;