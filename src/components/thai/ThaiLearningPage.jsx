import React, { useRef, useEffect, useState } from 'react';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

function ThaiLearningPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // เพิ่ม Ref สำหรับจัดการการลากเลื่อนเมนู (Drag to Scroll)
  const isDraggingMenu = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  const consonants = [
    { char: 'ก', time: 14 }, { char: 'ข', time: 23 }, { char: 'ฃ', time: 31 },
    { char: 'ค', time: 40 }, { char: 'ฅ', time: 49 }, { char: 'ฆ', time: 59 },
    { char: 'ง', time: 69 }, { char: 'จ', time: 77 }, { char: 'ฉ', time: 86 },
    { char: 'ช', time: 98 }, { char: 'ซ', time: 107 }, { char: 'ฌ', time: 117 },
    { char: 'ญ', time: 126 }, { char: 'ฎ', time: 134 }, { char: 'ฏ', time: 144 },
    { char: 'ฐ', time: 153 }, { char: 'ฑ', time: 163 }, { char: 'ฒ', time: 171 },
    { char: 'ณ', time: 181 }, { char: 'ด', time: 190 }, { char: 'ต', time: 201 },
    { char: 'ถ', time: 217 }, { char: 'ท', time: 230 }, { char: 'ธ', time: 242 },
    { char: 'น', time: 254 }, { char: 'บ', time: 268 }, { char: 'ป', time: 281 },
    { char: 'ผ', time: 294 }, { char: 'ฝ', time: 307 }, { char: 'พ', time: 320 },
    { char: 'ฟ', time: 333 }, { char: 'ภ', time: 348 }, { char: 'ม', time: 361 },
    { char: 'ย', time: 373 }, { char: 'ร', time: 386 }, { char: 'ล', time: 398 },
    { char: 'ว', time: 411 }, { char: 'ศ', time: 423 }, { char: 'ษ', time: 437 },
    { char: 'ส', time: 449 }, { char: 'ห', time: 460 }, { char: 'ฬ', time: 471 },
    { char: 'อ', time: 483 }, { char: 'ฮ', time: 495 }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // ฟังก์ชันจัดการการลากเมาส์เลื่อนเมนู
  const handleMenuMouseDown = (e) => {
    isDraggingMenu.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMenuMouseMove = (e) => {
    if (!isDraggingMenu.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    if (Math.abs(walk) > 10) hasMoved.current = true; // ดักไว้ว่าถ้าแค่คลิกเฉยๆ ไม่ต้องเลื่อน
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleLetterClick = (timeInSeconds) => {
    // ถ้ากำลังลากเลื่อนอยู่ ให้ข้ามการคลิกไป
    if (hasMoved.current) { 
      hasMoved.current = false; 
      return; 
    }
    
    if (videoRef.current) {
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. Header */}
      <div className="w-full flex justify-center items-center z-20 pt-2 pb-1 shrink-0">
        <div className="px-6 py-1 rounded-full border-[3px] border-pink-300 bg-white/95 shadow-sm">
           <h1 className="text-sm md:text-xl font-black text-pink-600">
             🇹🇭 ฝึกอ่านพยัญชนะ ก-ฮ
           </h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอ (ขยายพื้นที่ให้กว้างขึ้น) */}
      <div className="w-full h-[55vh] md:h-[65vh] flex justify-center items-center shrink-0 z-10 px-4 mt-2">
        <div 
          onClick={togglePlay}
          className="relative h-full aspect-video bg-black rounded-[2rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-pink-400 shadow-xl overflow-hidden cursor-pointer group"
        >
            <video
                ref={videoRef}
                src="https://storage.googleapis.com/mtr-system/media-app/public/videos/thai/readcon.mp4" 
                className="w-full h-full object-contain pointer-events-none"
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {/* ไอคอนปุ่ม Play วงกลมสวยๆ ตรงกลางตอนหยุดวิดีโอ */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-pink-600 border-b-[12px] border-b-transparent ml-2"></div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 3. แผงเมนูพยัญชนะ (เปลี่ยนเป็นแบบ Scrollable Row คลีนๆ ⭐) */}
      <div className="flex-1 w-full flex flex-col justify-end items-center px-4 pb-4 z-30 select-none">
        
        {/* ตัวใบ้บอกให้เลื่อน */}
        <div className="flex items-center gap-2 mb-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm animate-bounce">
          <span className="text-pink-600 font-bold text-sm md:text-base">👈 เลื่อนซ้าย-ขวา เพื่อเลือกพยัญชนะ 👉</span>
        </div>

        <div className="relative w-full max-w-5xl">
          {/* เงาไล่สีด้านข้าง ทำให้ดูมีมิติ */}
          <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-white/60 to-transparent z-10 rounded-l-[2rem] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-white/60 to-transparent z-10 rounded-r-[2rem] pointer-events-none"></div>

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMenuMouseDown}
            onMouseLeave={() => isDraggingMenu.current = false}
            onMouseUp={() => isDraggingMenu.current = false}
            onMouseMove={handleMenuMouseMove}
            className="bg-white/50 backdrop-blur-md rounded-[2rem] p-2 border-2 border-white/60 shadow-lg flex overflow-x-auto gap-2 scrollbar-hide cursor-grab active:cursor-grabbing px-4"
          >
            {consonants.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white text-pink-600 font-black text-xl md:text-3xl rounded-xl md:rounded-2xl border-2 border-pink-100 shadow-sm hover:scale-110 active:scale-95 transition-all"
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThaiLearningPage;