import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

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

      {/* 2. Video & Canvas Area (ขยายใหญ่ขึ้น) */}
      <div className="w-full h-[50vh] md:h-[58vh] flex justify-center items-center px-4 relative z-10 min-h-0 pt-2 shrink-0">
        <div className="relative h-full aspect-video bg-black rounded-[2rem] md:rounded-[3rem] border-[8px] border-white shadow-2xl overflow-hidden group">
          <video
            ref={videoRef}
            src="/videos/thai/เขียนสระ.mp4" 
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

      {/* 3. Control Buttons (ปุ่ม 3D สวยๆ) */}
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

      {/* 4. Vowel Menu (แถบเลื่อนด้านล่าง) */}
      <div className="flex-1 w-full flex items-end px-4 pb-6 z-30 select-none">
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMenuMouseDown}
          onMouseLeave={() => isDraggingMenu.current = false}
          onMouseUp={() => isDraggingMenu.current = false}
          onMouseMove={handleMenuMouseMove}
          className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-[2.5rem] p-3 border-2 border-white/50 shadow-lg flex overflow-x-auto gap-3 scrollbar-hide cursor-grab active:cursor-grabbing px-6"
        >
          {vowels.map((item, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(item.time)}
              className="shrink-0 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center bg-white text-emerald-600 font-black text-2xl md:text-4xl rounded-2xl border-2 border-emerald-100 shadow-sm hover:scale-110 active:scale-95 transition-all"
            >
              {item.char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThaiWriteVowelsPage;