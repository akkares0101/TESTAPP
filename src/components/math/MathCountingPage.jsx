import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function MathCountingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔢 ข้อมูลเลข 1-10 และไฟล์วิดีโอ
  // ⚠️ เตรียมไฟล์วิดีโอใน assets/videos/math/ : count_1.mp4 ถึง count_10.mp4
  const numberLessons = [
    { id: 1, num: "1", color: "bg-red-500", border: "border-red-700", video: "/videos/math/count_1.mp4" },
    { id: 2, num: "2", color: "bg-orange-500", border: "border-orange-700", video: "/videos/math/count_2.mp4" },
    { id: 3, num: "3", color: "bg-yellow-400", border: "border-yellow-600", video: "/videos/math/count_3.mp4" },
    { id: 4, num: "4", color: "bg-green-500", border: "border-green-700", video: "/videos/math/count_4.mp4" },
    { id: 5, num: "5", color: "bg-teal-500", border: "border-teal-700", video: "/videos/math/count_5.mp4" },
    { id: 6, num: "6", color: "bg-blue-500", border: "border-blue-700", video: "/videos/math/count_6.mp4" },
    { id: 7, num: "7", color: "bg-indigo-500", border: "border-indigo-700", video: "/videos/math/count_7.mp4" },
    { id: 8, num: "8", color: "bg-purple-500", border: "border-purple-700", video: "/videos/math/count_8.mp4" },
    { id: 9, num: "9", color: "bg-pink-500", border: "border-pink-700", video: "/videos/math/count_9.mp4" },
    { id: 10, num: "10", color: "bg-rose-500", border: "border-rose-700", video: "/videos/math/count_10.mp4" },
  ];

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
          onClick={() => navigate('/math')} 
          className="
             group flex items-center gap-3 bg-white text-blue-500 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-blue-100 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">ย้อนกลับ</span>
        </button>
      </div>

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-blue-400 shadow-[0_4px_0_#60a5fa] mb-8 animate-bounce-slow">
            <h1 className="text-3xl md:text-6xl font-black text-blue-500 tracking-wide">
              เลือกตัวเลขที่หนูชอบ
            </h1>
        </div>

        {/* 3. Grid ปุ่มตัวเลข 1-10 */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-6xl">
            {numberLessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  // ✅ ส่งข้อมูลแบบใหม่: ส่งไปทั้ง Playlist และ Index ที่กด
                  navigate('/lesson', { 
                    state: { 
                        playlist: numberLessons, // ส่งไปทั้งก้อน 1-10
                        initialIndex: index      // บอกว่าตอนนี้กดเลขไหนอยู่ (เริ่มที่ 0)
                    } 
                  });
                }}
                className={`
                  group relative
                  w-[100px] h-[100px] md:w-[160px] md:h-[160px]
                  rounded-3xl
                  ${item.color} ${item.border} border-b-[8px]
                  flex items-center justify-center
                  shadow-xl
                  transition-all duration-150
                  hover:scale-110 hover:-translate-y-2
                  active:border-b-0 active:translate-y-2 active:shadow-none
                `}
              >
                {/* แสงเงาบนปุ่มให้ดูนูน */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-white/30 rounded-full blur-[2px]"></div>

                {/* ตัวเลข */}
                <span className="text-5xl md:text-8xl font-black text-white drop-shadow-md group-hover:rotate-6 transition-transform">
                  {item.num}
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

export default MathCountingPage;