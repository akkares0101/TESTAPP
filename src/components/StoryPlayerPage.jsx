import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';

// Import รูปปุ่ม (เอามาแสดงเป็น Playlist ด้านล่าง)
import btnStory1 from '../assets/images/buttons/btn_story_1.png';
import btnStory2 from '../assets/images/buttons/btn_story_2.png';
import btnStory3 from '../assets/images/buttons/btn_story_3.png';
import btnStory4 from '../assets/images/buttons/btn_story_4.png';
import btnStory5 from '../assets/images/buttons/btn_story_5.png';

// 🔊 โหลดเสียง
const clickSound = new Audio('/sounds/click.mp3');

function StoryPlayerPage({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);

  // ฟังก์ชันเล่นเสียง
  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ⭐ ข้อมูลนิทาน 5 เรื่อง (อัปเดตชื่อใหม่แล้ว)
  const storyList = [
    { id: 1, title: "ราชสีห์กับวัว 4 ตัว", video: "/videos/stories/story_1.mp4", image: btnStory1, color: "text-green-600" },
    { id: 2, title: "กบเลือกนาย", video: "/videos/stories/story_2.mp4", image: btnStory2, color: "text-orange-600" },
    { id: 3, title: "พ่อค้าเกลือกับลา", video: "/videos/stories/story_3.mp4", image: btnStory3, color: "text-yellow-600" },
    { id: 4, title: "เด็กเลี้ยงแกะ", video: "/videos/stories/story_4.mp4", image: btnStory4, color: "text-red-600" },
    { id: 5, title: "กากับนกยูง", video: "/videos/stories/story_5.mp4", image: btnStory5, color: "text-purple-600" },
  ];

  // หาเรื่องที่จะเล่น
  const initialId = location.state?.initialStoryId || 1;
  const [currentStory, setCurrentStory] = useState(storyList.find(s => s.id === initialId) || storyList[0]);

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
      className="h-screen w-full flex flex-col items-center overflow-hidden relative"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ✨ Decoration: แสงวิ้งๆ (เหมือนหน้าเมนู) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <div className="w-full max-w-[95rem] px-4 py-4 flex justify-between items-center z-20 shrink-0 gap-4">
        {/* ปุ่มกลับ 3D */}
        <button 
          onClick={() => navigate('/stories')} 
          className="
            group flex items-center gap-2 
            bg-white text-orange-600 px-5 py-2 md:px-6 md:py-2 
            rounded-[2rem] 
            shadow-[0_6px_0_#fed7aa]
            border-4 border-white 
            hover:border-orange-200 hover:translate-y-1 hover:shadow-[0_3px_0_#fed7aa]
            active:translate-y-2 active:shadow-none
            transition-all duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-xl">กลับ</span>
        </button>

        {/* ชื่อเรื่องที่กำลังเล่น */}
        <div className="flex-1 flex justify-center items-center px-8 py-3 rounded-[3rem] shadow-lg border-[4px] border-white/50 bg-white/80 backdrop-blur-md mx-4">
           <h1 className={`text-xl md:text-3xl font-black tracking-wide flex items-center gap-2 ${currentStory.color}`}>
             กำลังเล่น: {currentStory.title}
           </h1>
        </div>
        
        {/* Placeholder เพื่อจัดกึ่งกลาง */}
        <div className="w-24 hidden md:block"></div>
      </div>

      {/* Video Player Container */}
      <div className="w-full max-w-5xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 mb-4">
        <div className="w-full h-full max-h-[55vh] bg-black rounded-[2.5rem] border-[8px] border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col">
          <video 
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            muted={isMuted}
            poster={`https://via.placeholder.com/800x450/000000/FFFFFF?text=${currentStory.title}`}
          >
            <source src={currentStory.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Playlist ด้านล่าง (เปลี่ยนดีไซน์เป็น Floating Icons) */}
      <div className="w-full max-w-6xl h-[28vh] shrink-0 bg-white/50 backdrop-blur-xl rounded-t-[3rem] border-t-4 border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col z-20">
        
        <div className="text-center py-3 shrink-0">
          <span className="bg-white/90 px-6 py-1.5 rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100">
            เลือกนิทานเรื่องอื่น
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 pb-8 items-end h-full">
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
                  group relative flex flex-col items-center justify-center
                  transition-all duration-300
                  ${currentStory.id === story.id ? 'scale-110 -translate-y-4' : 'opacity-60 hover:opacity-100 hover:scale-105 hover:-translate-y-2'}
                `}
              >
                {/* รูปปุ่ม (แบบลอยตัว ไม่มีกรอบ) */}
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                   {/* แสง Active */}
                   {currentStory.id === story.id && (
                     <div className="absolute inset-0 bg-white/60 blur-xl rounded-full animate-pulse"></div>
                   )}
                   
                   <img 
                    src={story.image} 
                    alt={story.title} 
                    className={`
                      w-full h-full object-contain drop-shadow-md transition-all duration-300
                      ${currentStory.id === story.id ? 'drop-shadow-2xl' : ''}
                    `} 
                   />
                </div>
                
                {/* ชื่อเรื่อง */}
                <span className={`
                  mt-1 text-xs md:text-sm font-bold px-3 py-1 rounded-full border-2
                  transition-all duration-300
                  ${currentStory.id === story.id 
                    ? 'bg-white text-orange-600 border-orange-100 shadow-md scale-100' 
                    : 'bg-transparent text-gray-600 border-transparent scale-90 group-hover:bg-white/80 group-hover:scale-100'}
                `}>
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default StoryPlayerPage;