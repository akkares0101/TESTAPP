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
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาด */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* เนื้อหาหลัก (จัดกึ่งกลางหน้าจอ) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4">
        
        {/* 1. หัวข้อ (❌ ถอดปุ่มกลับออกแล้ว จัดกึ่งกลางกะทัดรัด) */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[5px] border-purple-500 shadow-[0_6px_0_#a855f7] mb-8 md:mb-12 animate-bounce-slow text-center shrink-0">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-purple-600 tracking-wide">
              🔤 เสียงตัวอักษร (Letter Sounds)
            </h1>
        </div>

        {/* 2. Grid ปุ่ม A-Z (สเกลปุ่มแบบพอดีจอทีวี) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl shrink-0">
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
                  /* ขนาดปุ่มที่เนี๊ยบบนหน้าจอใหญ่ */
                  w-[55px] h-[55px] 
                  md:w-[90px] md:h-[90px] 
                  lg:w-[105px] lg:h-[105px]
                  
                  rounded-2xl
                  ${item.color} 
                  shadow-[0_6px_0_rgba(0,0,0,0.2)] 
                  border-[3px] border-white/50
                  transition-all duration-150
                  hover:scale-110 hover:-translate-y-1
                  active:translate-y-1 active:shadow-none
                `}
              >
                {/* ตัวอักษร */}
                <span className="text-2xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-md">
                  {item.num}
                </span>
                
                {/* ไอคอนลำโพงเล็กๆ */}
                <span className="absolute top-1 right-1 md:top-2 md:right-2 text-[8px] md:text-xs opacity-40 group-hover:opacity-100 transition-opacity">
                    🔊
                </span>
              </button>
            ))}
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default PhonicsSoundPage;