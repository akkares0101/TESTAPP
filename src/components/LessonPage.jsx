import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ฟังก์ชันแปลงวินาทีเป็นนาที:วินาที (เช่น 75s -> "01:15")
const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

function LessonPage({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // --- State ---
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // รับข้อมูลวิดีโอ (ถ้าไม่มีให้กัน Error ไว้)
  const { title, videoSrc } = location.state || {
    title: "ไม่พบชื่อวิดีโอ",
    videoSrc: "",
  };

  // --- Handlers ---

  // 1. ควบคุมการโชว์/ซ่อน ปุ่มต่างๆ
  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    // ถ้าเล่นอยู่ ให้ซ่อนปุ่มอัตโนมัติใน 3 วินาที
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    handleUserActivity();
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying]); // ทำงานทุกครั้งที่กด Play/Pause

  // 2. Play / Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // 3. Update Progress Bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // 4. ลาก Progress Bar (Seek)
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // 5. ข้ามเวลา (Skip)
  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      handleUserActivity();
    }
  };

  // 6. Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* ================= 🎥 Video Player ================= */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          autoPlay
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
          onClick={togglePlay} // คลิกที่วิดีโอเพื่อหยุด/เล่น
        />
      ) : (
        <div className="text-white/60 text-xl flex flex-col items-center gap-2">
          <span className="text-4xl">⚠️</span>
          <span>ไม่พบไฟล์วิดีโอ</span>
          <button onClick={() => navigate(-1)} className="text-orange-500 underline mt-4">กลับหน้าเดิม</button>
        </div>
      )}

      {/* ================= 🌑 Overlay Layer (Gradient) ================= */}
      {/* เงาดำๆ บนและล่าง จะโชว์เฉพาะตอนเอาเมาส์ขยับ */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ================= 🔝 Top Bar (Back & Title) ================= */}
      <div
        className={`absolute top-0 left-0 w-full p-6 flex items-center gap-4 transition-all duration-300 z-20 ${
          showControls ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-white text-xl md:text-2xl font-bold drop-shadow-md truncate max-w-[80%]">
          {title}
        </h1>
      </div>

      {/* ================= ▶️ Center Play Button (Big) ================= */}
      {/* ปุ่ม Play ใหญ่ตรงกลาง จะโชว์ตอน Pause หรือจบวิดีโอ */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
        >
          <div className="w-20 h-20 md:w-28 md:h-28 bg-black/40 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-orange-500/90 hover:border-orange-500 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14 ml-1">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      )}

      {/* ================= 🎮 Bottom Controls ================= */}
      <div
        className={`absolute bottom-0 left-0 w-full px-4 pb-6 md:px-8 md:pb-8 transition-all duration-300 z-20 ${
          showControls ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* 1. Progress Slider (Input Range) */}
        <div className="flex items-center gap-3 mb-2 group/slider">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:h-3 transition-all"
            style={{
                background: `linear-gradient(to right, #f97316 ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.3) ${(currentTime / duration) * 100}%)`
            }}
          />
        </div>

        {/* 2. Control Buttons Row */}
        <div className="flex items-center justify-between">
          
          {/* Left: Play/Pause & Time & Skip */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={togglePlay} className="text-white hover:text-orange-500 transition-colors">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* ปุ่มข้ามเวลา 10 วิ */}
            <div className="flex items-center gap-2">
                <button onClick={() => skip(-10)} className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.87l3.195 1.841c1.25.72 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.348-2.805-1.628L12 8.902V7.189c0-1.44-1.555-2.348-2.805-1.628L2.05 10.143C.72 10.907.72 12.83 2.05 13.594l7.145 4.846z" />
                    </svg>
                </button>
                <button onClick={() => skip(10)} className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.349 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.349 2.805 1.628l7.108-4.161c1.272-.743 1.272-2.587 0-3.33L14.805 6.787c-1.25-.72-2.805.188-2.805 1.628v2.87L5.055 7.06z" />
                    </svg>
                </button>
            </div>

            {/* เวลา 00:00 / 05:00 */}
            <span className="text-white text-sm md:text-base font-medium tracking-wide opacity-90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Fullscreen */}
          <button onClick={toggleFullscreen} className="text-white hover:text-orange-500 hover:scale-110 transition-all">
            {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
            )}
          </button>
        </div>
      </div>

      {/* CSS สำหรับ Slider ให้เป็นสีส้มครึ่งนึง ขาวครึ่งนึงตามเวลา */}
      <style>{`
        input[type=range] {
          -webkit-appearance: none; 
          cursor: pointer;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          margin-top: -6px; /* จัดกึ่งกลาง */
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: #f97316; /* สีส้ม */
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}

export default LessonPage;