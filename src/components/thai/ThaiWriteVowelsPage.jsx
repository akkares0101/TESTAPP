import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function ThaiWriteVowelsPage({ isMuted, onVideoStateChange }) {
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

  // 📝 ข้อมูลสระและเวลาที่แปลงเป็นวินาทีแล้ว (เพิ่ม สระ ื แล้วครับ!)
  const vowels = [
    { char: 'ะ', time: 20 },      // 0.20
    { char: 'า', time: 40 },      // 0.40
    { char: 'ิ', time: 48 },      // 0.48
    { char: 'ี', time: 63 },      // 1.03
    { char: 'ึ', time: 80 },      // 1.20
    { char: 'ื', time: 96 },      // 1.36 ⭐ เพิ่มสระ ื ตรงนี้
    { char: 'ุ', time: 110 },     // 1.50
    { char: 'ู', time: 125 },     // 2.05
    { char: 'เ-ะ', time: 140 },   // 2.20
    { char: 'เ-', time: 160 },    // 2.40
    { char: 'แ-ะ', time: 176 },   // 2.56
    { char: 'แ-', time: 195 },    // 3.15
    { char: 'โ-ะ', time: 212 },   // 3.32
    { char: 'โ-', time: 231 },    // 3.51
    { char: 'เ-าะ', time: 248 },  // 4.08
    { char: '-อ', time: 263 },    // 4.23
    { char: 'เ-อะ', time: 280 },  // 4.40
    { char: 'เ-อ', time: 296 },   // 4.56
    { char: 'เ-ียะ', time: 312 }, // 5.12
    { char: 'เ-ีย', time: 330 },  // 5.30
    { char: 'เ-ือะ', time: 344 }, // 5.44
    { char: 'เ-ือ', time: 362 },  // 6.02
    { char: '-ัวะ', time: 380 },  // 6.20
    { char: '-ัว', time: 392 },   // 6.32
    { char: '-ำ', time: 409 },    // 6.49
    { char: 'ใ-', time: 426 },    // 7.06
    { char: 'ไ-', time: 446 },    // 7.26
    { char: 'เ-า', time: 466 },   // 7.46
    { char: 'ฤ', time: 479 },     // 7.59
    { char: 'ฤๅ', time: 496 },    // 8.16
    { char: 'ฦ', time: 511 },     // 8.31
    { char: 'ฦๅ', time: 528 }     // 8.48
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
    ctx.strokeStyle = '#34d399'; // สีเขียวมรกต
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

  const handleLetterClick = (time) => {
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
        <div className="bg-white/90 px-8 py-1 rounded-full border-[3px] border-emerald-400 shadow-sm">
           <h1 className="text-xl md:text-2xl font-black text-emerald-600">ฝึกเขียนสระ</h1>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center items-center px-4 relative z-10 min-h-0 pt-2">
        <div className="relative h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden">
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

      <div className="w-full px-4 pb-6 pt-4 z-30 shrink-0 select-none">
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMenuMouseDown}
          onMouseLeave={handleMenuMouseLeave}
          onMouseUp={handleMenuMouseUp}
          onMouseMove={handleMenuMouseMove}
          className="max-w-[75rem] mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-3 border-2 border-white shadow-md flex overflow-x-auto gap-2 scrollbar-hide cursor-grab active:cursor-grabbing"
        >
          {vowels.map((item, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(item.time)}
              className="shrink-0 w-auto px-4 h-14 md:h-16 flex items-center justify-center bg-white text-emerald-600 font-bold text-xl md:text-2xl rounded-xl border-2 border-emerald-200 shadow-sm hover:bg-emerald-50 active:scale-90 transition-all pointer-events-auto min-w-[3.5rem]"
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

export default ThaiWriteVowelsPage;