import React, { useRef, useEffect, useState } from 'react';
import bgImage from '../../assets/images/bg.png';

function ArtColoringPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const isDrawing = useRef(false);
  const [currentColor, setCurrentColor] = useState('#ef4444');

  const mainVideo = "/videos/art/coloring.mp4";

  const colors = [
    { id: 'red', hex: '#ef4444', bg: 'bg-red-500' },
    { id: 'orange', hex: '#f97316', bg: 'bg-orange-500' },
    { id: 'yellow', hex: '#eab308', bg: 'bg-yellow-400' },
    { id: 'green', hex: '#22c55e', bg: 'bg-green-500' },
    { id: 'sky', hex: '#0ea5e9', bg: 'bg-sky-500' },
    { id: 'blue', hex: '#3b82f6', bg: 'bg-blue-500' },
    { id: 'purple', hex: '#a855f7', bg: 'bg-purple-500' },
    { id: 'pink', hex: '#ec4899', bg: 'bg-pink-400' },
    { id: 'white', hex: '#ffffff', bg: 'bg-white' },
  ];

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => { if (onVideoStateChange) onVideoStateChange(false); };
  }, [onVideoStateChange]);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.volume = 0.5;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

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

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 18;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden py-2"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%' }}
    >
      <style>{` ::-webkit-scrollbar { display: none; } * { -ms-overflow-style: none; scrollbar-width: none; } `}</style>
      
      {/* 1. Header */}
      <div className="w-full px-4 flex justify-center items-center z-20 shrink-0 mb-1">
        <div className="px-6 py-1 rounded-full border-[3px] border-violet-300 bg-white/95 shadow-md">
           <h1 className="text-lg md:text-xl font-black text-violet-600">🖍️ ฝึกระบายสีตามจินตนาการ</h1>
        </div>
      </div>

      {/* 2. Video Player & Canvas Area - เคลียร์หน้าจอ 100% */}
      <div className="w-full h-[55vh] md:h-[65vh] flex justify-center items-center z-10 px-4 min-h-0">
        <div className="relative w-full max-w-5xl h-full bg-black rounded-[2.5rem] border-[8px] md:border-[10px] border-white shadow-2xl overflow-hidden">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain pointer-events-none"
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}   
                onPause={() => setIsPlaying(false)} 
            />
            {/* กระดานวาดภาพ */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full touch-none cursor-crosshair z-20"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={() => isDrawing.current = false}
                onMouseLeave={() => isDrawing.current = false}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={() => isDrawing.current = false}
            />
            {/* ⭐ นำส่วน Overlay ที่เคยบังจอออกเรียบร้อยแล้วครับ ⭐ */}
        </div>
      </div>

      {/* 3. แผงควบคุม (จานสี + ปุ่ม Action) */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pt-2 pb-4 z-20 shrink-0">
        
        {/* จานสี */}
        <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-[2rem] border-2 border-white/50 shadow-md mb-3 w-full max-w-2xl flex justify-center">
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setCurrentColor(color.hex)}
                className={`
                  w-9 h-9 md:w-11 md:h-11 rounded-full ${color.bg} border-[3px] shadow-sm transition-all
                  ${currentColor === color.hex ? 'border-white scale-110 ring-2 ring-violet-400 -translate-y-1' : 'border-white/70'}
                `}
              ></button>
            ))}
          </div>
        </div>

        {/* ปุ่มควบคุม */}
        <div className="flex gap-4">
          <button onClick={togglePlay} className={`min-w-[130px] md:min-w-[170px] py-2 rounded-2xl text-base md:text-xl font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none transition-all ${isPlaying ? 'bg-amber-500' : 'bg-emerald-500'}`}>
            {isPlaying ? '⏸️ หยุดวิดีโอ' : '▶️ เล่นต่อ'}
          </button>
          <button onClick={clearCanvas} className="min-w-[130px] md:min-w-[170px] py-2 rounded-2xl text-base md:text-xl font-black text-white bg-rose-500 shadow-[0_4px_0_#9f1239] active:translate-y-[4px] active:shadow-none transition-all">
            🧹 ลบทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtColoringPage;