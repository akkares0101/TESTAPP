import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function AlphabetLearningPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // State สำหรับระบบวาดเขียน
  const isDrawing = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  const colorThemes = [
    { bg: "bg-rose-400", border: "border-rose-500" },
    { bg: "bg-sky-400", border: "border-sky-500" },
    { bg: "bg-green-400", border: "border-green-500" },
    { bg: "bg-yellow-400", border: "border-yellow-500" },
    { bg: "bg-purple-400", border: "border-purple-500" },
  ];

  const [selectedLetter, setSelectedLetter] = useState('A');
  const [isUpperCase, setIsUpperCase] = useState(true);
  const [viewMode, setViewMode] = useState('standard');

  const getVideoSrc = (char) => {
    if (viewMode === 'writing_upper') {
        return `/videos/writing/${char}.mp4`; 
    } else if (viewMode === 'writing_lower') {
        return `/videos/writing/${char.toLowerCase()}_small.mp4`;
    } else if (isUpperCase) {
      return `/videos/alphabet/${char}.mp4`;
    } else {
      return `/videos/alphabet/${char.toLowerCase()}_small.mp4`;
    }
  };

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
      setIsPaused(false);
      clearCanvas(); 
    }
  }, [selectedLetter, isUpperCase, viewMode]);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const handleLetterChange = (char) => {
      playClick();
      setSelectedLetter(char);
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
    ctx.strokeStyle = '#3b82f6'; 
    ctx.lineWidth = 14;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
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
    playClick();
    const canvas = canvasRef.current;
    if(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center overflow-hidden relative"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. Header (จัดกึ่งกลาง ลบปุ่มกลับออก และทำให้กะทัดรัดขึ้น) */}
      <div className="w-full max-w-5xl px-4 py-2 flex justify-center items-center z-10 shrink-0">
        <div className="flex justify-center items-center px-6 py-1 rounded-[1.5rem] shadow-lg border-[3px] border-white bg-blue-400">
           <h1 className="text-lg md:text-xl font-black text-white tracking-wider flex items-center gap-2">
             <div className="bg-white/20 px-3 py-0.5 rounded-lg min-w-[2.5rem] text-center">
                <span className="text-2xl md:text-4xl drop-shadow-md">
                    {viewMode === 'writing_lower' || (!isUpperCase && viewMode === 'standard') 
                        ? selectedLetter.toLowerCase() 
                        : selectedLetter}
                </span>
             </div>
           </h1>
        </div>
      </div>

      {/* 2. Video Player & Canvas - ⭐ ขยายจอใหญ่สุด (ให้กินพื้นที่ที่เหลือ flex-1) */}
      <div className="w-full max-w-5xl px-2 md:px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10">
        <div className="w-full h-full max-h-[70vh] md:max-h-[75vh] bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-blue-200 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col">
          <video 
            ref={videoRef}
            className="w-full h-full object-contain bg-black pointer-events-none"
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            playsInline
            muted={isMuted}
          >
            <source src={getVideoSrc(selectedLetter)} type="video/mp4" />
          </video>
          
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
      <div className="w-full flex justify-center gap-3 px-4 pt-2 pb-1 z-30 shrink-0">
        <button 
          onClick={togglePlay} 
          className={`
            min-w-[120px] md:min-w-[150px] py-1.5 md:py-2.5 rounded-2xl font-black text-lg md:text-xl transition-all shadow-md active:translate-y-1 active:shadow-none
            ${isPaused ? "bg-emerald-500 text-white border-b-[6px] border-emerald-700" : "bg-amber-500 text-white border-b-[6px] border-amber-700"}
          `}
        >
          {isPaused ? "เล่นต่อ" : "หยุดเขียน"}
        </button>
        <button 
          onClick={clearCanvas} 
          className="min-w-[120px] md:min-w-[150px] bg-rose-500 text-white py-1.5 md:py-2.5 rounded-2xl font-black text-lg md:text-xl border-b-[6px] border-rose-700 shadow-md active:translate-y-1 active:shadow-none transition-all"
        >
          ลบที่เขียน
        </button>
      </div>

      {/* 4. แผงเมนูโหมด & ตัวอักษร (⭐ บีบความสูงลงเพื่อคืนพื้นที่ให้จอวิดีโอ) */}
      <div className="w-full max-w-5xl shrink-0 bg-white/70 backdrop-blur-xl rounded-t-[2rem] border-t-4 border-white/80 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col z-10 pt-2 pb-4 md:pb-6">
        
        {/* แผงปุ่มโหมด */}
        <div className="flex flex-wrap justify-center gap-2 py-1 px-2 border-b border-white/50 shrink-0">
            <button 
                onClick={() => { playClick(); setIsUpperCase(true); setViewMode('standard'); }}
                className={`px-3 py-1 rounded-full font-bold text-xs md:text-sm transition-all shadow-sm border-2 ${isUpperCase && viewMode === 'standard' ? 'bg-blue-500 text-white border-blue-600 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
                ABC พิมพ์ใหญ่
            </button>
            <button 
                onClick={() => { playClick(); setIsUpperCase(false); setViewMode('standard'); }}
                className={`px-3 py-1 rounded-full font-bold text-xs md:text-sm transition-all shadow-sm border-2 ${!isUpperCase && viewMode === 'standard' ? 'bg-pink-500 text-white border-pink-600 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
                abc พิมพ์เล็ก
            </button>
            <button 
                onClick={() => { playClick(); setViewMode('writing_upper'); }}
                className={`px-3 py-1 rounded-full font-bold text-xs md:text-sm transition-all shadow-sm border-2 ${viewMode === 'writing_upper' ? 'bg-orange-500 text-white border-orange-600 scale-105' : 'bg-white text-orange-500 border-orange-200 hover:bg-orange-50'}`}
            >
                วิธีเขียน (ใหญ่)
            </button>
            <button 
                onClick={() => { playClick(); setViewMode('writing_lower'); }}
                className={`px-3 py-1 rounded-full font-bold text-xs md:text-sm transition-all shadow-sm border-2 ${viewMode === 'writing_lower' ? 'bg-purple-500 text-white border-purple-600 scale-105' : 'bg-white text-purple-500 border-purple-200 hover:bg-purple-50'}`}
            >
                วิธีเขียน (เล็ก)
            </button>
        </div>

        {/* ตารางตัวอักษร */}
        <div className="w-full overflow-y-auto p-2 scrollbar-hide max-h-[16vh] md:max-h-[20vh]">
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {letters.map((char, index) => {
              const theme = colorThemes[index % colorThemes.length];
              const displayChar = isUpperCase ? char : char.toLowerCase();

              return (
                <button
                  key={char}
                  onClick={() => handleLetterChange(char)} 
                  className={`
                    w-9 h-9 md:w-11 md:h-11 rounded-lg text-lg md:text-xl font-black text-white shadow-sm transition-all duration-150
                    flex items-center justify-center shrink-0
                    ${theme.bg} border-b-2 border-r ${theme.border}
                    ${selectedLetter === char ? 'translate-y-0.5 border-b-0 brightness-110 ring-2 ring-white scale-110' : 'hover:-translate-y-0.5'}
                  `}
                >
                  {displayChar}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlphabetLearningPage;