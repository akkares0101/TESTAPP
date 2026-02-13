import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bg.png"; 

function LessonPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Refs
  const videoRef = useRef(null);
  const playlistRef = useRef(null);

  // รับข้อมูล
  const { title, videoSrc, playlist, initialIndex = 0 } = location.state || {};

  // State
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  
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
    <div className="fixed inset-0 w-full h-full flex flex-col font-sans select-none overflow-hidden bg-[#E0F7FA]">
      
      {/* 🖼️ Background */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* ================= 📺 ส่วนกลาง: จอทีวี (Video) ================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 min-h-0">
         
         <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center">
            {/* กรอบทีวี */}
            <div className="relative w-full aspect-video bg-black rounded-[2rem] border-[8px] md:border-[10px] border-yellow-400 shadow-[0_10px_0_#d97706] overflow-hidden group">
                
                <video
                    ref={videoRef}
                    src={currentVideo.videoSrc || currentVideo.video}
                    className="w-full h-full object-contain bg-black" 
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
            </div>

            {/* ปุ่มเปลี่ยนตอน (อยู่นอกทีวี) */}
            {hasPlaylist && (
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

      {/* ================= 🔢 ส่วนล่าง: เมนูเลือกตอน (เล็กลง + ตรงกลาง) ================= */}
      {hasPlaylist && (
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
                                    /* ✅ ปรับขนาดตรงนี้ให้เล็กลง */
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