import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function DaysMenuPage({ isMuted }) {
  const videoRef = useRef(null);

  const daysData = [
    { 
      id: 'sunday', 
      en: 'Sunday', 
      th: 'วันอาทิตย์', 
      color: 'bg-red-400', 
      border: 'border-red-500', // ปรับสีเข้มขึ้นให้เห็นขอบชัด
      text: 'text-red-600',
      video: '/videos/days/sunday.mp4' 
    },
    { 
      id: 'monday', 
      en: 'Monday', 
      th: 'วันจันทร์', 
      color: 'bg-yellow-300', 
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      video: '/videos/days/monday.mp4' 
    },
    { 
      id: 'tuesday', 
      en: 'Tuesday', 
      th: 'วันอังคาร', 
      color: 'bg-pink-300', 
      border: 'border-pink-500',
      text: 'text-pink-600',
      video: '/videos/days/tuesday.mp4' 
    },
    { 
      id: 'wednesday', 
      en: 'Wednesday', 
      th: 'วันพุธ', 
      color: 'bg-green-400', 
      border: 'border-green-500',
      text: 'text-green-700',
      video: '/videos/days/wednesday.mp4' 
    },
    { 
      id: 'thursday', 
      en: 'Thursday', 
      th: 'วันพฤหัสบดี', 
      color: 'bg-orange-300', 
      border: 'border-orange-500',
      text: 'text-orange-600',
      video: '/videos/days/thursday.mp4' 
    },
    { 
      id: 'friday', 
      en: 'Friday', 
      th: 'วันศุกร์', 
      color: 'bg-sky-300', 
      border: 'border-sky-500',
      text: 'text-sky-600',
      video: '/videos/days/friday.mp4' 
    },
    { 
      id: 'saturday', 
      en: 'Saturday', 
      th: 'วันเสาร์', 
      color: 'bg-purple-300', 
      border: 'border-purple-500',
      text: 'text-purple-600',
      video: '/videos/days/saturday.mp4' 
    },
  ];

  const [selectedDay, setSelectedDay] = useState(daysData[0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
    }
  }, [selectedDay]);

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
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาด */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- 1. Header (ชื่อวัน) - จัดกึ่งกลางคลีนๆ --- */}
      <div className="w-full flex justify-center pt-6 pb-2 z-10 shrink-0">
         <div className={`
            bg-white px-10 py-2 rounded-full 
            border-[4px] ${selectedDay.border} shadow-lg 
            flex items-center gap-4 transition-all duration-500
         `}>
            <div className="text-yellow-400 animate-spin-slow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="text-center">
                <h1 className={`text-2xl md:text-4xl font-black ${selectedDay.text} tracking-wider leading-none uppercase`}>
                {selectedDay.en}
                </h1>
                <p className="text-gray-500 text-sm font-bold mt-1">{selectedDay.th}</p>
            </div>
         </div>
      </div>

      {/* --- 2. Main Content: Video Player (สูตรผอมเพรียว ตัดขอบดำ) --- */}
      <div className="flex-1 w-full max-w-[850px] px-4 flex flex-col justify-center items-center z-10 min-h-0">
        <div className={`
            relative w-full aspect-video max-h-[55vh] bg-black rounded-[2.5rem] 
            border-[6px] md:border-[8px] ${selectedDay.border} shadow-[0_12px_0_rgba(0,0,0,0.1)] 
            overflow-hidden transition-all duration-500
        `}>
            <video 
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted={isMuted}
                playsInline
            >
                <source src={selectedDay.video} type="video/mp4" />
            </video>
        </div>
      </div>

      {/* --- 3. Bottom Bar: Day Selection (แถบเลือกวัน) --- */}
      <div className="w-full h-auto py-6 z-20 shrink-0 bg-white/60 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t-4 border-white">
        <div className="flex justify-start md:justify-center gap-4 overflow-x-auto px-8 pb-2 no-scrollbar snap-x">
            {daysData.map((day) => (
                <button
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`
                        snap-center shrink-0
                        group relative w-20 h-20 md:w-28 md:h-28 rounded-[2rem] 
                        flex flex-col items-center justify-center
                        transition-all duration-300 border-b-[6px] active:border-b-0 active:translate-y-1
                        ${selectedDay.id === day.id 
                            ? 'bg-white border-gray-300 scale-110 -translate-y-3 shadow-2xl ring-4 ring-white z-10' 
                            : `${day.color} border-black/10 opacity-80 hover:opacity-100 hover:-translate-y-1 shadow-md`
                        }
                    `}
                >
                    <div className={`
                        text-2xl md:text-3xl font-black drop-shadow-sm
                        ${selectedDay.id === day.id ? day.text : 'text-white'}
                    `}>
                        {day.en.substring(0, 3)}
                    </div>
                    
                    {selectedDay.id === day.id && (
                        <div className="absolute -top-3 -right-3 text-yellow-400 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default DaysMenuPage;