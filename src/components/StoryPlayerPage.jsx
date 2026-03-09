import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// Import รูปปุ่ม (ให้ตรงกับหน้าเมนู)
const btnStory1 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_1.png";
const btnStory2 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_2.png";
const btnStory4 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_4.png";
const btnStory5 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_5.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function StoryPlayerPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const containerRef = useRef(null); 

  const [isFullscreen, setIsFullscreen] = useState(false); 

  useEffect(() => {
    if (onVideoStateChange) {
      onVideoStateChange(true); 
    }
    return () => {
      if (onVideoStateChange) {
        onVideoStateChange(false); 
      }
    };
  }, [onVideoStateChange]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        if (containerRef.current.requestFullscreen) {
            containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) { 
            containerRef.current.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); 
    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const storyList = [
    { 
      id: 1, 
      title: "ราชสีห์กับวัว 4 ตัว", 
      video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/stories/story_1.mp4", 
      image: btnStory1, 
      color: "text-green-600",
      bg: "bg-green-100"
    },
    { 
      id: 2, 
      title: "กบเลือกนาย", 
      video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/stories/story_2.mp4", 
      image: btnStory2, 
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    { 
      id: 4, 
      title: "เด็กเลี้ยงแกะ", 
      video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/stories/story_4.mp4", 
      image: btnStory4, 
      color: "text-red-600",
      bg: "bg-red-100"
    },
    { 
      id: 5, 
      title: "กากับนกยูง", 
      video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/stories/story_5.mp4", 
      image: btnStory5, 
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
  ];

  const initialId = location.state?.initialStoryId || 1;
  
  const [currentStory, setCurrentStory] = useState(
    storyList.find(s => s.id === initialId) || storyList[0]
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
    }
  }, [currentStory]);

  return (
    <div 
      className={`h-screen w-full flex flex-col items-center overflow-hidden relative ${isFullscreen ? 'bg-black' : ''}`}
      style={!isFullscreen ? { 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      } : {}}
    >
      {/* Decoration */}
      {!isFullscreen && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      )}

      {/* --- Header (บีบให้เล็กลง) --- */}
      {!isFullscreen && (
        <div className="w-full max-w-[95rem] px-4 py-2 flex justify-center items-center z-20 shrink-0 mt-1">
          <div className="flex justify-center items-center px-6 py-1.5 md:px-8 md:py-2 rounded-[3rem] shadow-md border-[3px] border-white/50 bg-white/80 backdrop-blur-md">
             <h1 className={`text-lg md:text-2xl font-black tracking-wide flex items-center gap-2 ${currentStory.color} truncate`}>
               🎬 {currentStory.title}
             </h1>
          </div>
        </div>
      )}

      {/* --- Video Player Container (⭐ ขยายใหญ่ขึ้นเป็น 65-75vh) --- */}
      <div 
        ref={containerRef}
        className={`flex flex-col items-center justify-center z-10 ${isFullscreen ? 'w-full h-full bg-black' : 'w-full max-w-5xl px-2 md:px-4 flex-1 min-h-0 mb-2'}`}
      >
        <div className={`relative overflow-hidden group flex flex-col w-full h-full ${isFullscreen ? 'bg-black' : 'max-h-[65vh] md:max-h-[75vh] bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'}`}>
          <video 
            ref={videoRef}
            className={`w-full h-full object-contain bg-black ${isFullscreen ? 'h-screen' : ''}`}
            controls
            autoPlay
            muted={isMuted}
            poster={`https://via.placeholder.com/800x450/000000/FFFFFF?text=${currentStory.title}`}
          >
            <source src={currentStory.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* ปุ่มโหมดเต็มจอ */}
          <button 
              onClick={toggleFullscreen}
              className="absolute bottom-16 right-4 md:bottom-20 md:right-6 bg-black/50 hover:bg-black/80 text-white p-2 md:p-3 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-lg z-50"
              title="เต็มจอ"
          >
              {isFullscreen ? (
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                   </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
              )}
          </button>
        </div>
      </div>

      {/* --- Playlist (⭐ บีบให้เตี้ยลงเหลือ 20-22vh) --- */}
      {!isFullscreen && (
        <div className="w-full max-w-6xl h-[20vh] md:h-[22vh] shrink-0 bg-white/60 backdrop-blur-xl rounded-t-[2rem] md:rounded-t-[3rem] border-t-4 border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col z-20">
          
          <div className="text-center py-1 md:py-2 shrink-0">
            <span className="bg-white/90 px-4 py-0.5 md:px-6 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-500 shadow-sm border border-gray-100">
              เลือกดูเรื่องอื่น ๆ
            </span>
          </div>
          
          <div className="flex-1 overflow-x-auto md:overflow-hidden px-2 pb-1">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 md:gap-6 items-center h-full px-2">
              {storyList.map((story) => (
                <button
                  key={story.id}
                  onClick={() => {
                    if (currentStory.id !== story.id) {
                      playClick();
                      setCurrentStory(story);
                    }
                  }}
                  className={`
                    group relative flex flex-col items-center justify-center shrink-0
                    transition-all duration-300
                    ${currentStory.id === story.id ? 'scale-110 -translate-y-1' : 'opacity-70 hover:opacity-100 hover:scale-105'}
                  `}
                >
                  {/* ⭐ ย่อขนาดรูปปุ่มให้พอดีกับแถบที่เล็กลง */}
                  <div className="relative w-14 h-14 md:w-20 md:h-20">
                     {currentStory.id === story.id && (
                       <div className="absolute inset-0 bg-yellow-400/40 blur-xl rounded-full animate-pulse"></div>
                     )}
                     
                     <img 
                      src={story.image} 
                      alt={story.title} 
                      className={`
                        w-full h-full object-contain drop-shadow-md transition-all duration-300
                        ${currentStory.id === story.id ? 'drop-shadow-xl' : ''}
                      `} 
                     />
                  </div>
                  
                  <span className={`
                    mt-1 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full border
                    transition-all duration-300 whitespace-nowrap
                    ${currentStory.id === story.id 
                      ? 'bg-white text-orange-600 border-orange-200 shadow-sm' 
                      : 'bg-transparent text-gray-600 border-transparent'}
                  `}>
                    {story.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default StoryPlayerPage;