import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function ThaiWriteTonePage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  // ระบบวาดและเลื่อน
  const isDrawing = useRef(false);
  const isDraggingMenu = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  // 📝 ข้อมูลวรรณยุกต์และเวลาที่แปลงเป็นวินาทีแล้ว
  const tones = [
    { name: 'ไม้เอก', char: ' ่', time: 40 },   // 0.40
    { name: 'ไม้โท', char: ' ้', time: 57 },    // 0.57
    { name: 'ไม้ตรี', char: ' ๊', time: 75 },    // 1.15
    { name: 'ไม้จัตวา', char: ' ๋', time: 93 }   // 1.33
  ];

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
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
    ctx.strokeStyle = '#a855f7'; // ⭐ เปลี่ยนสีปากกาเป็นสีม่วง (Purple)
    ctx.lineWidth = 14;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const handleMenuMouseDown = (e) => {
    isDraggingMenu.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMenuMouseLeave = () => {
    isDraggingMenu.current = false;
  };

  const handleMenuMouseUp = () => {
    isDraggingMenu.current = false;
  };

  const handleMenuMouseMove = (e) => {
    if (!isDraggingMenu.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    if (Math.abs(walk) > 10) {
        hasMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleToneClick = (time) => {
    if (hasMoved.current) {
        hasMoved.current = false;
        return;
    }
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
      className="h-screen w-full flex flex-col relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full flex justify-center items-center pt-4 z-30 shrink-0">
        <div className="bg-white/90 px-8 py-1 rounded-full border-[3px] border-purple-400 shadow-sm">
           <h1 className="text-xl md:text-2xl font-black text-purple-600">ฝึกเขียนวรรณยุกต์</h1>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center items-center px-4 relative z-10 min-h-0 pt-2">
        <div className="relative h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/thai/เขียนวรรณยุกต์.mp4" 
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
        </div>
      </div>

      <div className="w-full flex justify-center gap-4 px-4 pt-4 z-30">
        <button 
          onClick={togglePlay} 
          className={`
            min-w-[140px] md:min-w-[180px] py-3 rounded-2xl font-black text-xl transition-all shadow-lg active:translate-y-1 active:shadow-none
            ${isPaused ? "bg-emerald-500 text-white border-b-8 border-emerald-700" : "bg-amber-500 text-white border-b-8 border-amber-700"}
          `}
        >
          {isPaused ? "เล่นต่อ" : "หยุดเขียน"}
        </button>
        <button 
          onClick={clearCanvas} 
          className="min-w-[140px] md:min-w-[180px] bg-rose-500 text-white py-3 rounded-2xl font-black text-xl border-b-8 border-rose-700 shadow-lg active:translate-y-1 active:shadow-none transition-all"
        >
          ลบที่เขียน
        </button>
      </div>

      {/* แถบเลือกวรรณยุกต์ (ปุ่มขยายกว้างขึ้นเพราะมีชื่อด้วย) */}
      <div className="w-full px-4 pb-6 pt-4 z-30 shrink-0 select-none">
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMenuMouseDown}
          onMouseLeave={handleMenuMouseLeave}
          onMouseUp={handleMenuMouseUp}
          onMouseMove={handleMenuMouseMove}
          className="max-w-[75rem] mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-3 border-2 border-white shadow-md flex justify-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        >
          {tones.map((item, index) => (
            <button
              key={index}
              onClick={() => handleToneClick(item.time)}
              className="shrink-0 px-4 md:px-8 h-14 md:h-16 flex flex-col items-center justify-center bg-white text-purple-600 rounded-xl border-2 border-purple-200 shadow-sm hover:bg-purple-50 active:scale-95 transition-all pointer-events-auto"
            >
              <span className="text-2xl md:text-3xl font-black leading-none">{item.char}</span>
              <span className="text-xs md:text-sm font-bold mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default ThaiWriteTonePage;