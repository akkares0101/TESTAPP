import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsSoundPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔤 สร้างข้อมูล A-Z
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  // สร้าง Playlist A-Z
  const lessons = letters.map((char, index) => ({
    id: index + 1,
    num: char,
    title: `เสียงตัวอักษร ${char}`,
    // ⚠️ เตรียมไฟล์วิดีโอใน public/videos/phonics/
    video: `/videos/phonics/phonic_${char.toLowerCase()}.mp4`,
    color: [
      "bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-green-500", 
      "bg-teal-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500"
    ][index % 9]
  }));

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. ปุ่มย้อนกลับ */}
      <div className="absolute top-8 left-4 z-50 md:top-40 md:left-70">
         <button 
          onClick={() => navigate('/phonics')} 
          className="
             group flex items-center gap-3 bg-white text-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-purple-200 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">กลับเมนู</span>
        </button>
      </div>

      {/* 2. เนื้อหาหลัก */}
      {/* ⭐ แก้ไข: เพิ่ม pt-24 (มือถือ) และ pt-16 (คอม) ให้เนื้อหาเลื่อนลงมา */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-24 md:pt-40 overflow-y-auto pb-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-8 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-purple-600 tracking-wide">
              🔤 เสียงตัวอักษร (Letter Sounds)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม A-Z */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: lessons, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex items-center justify-center
                  w-[80px] h-[80px] md:w-[130px] md:h-[130px]
                  rounded-2xl
                  ${item.color} 
                  shadow-[0_6px_0_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.2)]
                  border-4 border-white/30
                  transition-all duration-150
                  hover:scale-110 hover:translate-y-1
                  active:translate-y-2 active:shadow-none
                `}
              >
                {/* ตัวอักษร */}
                <span className="text-4xl md:text-7xl font-black text-white drop-shadow-md">
                  {item.num}
                </span>
                
                {/* ไอคอนลำโพงเล็กๆ มุมขวา */}
                <span className="absolute top-1 right-1 md:top-2 md:right-2 text-xs md:text-lg opacity-50 group-hover:opacity-100">
                    🔊
                </span>
              </button>
            ))}
        </div>

      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default PhonicsSoundPage;