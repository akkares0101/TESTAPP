import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LessonPage({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // State สำหรับควบคุม UI
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // รับข้อมูลวิดีโอ
  const { title, videoSrc } = location.state || { title: "กำลังโหลด...", videoSrc: "" };

  let hideTimeout = null;

  // --- Functions (เหมือนเดิม) ---
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500); // เพิ่มเวลาอีกนิดเป็น 3.5 วิ
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime += time;
      setShowControls(true);
    }
  };

  const replay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    return () => { if (hideTimeout) clearTimeout(hideTimeout); };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden group select-none font-sans"
    >
      
      {/* 1. วิดีโอ Player */}
      {videoSrc ? (
        <video 
          ref={videoRef}
          src={videoSrc} 
          className="w-full h-full object-contain"
          autoPlay 
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setIsPlaying(false); setShowControls(true); }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />
      ) : (
        <div className="flex flex-col items-center text-white/70 text-2xl animate-pulse">
          <span>⚠️</span>
          <span>ไม่พบไฟล์วิดีโอ</span>
        </div>
      )}

      {/* 2. Overlays (ปรับปรุงใหม่ให้ดูเนียนตา) */}
      {/* Gradient บน */}
      <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}></div>
      {/* Gradient ล่าง */}
      <div className={`absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}></div>
      {/* Radial Gradient ตรงกลางตอนหยุด */}
      {!isPlaying && <div className="absolute inset-0 bg-radial-gradient from-black/40 to-transparent pointer-events-none transition-opacity duration-500"></div>}


      {/* 3. Header: ปุ่มกลับ & ชื่อเรื่อง */}
      <div className={`absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center transition-all duration-500 z-20 ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        
        <button 
          onClick={() => navigate(-1)}
          className="
            glass-effect rounded-full px-6 py-3 flex items-center gap-3 
            text-white/90 hover:text-white hover:bg-orange-500/80 hover:border-orange-500/50
            transition-all duration-300 group/btn
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-xl font-bold hidden md:inline">ออก</span>
        </button>

        <h1 className="text-2xl md:text-4xl font-black text-white/95 drop-shadow-lg tracking-wider max-w-[60%] text-center truncate px-4">
          {title}
        </h1>

        <div className="w-[100px] hidden md:block"></div> {/* Spacer */}
      </div>

      {/* 4. Center Play Button (ดีไซน์ใหม่ ใหญ่และดูแพง) */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="
            absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-24 h-24 md:w-32 md:h-32 rounded-full
            backdrop-blur-xl bg-black/40 border-2 border-white/10
            text-orange-500 flex items-center justify-center pl-2
            hover:scale-110 hover:bg-black/50 hover:text-orange-400 hover:border-orange-500/30
            transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.3)]
            group/play
          "
        >
          {/* Ripple Effect วงๆ ด้านใน */}
          <div className="absolute inset-1 rounded-full border-2 border-orange-500/20 animate-ping opacity-70"></div>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-lg relative z-10">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* 5. Footer Controls (แถบควบคุมด้านล่าง - จัดวางใหม่) */}
      <div className={`absolute bottom-0 left-0 w-full px-6 pb-6 pt-10 md:px-12 md:pb-10 md:pt-14 transition-all duration-500 z-20 flex flex-col gap-6 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        
        {/* Progress Bar (หนาขึ้น + เรืองแสง) */}
        <div className="w-full h-3 md:h-4 bg-white/20 rounded-full cursor-pointer overflow-hidden relative group/progress">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full relative shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all duration-200"
            style={{ width: `${progress}%` }}
          >
             {/* หัวลูกศรเรืองแสง */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-0 group-hover/progress:scale-100 transition-transform"></div>
          </div>
        </div>

        {/* Control Buttons Container */}
        <div className="flex items-center justify-between px-4">
          
          {/* กลุ่มซ้าย: Skip Back & Replay */}
          <div className="flex items-center gap-4">
             <button onClick={() => skip(-10)} className="control-btn-round">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-bold hidden md:inline">-10s</span>
            </button>
            <button onClick={replay} className="control-btn-round">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          {/* กลุ่มกลาง: Play/Pause (ปุ่มหลักที่แถบล่าง) */}
          <button 
            onClick={togglePlay}
            className="
              w-16 h-16 md:w-20 md:h-20 rounded-full
              bg-white text-orange-500 flex items-center justify-center 
              hover:scale-105 hover:bg-orange-500 hover:text-white
              transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]
            "
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 fill-current">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 ml-1">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* กลุ่มขวา: Skip Fwd & Fullscreen */}
          <div className="flex items-center gap-4">
            <button onClick={() => skip(10)} className="control-btn-round">
              <span className="text-sm font-bold hidden md:inline">+10s</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* ปุ่มเต็มจอ (สีส้มเด่นๆ) */}
            <button onClick={toggleFullscreen} 
              className="control-btn-round !bg-orange-500/90 !text-white !border-orange-500/50 hover:!bg-orange-400 hover:scale-105 shadow-lg shadow-orange-500/20">
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
      </div>

      {/* CSS Class สำหรับปุ่มกลมๆ */}
      <style>{`
        .glass-effect {
          @apply backdrop-blur-lg bg-white/10 border border-white/20 shadow-sm;
        }
        .control-btn-round {
          @apply glass-effect w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white/80 transition-all duration-300 hover:scale-110 hover:text-white hover:bg-white/20 hover:border-white/40 gap-2;
        }
      `}</style>
    </div>
  );
}

export default LessonPage;