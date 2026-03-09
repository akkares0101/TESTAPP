import React, { useState, useRef, useEffect } from 'react';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function ThaiWriteVowelsPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  const isDrawing = useRef(false);
  const isDraggingMenu = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const vowels = [
    { char: 'ะ', time: 20 }, { char: 'า', time: 40 }, { char: 'ิ', time: 48 },
    { char: 'ี', time: 63 }, { char: 'ึ', time: 80 }, { char: 'ื', time: 96 },
    { char: 'ุ', time: 110 }, { char: 'ู', time: 125 }, { char: 'เ-ะ', time: 140 },
    { char: 'เ-', time: 160 }, { char: 'แ-ะ', time: 176 }, { char: 'แ-', time: 195 },
    { char: 'โ-ะ', time: 212 }, { char: 'โ-', time: 231 }, { char: 'เ-าะ', time: 248 },
    { char: '-อ', time: 263 }, { char: 'เ-อะ', time: 280 }, { char: 'เ-อ', time: 296 },
    { char: 'เ-ียะ', time: 312 }, { char: 'เ-ีย', time: 330 }, { char: 'เ-ือะ', time: 344 },
    { char: 'เ-ือ', time: 362 }, { char: '-ัวะ', time: 380 }, { char: '-ัว', time: 392 },
    { char: '-ำ', time: 409 }, { char: 'ใ-', time: 426 }, { char: 'ไ-', time: 446 },
    { char: 'เ-า', time: 466 }, { char: 'ฤ', time: 479 }, { char: 'ฤๅ', time: 496 },
    { char: 'ฦ', time: 511 }, { char: 'ฦๅ', time: 528 }
  ];

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => { if (onVideoStateChange) onVideoStateChange(false); };
  }, [onVideoStateChange]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', updateCanvasSize);
    setTimeout(updateCanvasSize, 100); 
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#10b981'; // Emerald 500
    ctx.lineWidth = 12;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => { isDrawing.current = false; };

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
    if (Math.abs(walk) > 10) hasMoved.current = true;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleLetterClick = (time) => {
    if (hasMoved.current) { hasMoved.current = false; return; }
    playClick();
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
      setIsPaused(false);
      clearCanvas();
    }
  };

  const togglePlay = () => {
    playClick();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Header */}
      <div className="w-full flex justify-center items-center pt-2 z-30 shrink-0">
        <div className="bg-white/95 px-8 py-1.5 rounded-full border-[3px] border-emerald-400 shadow-sm">
           <h1 className="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">📝 ฝึกเขียนสระไทย</h1>
        </div>
      </div>

      {/* 2. Video & Canvas Area */}
      <div className="w-full h-[50vh] md:h-[58vh] flex justify-center items-center px-4 relative z-10 min-h-0 pt-2 shrink-0">
        <div className="relative h-full aspect-video bg-black rounded-[2rem] md:rounded-[3rem] border-[8px] border-white shadow-2xl overflow-hidden group">
          <video
            ref={videoRef}
            src="https://storage.googleapis.com/mtr-system/media-app/public/videos/thai/writevowels.mp4" 
            className="w-full h-full object-contain pointer-events-none"
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            playsInline
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full touch-none cursor-crosshair z-20"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {/* Overlay บอกสถานะ Pause */}
          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none z-10">
               <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-emerald-600 border-b-[10px] border-b-transparent ml-1"></div>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Control Buttons */}
      <div className="w-full flex justify-center gap-6 px-4 pt-4 z-30 shrink-0">
        <button 
          onClick={togglePlay} 
          className={`
            min-w-[140px] md:min-w-[200px] py-2.5 rounded-2xl font-black text-xl md:text-2xl transition-all shadow-[0_6px_0_#065f46] active:translate-y-[4px] active:shadow-none
            ${isPaused ? "bg-emerald-500 text-white" : "bg-amber-500 text-white shadow-[0_6px_0_#92400e]"}
          `}
        >
          {isPaused ? "เล่นต่อ" : "หยุดเขียน"}
        </button>
        <button 
          onClick={clearCanvas} 
          className="min-w-[140px] md:min-w-[200px] bg-rose-500 text-white py-2.5 rounded-2xl font-black text-xl md:text-2xl shadow-[0_6px_0_#9f1239] active:translate-y-[4px] active:shadow-none transition-all"
        >
          ลบที่เขียน
        </button>
      </div>

      {/* 4. Vowel Menu (แถบเลื่อนด้านล่าง - ปรับปรุงใหม่ ⭐) */}
      <div className="flex-1 w-full flex flex-col justify-end items-center px-4 pb-4 z-30 select-none">
        
        {/* ข้อความกระตุ้นให้รู้ว่าเลื่อนได้ (มีแอนิเมชันเด้งเบาๆ) */}
        <div className="flex items-center gap-2 mb-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm animate-bounce">
          <span className="text-emerald-600 font-bold text-sm md:text-base">👈 เลื่อนซ้าย-ขวา เพื่อเลือกสระ 👉</span>
        </div>

        <div className="relative w-full max-w-5xl">
          {/* เงาไล่สีซ้าย-ขวา (Fade Edges) ทำให้ดูมีมิติว่ามีปุ่มซ่อนอยู่ */}
          <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-white/60 to-transparent z-10 rounded-l-[2rem] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-white/60 to-transparent z-10 rounded-r-[2rem] pointer-events-none"></div>

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMenuMouseDown}
            onMouseLeave={() => isDraggingMenu.current = false}
            onMouseUp={() => isDraggingMenu.current = false}
            onMouseMove={handleMenuMouseMove}
            /* ปรับ p-3 เหลือ p-2 และปรับ px-6 เหลือ px-4 ให้กล่องเล็กลง */
            className="bg-white/50 backdrop-blur-md rounded-[2rem] p-2 border-2 border-white/60 shadow-lg flex overflow-x-auto gap-2 scrollbar-hide cursor-grab active:cursor-grabbing px-4"
          >
            {vowels.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                /* ปรับขนาดปุ่มจาก w-14/w-20 เป็น w-12/w-16 และลดขนาดฟอนต์ลง 1 สเตป */
                className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white text-emerald-600 font-black text-xl md:text-3xl rounded-xl md:rounded-2xl border-2 border-emerald-100 shadow-sm hover:scale-110 active:scale-95 transition-all"
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

export default ThaiWriteVowelsPage;