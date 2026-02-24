import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function ThaiWriteConsonantPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // 📝 อัปเดตเวลา: ก (50 วินาที), ข (60 วินาที)
  const consonants = [
    { char: 'ก', time: 50 }, 
    { char: 'ข', time: 60 }, 
    { char: 'ฃ', time: 70 }, 
    { char: 'ค', time: 80 }, 
    { char: 'ฅ', time: 90 }, 
    { char: 'ฆ', time: 100 },
    { char: 'ง', time: 110 }, 
    { char: 'จ', time: 120 }, 
    { char: 'ฉ', time: 130 },
    { char: 'ช', time: 140 }, 
    { char: 'ซ', time: 150 }, 
    { char: 'ฌ', time: 160 }
  ];

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ฟังก์ชันตั้งค่าขนาด Canvas ให้ตรงกับพิกเซลหน้าจอจริง
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        // ตั้งค่า internal resolution ให้เท่ากับขนาดที่แสดงผลบนหน้าจอ
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // รีเซ็ตคุณสมบัติเส้นหลังจากเปลี่ยนขนาด
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#f97316'; 
        ctx.lineWidth = 14;
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    // ใช้ Timeout เล็กน้อยเพื่อให้เบราว์เซอร์คำนวณ Layout เสร็จก่อน
    setTimeout(updateCanvasSize, 100); 

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🎯 ฟังก์ชันคำนวณตำแหน่งพิกเซลให้แม่นยำ (หัวใจสำคัญที่ทำให้วาดตรง)
  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // หาตำแหน่งเมาส์หรือนิ้ว
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // คำนวณอัตราส่วน scaling ระหว่างขนาด canvas จริง กับขนาดที่โชว์บน CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleLetterClick = (time) => {
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
      {/* 1. ส่วนหัว */}
      <div className="w-full flex justify-center items-center pt-4 z-30 shrink-0">
        <div className="bg-white/90 px-8 py-1 rounded-full border-[3px] border-orange-400 shadow-sm">
           <h1 className="text-xl md:text-2xl font-black text-orange-600">ฝึกเขียนพยัญชนะ</h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอและกระดานเขียน */}
      <div className="flex-1 w-full flex justify-center items-center px-4 relative z-10 min-h-0 pt-2">
        <div className="relative h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/thai/เขียนพยัญชนะ.mp4" 
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

      {/* 3. แผงควบคุม (เล่นต่อ/หยุด/ลบ) */}
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

      {/* 4. แถบเลือกตัวอักษร */}
      <div className="w-full px-4 pb-6 pt-4 z-30 shrink-0">
        <div className="max-w-[75rem] mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-3 border-2 border-white shadow-md flex overflow-x-auto gap-2 scrollbar-hide">
          {consonants.map((item, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(item.time)}
              className="shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white text-orange-600 font-bold text-2xl rounded-xl border-2 border-orange-100 shadow-sm hover:bg-orange-50 active:scale-90 transition-all"
            >
              {item.char}
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

export default ThaiWriteConsonantPage;