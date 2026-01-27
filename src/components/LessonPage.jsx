import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ฟังก์ชันแปลงเวลา
const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

function LessonPage({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

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
      // ✅ ปรับ Flex เป็น column เสมอ เพื่อให้ Playlist อยู่ล่าง
      className="fixed inset-0 w-full h-full bg-black flex flex-col overflow-hidden font-sans select-none"
    >
      {/* ================= 🎥 Video Area (อยู่ด้านบน กินพื้นที่ส่วนใหญ่) ================= */}
      <div className={`relative w-full flex-1 bg-black flex items-center justify-center`}>
        
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
            <div className="text-white text-xl">ไม่พบไฟล์วิดีโอ</div>
        )}

        {/* Overlay Controls */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`} />

        {/* Top Bar */}
        <div className={`absolute top-0 left-0 w-full p-4 flex items-center gap-4 z-20 transition-all ${showControls ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
            <button onClick={() => navigate(-1)} className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-orange-500 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <h1 className="text-white text-lg md:text-2xl font-bold truncate">{currentVideo.title || `บทเรียนที่ ${currentVideo.num || ''}`}</h1>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
            <button onClick={togglePlay} className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-orange-500/80 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
            </button>
        )}

        {/* Bottom Controls (Progress bar) */}
        <div className={`absolute bottom-0 left-0 w-full px-4 pb-2 z-20 transition-all ${showControls ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="w-full h-2 bg-white/30 rounded-lg cursor-pointer accent-orange-500 mb-2" />
            <div className="flex justify-between text-white text-sm md:text-base">
                <div className="flex gap-4">
                    <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <button onClick={toggleFullscreen}>⛶ เต็มจอ</button>
            </div>
        </div>
      </div>

      {/* ================= 🔢 Playlist Bottom Bar (แนวนอน) ================= */}
      {hasPlaylist && (
        <div className={`
            w-full bg-gray-900 border-t border-white/10 z-30
            h-auto max-h-[160px] py-3 flex flex-col justify-center
        `}>
            {/* Header เล็กๆ บอกให้รู้ว่าเลือกได้ */}
            <div className="text-center text-gray-400 text-xs mb-2">เลือกบทเรียน</div>

            <div className="flex overflow-x-auto px-4 gap-3 no-scrollbar items-center pb-2">
                {playlist.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            flex flex-col items-center justify-center flex-shrink-0
                            w-20 h-20 md:w-24 md:h-24 rounded-2xl transition-all duration-200 border-2
                            ${currentIndex === index 
                                ? 'bg-orange-500 text-white border-orange-300 scale-105 shadow-lg' 
                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                    >
                        {/* ตัวเลขใหญ่ๆ */}
                        <span className="text-3xl md:text-4xl font-black mb-1">{item.num}</span>
                        {/* ข้อความเล็กๆ */}
                        <span className="text-[10px] md:text-xs font-bold opacity-80 truncate w-[90%] text-center">
                            {item.title ? item.title.replace("ฝึกนับเลข ", "").replace("Number ", "") : "บทเรียน"}
                        </span>
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Custom CSS ซ่อน Scrollbar แต่ยังเลื่อนได้ */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default LessonPage;