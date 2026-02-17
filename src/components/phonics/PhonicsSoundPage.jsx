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

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-16 md:pt-14 overflow-y-auto pb-10">
        
        {/* หัวข้อ (เล็กลง) */}
        <div className="relative z-10 bg-white px-6 py-1.5 md:px-10 md:py-2 rounded-full border-[3px] md:border-[5px] border-purple-500 shadow-[0_3px_0_#a855f7] mb-6 animate-bounce-slow text-center scale-90 md:scale-100">
            <h1 className="text-2xl md:text-4xl font-black text-purple-600 tracking-wide">
              🔤 เสียงตัวอักษร (Letter Sounds)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม A-Z (เล็กลง) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-7xl">
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
                  /* ⭐ ปรับลดขนาดลงตรงนี้ ⭐ */
                  w-[60px] h-[60px]      /* มือถือ: ลดจาก 80 เหลือ 60 */
                  md:w-[100px] md:h-[100px] /* จอคอม: ลดจาก 130 เหลือ 100 */
                  
                  rounded-xl
                  ${item.color} 
                  shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_2px_0_rgba(0,0,0,0.2)]
                  border-[3px] border-white/30
                  transition-all duration-150
                  hover:scale-110 hover:-translate-y-1
                  active:translate-y-1 active:shadow-none
                `}
              >
                {/* ตัวอักษร */}
                <span className="text-3xl md:text-6xl font-black text-white drop-shadow-md">
                  {item.num}
                </span>
                
                {/* ไอคอนลำโพงเล็กๆ มุมขวา */}
                <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 text-[8px] md:text-sm opacity-50 group-hover:opacity-100">
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