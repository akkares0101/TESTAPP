import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bg.png"; 

function LessonPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null); // ใช้สำหรับ Fullscreen
  const playlistRef = useRef(null);

  // รับข้อมูล
  const { title, videoSrc, playlist, initialIndex = 0 } = location.state || {};

  // State
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false); // เช็คสถานะเต็มจอ
  
  // ข้อมูลคลิปปัจจุบัน
  const currentVideo = playlist ? playlist[currentIndex] : { title, videoSrc };
  const hasPlaylist = playlist && playlist.length > 0;

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // 📺 โหลดวิดีโอใหม่
  useEffect(() => {
    setIsPlaying(true);
    if(videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
    }
    // Auto Scroll
    if (playlistRef.current && hasPlaylist) {
        const activeBtn = playlistRef.current.children[currentIndex];
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [currentIndex, hasPlaylist]);

  // ▶️ Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // ⛶ Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        // เข้าโหมดเต็มจอ
        if (containerRef.current.requestFullscreen) {
            containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) { // Safari
            containerRef.current.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
    } else {
        // ออกจากโหมดเต็มจอ
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
    }
  };

  // ดักจับ event เมื่อ user กด ESC ออกจาก fullscreen เอง
  useEffect(() => {
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // ⏩ Next / Prev
  const nextVideo = () => {
    if (currentIndex < playlist.length - 1) setCurrentIndex(prev => prev + 1);
  };
  const prevVideo = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  if (!currentVideo || (!currentVideo.videoSrc && !currentVideo.video)) {
      return <div className="flex items-center justify-center h-screen font-bold text-2xl text-gray-500">Video not found 😢</div>;
  }

  return (
    <div 
        className={`fixed inset-0 w-full h-full flex flex-col font-sans select-none overflow-hidden ${isFullscreen ? 'bg-black' : 'bg-[#E0F7FA]'}`}
    >
      
      {/* 🖼️ Background (ซ่อนตอน Fullscreen) */}
      {!isFullscreen && (
        <div 
            className="absolute inset-0 z-0 opacity-50"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}

      {/* ================= 🟢 ส่วนบน: ปุ่มย้อนกลับ & ชื่อตอน (ซ่อนตอน Fullscreen) ================= */}
      {!isFullscreen && (
        <div className="relative z-20 w-full px-4 pt-3 pb-1 flex items-center justify-between shrink-0">
            {/* ปุ่ม Back */}
            <button 
                onClick={() => navigate(-1)} 
                className="group bg-white border-[3px] border-orange-300 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
                <span className="text-2xl group-hover:-translate-x-1 transition-transform">⬅️</span>
            </button>

            {/* ป้ายชื่อตอน */}
            <div className="bg-white/90 border-[3px] border-blue-300 px-6 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                <span className="text-2xl">📺</span>
                <h1 className="text-lg md:text-2xl font-black text-blue-500 truncate max-w-[180px] md:max-w-md">
                    {currentVideo.num ? `หมายเลข ${currentVideo.num}` : (currentVideo.title || "Lesson")}
                </h1>
            </div>

            <div className="w-12"></div>
        </div>
      )}

      {/* ================= 📺 ส่วนกลาง: จอทีวี (Video) ================= */}
      <div 
        ref={containerRef} // ✅ ใส่ ref ตรงนี้เพื่อขยายส่วนนี้เต็มจอ
        className={`relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 ${isFullscreen ? 'bg-black w-full h-full' : 'p-2'}`}
      >
         
         <div className={`relative flex flex-col items-center justify-center ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl h-full'}`}>
            
            {/* กรอบทีวี (ถ้า Fullscreen ให้เอาขอบออก) */}
            <div className={`
                relative w-full overflow-hidden group
                ${isFullscreen 
                    ? 'h-full flex items-center justify-center bg-black' 
                    : 'aspect-video bg-black rounded-[2rem] border-[8px] md:border-[10px] border-yellow-400 shadow-[0_10px_0_#d97706]'
                }
            `}>
                
                <video
                    ref={videoRef}
                    src={currentVideo.videoSrc || currentVideo.video}
                    className={`object-contain bg-black ${isFullscreen ? 'w-full h-full' : 'w-full h-full'}`}
                    autoPlay
                    muted={isMuted}
                    onEnded={() => setIsPlaying(false)}
                    onClick={togglePlay}
                    playsInline
                />

                {/* ปุ่ม Play Overlay */}
                <div 
                    onClick={togglePlay}
                    className={`
                        absolute inset-0 flex items-center justify-center bg-black/20 
                        transition-opacity duration-300 cursor-pointer
                        ${!isPlaying ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    {!isPlaying && (
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-red-500 rounded-full border-[5px] border-white flex items-center justify-center shadow-lg animate-bounce">
                            <svg className="w-10 h-10 md:w-14 md:h-14 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    )}
                </div>

                {/* ✅ ปุ่ม Fullscreen (มุมขวาล่าง) */}
                <button 
                    onClick={toggleFullscreen}
                    className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                    {isFullscreen ? (
                         // ไอคอนย่อจอ
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                         </svg>
                    ) : (
                        // ไอคอนขยายจอ
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ปุ่มเปลี่ยนตอน (อยู่นอกทีวี / ซ่อนตอน Fullscreen) */}
            {hasPlaylist && !isFullscreen && (
                <>
                    <button 
                        onClick={prevVideo}
                        disabled={currentIndex === 0}
                        className={`
                            absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 
                            w-12 h-12 md:w-16 md:h-16 bg-white border-[3px] border-gray-300 rounded-full 
                            flex items-center justify-center shadow-md transition-all
                            ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'active:scale-90 hover:bg-gray-100'}
                        `}
                    >
                        <span className="text-2xl md:text-4xl text-gray-500">◀</span>
                    </button>

                    <button 
                        onClick={nextVideo}
                        disabled={currentIndex === playlist.length - 1}
                        className={`
                            absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 
                            w-12 h-12 md:w-16 md:h-16 bg-white border-[3px] border-green-400 rounded-full 
                            flex items-center justify-center shadow-md transition-all
                            ${currentIndex === playlist.length - 1 ? 'opacity-0 pointer-events-none' : 'active:scale-90 hover:bg-green-50'}
                        `}
                    >
                        <span className="text-2xl md:text-4xl text-green-500">▶</span>
                    </button>
                </>
            )}
         </div>
      </div>

      {/* ================= 🔢 ส่วนล่าง: เมนูเลือกตอน (ซ่อนตอน Fullscreen) ================= */}
      {hasPlaylist && !isFullscreen && (
        <div className="relative z-20 shrink-0 pb-4 pt-2 w-full flex justify-center">
            
            {/* Container จัดกลาง */}
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-[2rem] border-[3px] border-blue-200 shadow-sm max-w-3xl w-full mx-4">
                
                <div className="text-center mb-1">
                    <span className="text-blue-500 text-xs font-bold tracking-wider">
                        เลือกตอน
                    </span>
                </div>

                <div className="flex justify-center">
                    <div 
                        ref={playlistRef}
                        className="flex overflow-x-auto gap-3 pb-2 no-scrollbar snap-x max-w-full px-2"
                    >
                        {playlist.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`
                                    snap-center shrink-0 flex flex-col items-center justify-center
                                    w-12 h-16 md:w-14 md:h-20
                                    rounded-xl border-[3px] shadow-sm transition-all duration-200
                                    ${currentIndex === index 
                                        ? 'bg-orange-400 border-orange-200 scale-110 -translate-y-1 shadow-md z-10' 
                                        : 'bg-white border-gray-200 hover:border-orange-300 opacity-80 hover:opacity-100'
                                    }
                                `}
                            >
                                <span className={`text-2xl md:text-3xl font-black ${currentIndex === index ? 'text-white' : 'text-gray-400'}`}>
                                    {item.num}
                                </span>
                                
                                {/* จุด Active เล็กๆ */}
                                {currentIndex === index && (
                                    <div className="mt-0.5 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ซ่อน Scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default LessonPage;