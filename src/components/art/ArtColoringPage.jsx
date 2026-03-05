import React, { useRef, useEffect, useState } from 'react';
import bgImage from '../../assets/images/bg.png';

function ArtColoringPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // ⭐ State สำหรับควบคุมแถบเวลาวิดีโอ
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const isDrawing = useRef(false);
  const [currentColor, setCurrentColor] = useState('#ef4444');
  const [currentSize, setCurrentSize] = useState(18);
  const [isEraser, setIsEraser] = useState(false); // ⭐ State สำหรับยางลบ

  const mainVideo = "/videos/art/coloring.mp4";

  // ⭐ สี 12 สี เพื่อความหลากหลาย
  const colors = [
    { id: 'red', hex: '#ef4444', bg: 'bg-red-500' },
    { id: 'orange', hex: '#f97316', bg: 'bg-orange-500' },
    { id: 'yellow', hex: '#eab308', bg: 'bg-yellow-400' },
    { id: 'lime', hex: '#84cc16', bg: 'bg-lime-500' },
    { id: 'green', hex: '#22c55e', bg: 'bg-green-500' },
    { id: 'teal', hex: '#14b8a6', bg: 'bg-teal-500' },
    { id: 'sky', hex: '#0ea5e9', bg: 'bg-sky-500' },
    { id: 'blue', hex: '#3b82f6', bg: 'bg-blue-500' },
    { id: 'purple', hex: '#a855f7', bg: 'bg-purple-500' },
    { id: 'pink', hex: '#ec4899', bg: 'bg-pink-400' },
    { id: 'brown', hex: '#8b5cf6', bg: 'bg-violet-500' },
    { id: 'black', hex: '#1e293b', bg: 'bg-slate-800' },
  ];

  const brushSizes = [
    { id: 'small', size: 8, label: 'เล็ก', icon: 'w-3 h-3' },
    { id: 'medium', size: 18, label: 'กลาง', icon: 'w-5 h-5' },
    { id: 'large', size: 30, label: 'ใหญ่', icon: 'w-7 h-7' },
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

  // ⭐ ฟังก์ชันจัดการวิดีโอและการเลื่อนเวลา
  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

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
    ctx.lineWidth = currentSize;

    // ⭐ ระบบยางลบ
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }

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

  const selectColor = (hex) => {
    setCurrentColor(hex);
    setIsEraser(false); 
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

      {/* 2. Video Player & Slider Area (จัดกึ่งกลางและสัดส่วนคงเดิม) */}
      <div className="w-full h-[55vh] md:h-[65vh] flex flex-col justify-center items-center z-10 px-4 min-h-0">
        <div className="relative w-full max-w-5xl flex-1 bg-black rounded-[2.5rem] border-[8px] md:border-[10px] border-white shadow-2xl overflow-hidden min-h-0">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain pointer-events-none"
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}   
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}     
                onLoadedMetadata={handleLoadedMetadata} 
            />
            {/* กระดานวาดภาพ */}
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full touch-none z-20 ${isEraser ? 'cursor-cell' : 'cursor-crosshair'}`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={() => isDrawing.current = false}
                onMouseLeave={() => isDrawing.current = false}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={() => isDrawing.current = false}
            />
        </div>

        {/* แถบเลื่อนเวลาวิดีโอ */}
        <div className="w-full max-w-5xl mt-2 md:mt-3 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-3 shadow-md border-2 border-white/50 shrink-0">
          <span className="text-violet-700 font-bold text-sm w-10 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <span className="text-violet-700 font-bold text-sm w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. แผงควบคุม (จานสี + ขนาดเส้น + ยางลบ + ปุ่ม Action) */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pt-1 pb-4 z-20 shrink-0">
        
        <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-center w-full max-w-5xl justify-center mb-3">
          
          {/* เลือกขนาดเส้น + ยางลบ */}
          <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/50 shadow-md flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700 hidden md:block">เครื่องมือ:</span>
            {brushSizes.map((brush) => (
              <button
                key={brush.id}
                onClick={() => setCurrentSize(brush.size)}
                className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all ${
                  currentSize === brush.size ? 'bg-white shadow-md scale-110 ring-2 ring-violet-400' : 'hover:bg-white/50'
                }`}
              >
                <div className={`${brush.icon} rounded-full transition-colors`} style={{ backgroundColor: isEraser ? '#94a3b8' : currentColor }}></div>
              </button>
            ))}

            <div className="w-px h-6 bg-gray-400/50 mx-1"></div>

            <button
              onClick={() => setIsEraser(true)}
              className={`flex items-center justify-center px-3 h-8 md:h-10 rounded-full font-bold text-sm transition-all ${
                isEraser ? 'bg-rose-500 text-white shadow-md scale-105 ring-2 ring-rose-300' : 'bg-white text-gray-600 hover:bg-rose-100'
              }`}
            >
              🧼 ยางลบ
            </button>
          </div>

          {/* จานสี 12 สี */}
          <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/50 shadow-md flex justify-center">
            <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center items-center">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => selectColor(color.hex)}
                  className={`
                    w-7 h-7 md:w-9 md:h-9 rounded-full ${color.bg} border-[3px] shadow-sm transition-all
                    ${!isEraser && currentColor === color.hex ? 'border-white scale-125 ring-2 ring-violet-400 z-10' : 'border-white/70 hover:scale-110'}
                  `}
                ></button>
              ))}
            </div>
          </div>

        </div>

        {/* ปุ่มควบคุม */}
        <div className="flex gap-4">
          <button onClick={togglePlay} className={`min-w-[130px] md:min-w-[170px] py-2 rounded-2xl text-base md:text-xl font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none transition-all ${isPlaying ? 'bg-amber-500' : 'bg-emerald-500'}`}>
            {isPlaying ? '⏸ หยุดวิดีโอ' : '▶ เล่นต่อ'}
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