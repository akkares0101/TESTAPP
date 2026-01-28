import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bg.png"; 

// ฟังก์ชันแปลงเวลา
const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// ✅ รับ prop onVideoStateChange เข้ามาด้วย
function LessonPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // ✅ เพิ่ม useEffect เพื่อแจ้ง App ว่ากำลังเปิดวิดีโอ
  useEffect(() => {
    // เมื่อเข้ามาหน้านี้ -> บอก App ให้หยุดเพลงพื้นหลัง
    if (onVideoStateChange) {
      onVideoStateChange(true);
    }

    return () => {
      // เมื่อออกจากหน้านี้ (ย้อนกลับ) -> บอก App ให้เล่นเพลงต่อ
      if (onVideoStateChange) {
        onVideoStateChange(false);
      }
    };
  }, [onVideoStateChange]);

  // รับข้อมูล
  const { title, videoSrc, playlist, initialIndex = 0 } = location.state || {};
  
  // State
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ข้อมูลคลิปปัจจุบัน
  const currentVideo = playlist ? playlist[currentIndex] : { title, videoSrc };
  const hasPlaylist = playlist && playlist.length > 0;

  // รีเซ็ตเมื่อเปลี่ยนคลิป
  useEffect(() => {
    setIsPlaying(true);
    setCurrentTime(0);
    if(videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(()=>{});
    }
  }, [currentIndex]);

  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => {
    handleUserActivity();
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
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
      className={`
        fixed inset-0 w-full h-full flex flex-col overflow-hidden font-sans select-none
        ${isFullscreen ? 'bg-black' : 'bg-sky-100'} 
      `}
      style={!isFullscreen ? { 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      } : {}}
    >
      
      {/* ================= 🎥 Video Area ================= */}
      <div className={`
        relative w-full flex-1 flex items-center justify-center transition-all duration-300
        ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}
      `}>
        
        {/* กรอบทีวี */}
        <div className={`
            relative w-full h-full flex items-center justify-center overflow-hidden
            ${isFullscreen ? '' : 'rounded-[2rem] border-[8px] border-orange-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-black'}
        `}>
            
            {currentVideo.videoSrc ? (
                <video
                ref={videoRef}
                src={currentVideo.videoSrc || currentVideo.video}
                className="w-full h-full object-contain" 
                autoPlay
                muted={isMuted}
                onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                />
            ) : (
                <div className="text-white text-2xl font-bold animate-pulse">กำลังโหลดวิดีโอ... ⏳</div>
            )}

            {/* Overlay Controls */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`} />

            {/* --- ปุ่มย้อนกลับ & ชื่อเรื่อง --- */}
            <div className={`absolute top-0 left-0 w-full p-4 flex items-center gap-4 z-20 transition-all ${showControls ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-white text-orange-500 p-2 md:p-3 rounded-full shadow-lg border-4 border-orange-200 hover:scale-110 active:scale-90 transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                
                <div className="bg-white/90 backdrop-blur px-6 py-2 rounded-2xl border-2 border-orange-200 shadow-md">
                    <h1 className="text-orange-600 text-lg md:text-2xl font-black truncate max-w-[200px] md:max-w-md">
                        {currentVideo.title || `บทเรียนที่ ${currentVideo.num || ''}`}
                    </h1>
                </div>
            </div>

            {/* --- ปุ่ม Play --- */}
            {!isPlaying && (
                <button onClick={togglePlay} className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-white ml-2">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
            )}

            {/* --- แถบควบคุมด้านล่าง --- */}
            <div className={`absolute bottom-0 left-0 w-full px-4 pb-4 z-20 transition-all ${showControls ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <div className="relative w-full h-4 mb-3 group">
                    <input 
                        type="range" 
                        min="0" max={duration || 100} 
                        value={currentTime} 
                        onChange={handleSeek} 
                        className="w-full h-3 md:h-4 bg-white/50 rounded-full cursor-pointer appearance-none focus:outline-none accent-orange-500" 
                    />
                </div>

                <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="hover:text-orange-300 transition-colors">
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            )}
                        </button>
                        <span className="font-bold text-lg md:text-xl drop-shadow-md font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>
                    
                    <button onClick={toggleFullscreen} className="hover:text-orange-300 transition-colors bg-white/20 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* ================= 🔢 Playlist Bottom Bar ================= */}
      {hasPlaylist && (
        <div className={`
            w-full z-30 transition-all duration-300
            ${isFullscreen ? 'h-0 opacity-0 overflow-hidden' : 'h-auto py-3 bg-white/80 backdrop-blur-md border-t-[6px] border-orange-200'}
        `}>
            <div className="text-center text-orange-400 font-bold text-sm mb-2 uppercase tracking-wide">
                ✨ เลือกดูตอนอื่น ๆ ✨
            </div>

            <div className="flex overflow-x-auto px-4 gap-4 no-scrollbar items-center pb-2">
                {playlist.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            group flex flex-col items-center justify-center flex-shrink-0
                            w-20 h-20 md:w-28 md:h-28 rounded-2xl transition-all duration-300 border-[3px]
                            ${currentIndex === index 
                                ? 'bg-orange-500 text-white border-orange-300 scale-110 shadow-[0_8px_15px_rgba(249,115,22,0.4)]' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 hover:-translate-y-1'
                            }
                        `}
                    >
                        <span className={`text-3xl md:text-5xl font-black mb-1 ${currentIndex === index ? 'drop-shadow-md' : ''}`}>
                            {item.num}
                        </span>
                        
                        <span className="text-[10px] md:text-xs font-bold opacity-90 truncate w-[90%] text-center">
                            {item.title ? item.title.replace("ฝึกนับเลข ", "").replace("Number ", "").replace("ฝึกอ่าน: ", "") : "บทเรียน"}
                        </span>

                        {currentIndex === index && (
                             <div className="absolute top-2 right-2 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-ping"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default LessonPage;