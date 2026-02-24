import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../assets/images/bg.png';

function ColorsLearningPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const MASTER_VIDEO_SRC = '/videos/colors/all_colors.mp4'; 

  // 📂 อัปเดต Timestamp ใหม่ตามที่คุณแจ้งมาครับ
  const colorLessons = [
    { id: 'green', name: '1. สีเขียว', color: 'bg-green-600', shadow: 'shadow-green-200', text: 'text-white', timestamp: 17 },
    { id: 'lime', name: '2. สีเขียวอ่อน', color: 'bg-lime-400', shadow: 'shadow-lime-100', text: 'text-lime-900', timestamp: 48 },
    { id: 'orange', name: '3. สีส้ม', color: 'bg-orange-500', shadow: 'shadow-orange-200', text: 'text-white', timestamp: 95 }, 
    { id: 'yellow', name: '4. สีเหลือง', color: 'bg-yellow-400', shadow: 'shadow-yellow-100', text: 'text-yellow-900', timestamp: 119 }, 
    { id: 'brown', name: '5. สีน้ำตาล', color: 'bg-amber-800', shadow: 'shadow-orange-200', text: 'text-white', timestamp: 142 },
    { id: 'pink', name: '6. สีชมพู', color: 'bg-pink-400', shadow: 'shadow-pink-200', text: 'text-white', timestamp: 167 },
    { id: 'gray', name: '7. สีเทา', color: 'bg-gray-500', shadow: 'shadow-gray-300', text: 'text-white', timestamp: 195 },
    { id: 'sky', name: '8. สีฟ้า', color: 'bg-sky-400', shadow: 'shadow-sky-200', text: 'text-white', timestamp: 225 },
    { id: 'red', name: '9. สีแดง', color: 'bg-red-600', shadow: 'shadow-red-200', text: 'text-white', timestamp: 275 }, 
    { id: 'black', name: '10. สีดำ', color: 'bg-gray-900', shadow: 'shadow-gray-400', text: 'text-white', timestamp: 295 },
    { id: 'purple', name: '11. สีม่วง', color: 'bg-purple-600', shadow: 'shadow-purple-200', text: 'text-white', timestamp: 326 },
    { id: 'blue', name: '12. สีน้ำเงิน', color: 'bg-blue-700', shadow: 'shadow-blue-200', text: 'text-white', timestamp: 357 },
    { id: 'white', name: '13. สีขาว', color: 'bg-white', shadow: 'shadow-gray-300', text: 'text-gray-800', border: 'border-2 border-gray-200', timestamp: 385 },
  ];

  const [currentLesson, setCurrentLesson] = useState(colorLessons[0]);

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  const jumpToTime = (lesson) => {
    setCurrentLesson(lesson);
    if (videoRef.current) {
      videoRef.current.currentTime = lesson.timestamp;
      videoRef.current.play();
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center overflow-hidden font-sans"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. Header */}
      <div className="w-full flex justify-center pt-3 pb-2 z-10 shrink-0">
         <div className={`
            relative px-6 py-1.5 rounded-full 
            shadow-md transform transition-all duration-500 ease-out
            flex items-center gap-2 border-[3px] border-white/50
            ${currentLesson.color}
            ${currentLesson.id === 'white' ? 'border-gray-200' : ''}
         `}>
            <div className={`text-lg animate-spin-slow ${currentLesson.id === 'white' ? 'text-gray-400' : 'text-white/80'}`}>
               🎨
            </div>
            <h1 className={`text-lg md:text-xl font-black tracking-wide ${currentLesson.text} drop-shadow-sm`}>
               {currentLesson.name}
            </h1>
         </div>
      </div>

      {/* 2. Main Content: Video Player */}
      <div className="flex-1 w-full max-w-4xl px-4 flex flex-col justify-center items-center z-10 min-h-0 pb-1">
        <div className={`
            w-full h-full max-h-[60vh] md:max-h-[65vh] aspect-video bg-black rounded-[1.5rem] 
            border-[4px] border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)] 
            overflow-hidden relative group transition-all duration-500
            ${currentLesson.shadow}
        `}>
            <video 
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                muted={isMuted}
            >
                <source src={MASTER_VIDEO_SRC} type="video/mp4" />
            </video>
        </div>
      </div>

      {/* 3. Bottom Bar: ปุ่มกด 13 สี */}
      <div className="w-full h-auto py-3 z-20 shrink-0">
        <div className="flex justify-center items-center">
            <div className="bg-white/40 backdrop-blur-md px-4 py-3 rounded-[2rem] shadow-lg border border-white/40 w-fit mx-auto">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-3xl">
                    {colorLessons.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => jumpToTime(lesson)}
                            className={`
                                group relative 
                                w-12 h-12 md:w-14 md:h-14 
                                rounded-full
                                flex items-center justify-center
                                transition-all duration-300 transform
                                shadow-sm hover:shadow-md hover:scale-110 active:scale-95
                                ${lesson.color}
                                ${lesson.border ? lesson.border : 'border-[2px] border-white'}
                                ${currentLesson.id === lesson.id 
                                    ? 'scale-110 ring-2 ring-offset-1 ring-yellow-400 z-10 shadow-lg' 
                                    : 'opacity-90 hover:opacity-100'
                                }
                            `}
                        >
                            {currentLesson.id === lesson.id && (
                                <span className={`
                                    absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded-md bg-white/95 
                                    text-[10px] font-bold text-gray-600 shadow-sm animate-bounce-small border border-gray-100 z-20
                                `}>
                                    {lesson.name}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-bounce-small { animation: bounceSmall 1s infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounceSmall { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
    </div>
  );
}

export default ColorsLearningPage;