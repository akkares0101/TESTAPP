import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

function DaysMenuPage({ isMuted }) {
  const videoRef = useRef(null);

  const daysData = [
    { 
      id: 'sunday', 
      en: 'Sunday', 
      th: 'วันอาทิตย์', 
      color: 'bg-red-400', 
      border: 'border-red-200',
      text: 'text-red-600',
      video: '/videos/days/sunday.mp4' 
    },
    { 
      id: 'monday', 
      en: 'Monday', 
      th: 'วันจันทร์', 
      color: 'bg-yellow-300', 
      border: 'border-yellow-100',
      text: 'text-yellow-700',
      video: '/videos/days/monday.mp4' 
    },
    { 
      id: 'tuesday', 
      en: 'Tuesday', 
      th: 'วันอังคาร', 
      color: 'bg-pink-300', 
      border: 'border-pink-100',
      text: 'text-pink-600',
      video: '/videos/days/tuesday.mp4' 
    },
    { 
      id: 'wednesday', 
      en: 'Wednesday', 
      th: 'วันพุธ', 
      color: 'bg-green-400', 
      border: 'border-green-200',
      text: 'text-green-700',
      video: '/videos/days/wednesday.mp4' 
    },
    { 
      id: 'thursday', 
      en: 'Thursday', 
      th: 'วันพฤหัสบดี', 
      color: 'bg-orange-300', 
      border: 'border-orange-100',
      text: 'text-orange-600',
      video: '/videos/days/thursday.mp4' 
    },
    { 
      id: 'friday', 
      en: 'Friday', 
      th: 'วันศุกร์', 
      color: 'bg-sky-300', 
      border: 'border-sky-100',
      text: 'text-sky-600',
      video: '/videos/days/friday.mp4' 
    },
    { 
      id: 'saturday', 
      en: 'Saturday', 
      th: 'วันเสาร์', 
      color: 'bg-purple-300', 
      border: 'border-purple-100',
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
      {/* --- Header (ชื่อวัน) - ปรับให้เล็กลง --- */}
      <div className="w-full flex justify-center pt-4 pb-2 z-10 shrink-0">
         <div className={`
            relative bg-white px-8 py-2 rounded-full 
            border-[4px] ${selectedDay.border} shadow-md 
            transform transition-all duration-300
            flex items-center gap-3
         `}>
            {/* ดาวหมุนๆ */}
            <div className="text-yellow-400 animate-spin-slow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-sm">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="text-center flex flex-col items-center">
                <h1 className={`text-2xl md:text-3xl font-black ${selectedDay.text} tracking-wider leading-none`}>
                {selectedDay.en}
                </h1>
                <p className="text-gray-400 text-xs font-bold mt-1">{selectedDay.th}</p>
            </div>
         </div>
      </div>

      {/* --- Main Content: Video Player (ปรับขนาดให้เล็กลงอีก) --- */}
      {/* ✅ ปรับ max-w-3xl และ max-h-[40vh] */}
      <div className="flex-1 w-full max-w-3xl px-4 flex flex-col justify-center items-center z-10 min-h-0 pb-2">
        <div className={`
            w-full h-full max-h-[40vh] md:max-h-[45vh] aspect-video bg-black rounded-[1.5rem] 
            border-[6px] ${selectedDay.border} shadow-lg overflow-hidden relative group
        `}>
            <video 
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                muted={isMuted}
            >
                <source src={selectedDay.video} type="video/mp4" />
            </video>
        </div>
      </div>

      {/* --- Bottom Bar: Day Selection (เลื่อนแนวนอน) --- */}
      <div className="w-full h-auto py-4 z-20 shrink-0 bg-white/40 backdrop-blur-md rounded-t-[1.5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-start md:justify-center gap-3 overflow-x-auto px-6 pb-2 no-scrollbar snap-x snap-mandatory">
            {daysData.map((day) => (
                <button
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`
                        snap-center shrink-0
                        group relative w-20 h-20 md:w-24 md:h-24 rounded-2xl 
                        flex flex-col items-center justify-center gap-1
                        transition-all duration-300 border-b-[4px] active:border-b-0 active:translate-y-1
                        ${selectedDay.id === day.id 
                            ? 'bg-white border-gray-200 scale-110 -translate-y-2 shadow-lg ring-4 ring-yellow-200 z-10' 
                            : `${day.color} border-black/10 hover:brightness-110 shadow-md opacity-90 hover:opacity-100`
                        }
                    `}
                >
                    {/* ตัวอักษรย่อ */}
                    <div className={`
                        text-2xl md:text-3xl font-black drop-shadow-sm
                        ${selectedDay.id === day.id ? day.text : 'text-white'}
                    `}>
                        {day.en.substring(0, 3)}
                    </div>
                    
                    {/* จุดสีบ่งบอกวัน */}
                    <div className={`
                        w-2.5 h-2.5 rounded-full 
                        ${selectedDay.id === day.id ? day.color : 'bg-white/50'}
                    `}></div>

                    {/* ไอคอนเลือกแล้ว */}
                    {selectedDay.id === day.id && (
                        <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-md">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* ซ่อน Scrollbar แต่ยังเลื่อนได้ */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default DaysMenuPage;