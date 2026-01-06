import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/Color.png';

function ColorsLearningPage({ isMuted }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 📂 ข้อมูลบทเรียนสี 13 สี
  // (ตรงนี้เหมือนเดิมครับ แต่สำคัญมากสำหรับ Header แบบใหม่)
  const colorLessons = [
    { id: 'green', name: 'สีเขียว', color: 'bg-green-500', text: 'text-white', video: '/videos/colors/green.mp4' },
    { id: 'orange', name: 'สีส้ม', color: 'bg-orange-500', text: 'text-white', video: '/videos/colors/orange.mp4' },
    { id: 'yellow', name: 'สีเหลือง', color: 'bg-yellow-400', text: 'text-yellow-900', video: '/videos/colors/yellow.mp4' },
    { id: 'brown', name: 'สีน้ำตาล', color: 'bg-amber-800', text: 'text-white', video: '/videos/colors/brown.mp4' },
    { id: 'pink', name: 'สีชมพู', color: 'bg-pink-400', text: 'text-white', video: '/videos/colors/pink.mp4' },
    { id: 'gray', name: 'สีเทา', color: 'bg-gray-500', text: 'text-white', video: '/videos/colors/gray.mp4' },
    { id: 'sky', name: 'สีฟ้า', color: 'bg-sky-400', text: 'text-white', video: '/videos/colors/sky.mp4' },
    { id: 'red', name: 'สีแดง', color: 'bg-red-500', text: 'text-white', video: '/videos/colors/red.mp4' },
    { id: 'black', name: 'สีดำ', color: 'bg-gray-900', text: 'text-white', video: '/videos/colors/black.mp4' },
    { id: 'purple', name: 'สีม่วง', color: 'bg-purple-500', text: 'text-white', video: '/videos/colors/purple.mp4' },
    { id: 'blue', name: 'สีน้ำเงิน', color: 'bg-blue-600', text: 'text-white', video: '/videos/colors/blue.mp4' },
    { id: 'white', name: 'สีขาว', color: 'bg-white', text: 'text-black', border: 'border-gray-300', video: '/videos/colors/white.mp4' },
    { id: 'lime', name: 'สีเขียวอ่อน', color: 'bg-lime-400', text: 'text-lime-900', video: '/videos/colors/lime.mp4' },
  ];

  const [currentLesson, setCurrentLesson] = useState(colorLessons[0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
    }
  }, [currentLesson]);

  return (
    <div 
      className="h-screen w-full flex flex-col items-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. Header */}
      <div className="w-full max-w-5xl px-4 py-3 flex justify-between items-center z-10 shrink-0 gap-4">
         
         {/* ปุ่มย้อนกลับ (ใช้แบบแคปซูลเหมือนเดิมเพราะเข้าชุดกัน) */}
         <button 
          onClick={() => navigate(-1)} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-lg">กลับ</span>
        </button>

        {/* ⭐⭐⭐ ส่วนหัวข้อแบบใหม่ (น่ารัก + เปลี่ยนสีได้) ⭐⭐⭐ */}
        <div className={`
           flex-1 flex justify-center items-center
           px-6 py-2 md:py-3 rounded-[2rem] shadow-xl
           border-[4px] border-white
           transition-all duration-500 ease-in-out
           ${currentLesson.color} /* 🔥 เปลี่ยนสีพื้นหลังตามสีที่เลือก */
           ${currentLesson.id === 'white' ? 'border-gray-200 shadow-inner' : ''} /* กรณีสีขาว เพิ่มขอบเทานิดนึงจะได้ไม่จม */
        `}>
           <h1 className={`
             text-lg md:text-3xl font-black tracking-wider
             flex items-center gap-2 md:gap-3
             drop-shadow-sm
             ${currentLesson.text} /* 🔥 เปลี่ยนสีตัวหนังสือ (ขาว/ดำ) ให้อ่านง่าย */
           `}>
             <span className="text-2xl md:text-4xl animate-bounce" style={{ animationDuration: '2s' }}>🎨</span>
             📺 สื่อการสอน: {currentLesson.name}
           </h1>
        </div>
        
        {/* Spacer */}
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* 2. Video Player Container */}
      <div className="w-full max-w-4xl px-4 flex-1 min-h-0 flex flex-col items-center justify-center z-10 mb-2">
        <div className="
          w-full h-full max-h-[50vh] 
          bg-black 
          rounded-[2rem]
          border-[8px] border-orange-200 
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          relative overflow-hidden flex flex-col
        ">
          <div className="absolute top-0 left-0 right-0 h-8 md:h-10 bg-white/10 z-20 pointer-events-none border-b border-white/10 backdrop-blur-sm flex items-center px-6">
            <div className={`w-3 h-3 rounded-full animate-pulse mr-2 ${currentLesson.color}`}></div>
            <span className="text-white/80 text-xs font-bold tracking-widest">NOW PLAYING</span>
          </div>

          <video 
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            muted={isMuted}
            poster={`https://via.placeholder.com/800x450/000000/FFFFFF?text=${currentLesson.name}`}
          >
            <source src={currentLesson.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 3. แผงปุ่มเลือกสี */}
      <div className="
        w-full max-w-5xl 
        h-[35vh] shrink-0 
        bg-white/60 backdrop-blur-xl 
        rounded-t-[2rem] border-t-4 border-white/50
        shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
        flex flex-col z-10
      ">
        <div className="text-center py-2 shrink-0">
          <span className="bg-white/80 px-4 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm">
            เลือกวิดีโอสีที่ต้องการเรียน 👇
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-3 pb-8">
            {colorLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  w-20 h-20 md:w-24 md:h-24
                  rounded-2xl
                  ${lesson.color}
                  ${lesson.border ? `border-4 ${lesson.border}` : 'border-4 border-white'}
                  shadow-md hover:shadow-xl
                  transition-all duration-200
                  ${currentLesson.id === lesson.id 
                    ? 'scale-110 ring-4 ring-offset-2 ring-orange-400 z-10 translate-y-[-5px]' 
                    : 'hover:scale-105 hover:-translate-y-1 opacity-90 hover:opacity-100'
                  }
                `}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1 backdrop-blur-sm">
                  <span className="text-white text-sm">▶</span>
                </div>
                <span className={`text-xs md:text-sm font-bold ${lesson.text} drop-shadow-md`}>
                  {lesson.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ColorsLearningPage;