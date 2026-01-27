import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function MathReadThaiPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  //เตรียมไฟล์ thai_1.mp4-thai_10.mp4
  // 🇹🇭 ข้อมูลเลขไทย ๑-๑๐
  const lessons = [
    { id: 1, num: "๑", title: "เลข ๑ (ไทย)", color: "bg-red-500", border: "border-red-600", video: "/videos/math/thai_1.mp4" },
    { id: 2, num: "๒", title: "เลข ๒ (ไทย)", color: "bg-orange-500", border: "border-orange-600", video: "/videos/math/thai_2.mp4" },
    { id: 3, num: "๓", title: "เลข ๓ (ไทย)", color: "bg-yellow-400", border: "border-yellow-600", video: "/videos/math/thai_3.mp4" },
    { id: 4, num: "๔", title: "เลข ๔ (ไทย)", color: "bg-green-500", border: "border-green-600", video: "/videos/math/thai_4.mp4" },
    { id: 5, num: "๕", title: "เลข ๕ (ไทย)", color: "bg-teal-500", border: "border-teal-600", video: "/videos/math/thai_5.mp4" },
    { id: 6, num: "๖", title: "เลข ๖ (ไทย)", color: "bg-blue-500", border: "border-blue-600", video: "/videos/math/thai_6.mp4" },
    { id: 7, num: "๗", title: "เลข ๗ (ไทย)", color: "bg-indigo-500", border: "border-indigo-600", video: "/videos/math/thai_7.mp4" },
    { id: 8, num: "๘", title: "เลข ๘ (ไทย)", color: "bg-purple-500", border: "border-purple-600", video: "/videos/math/thai_8.mp4" },
    { id: 9, num: "๙", title: "เลข ๙ (ไทย)", color: "bg-pink-500", border: "border-pink-600", video: "/videos/math/thai_9.mp4" },
    { id: 10, num: "๑๐", title: "เลข ๑๐ (ไทย)", color: "bg-rose-500", border: "border-rose-600", video: "/videos/math/thai_10.mp4" },
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
      <div className="absolute top-8 left-4 z-50 md:top-16 md:left-10">
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
            <h1 className="text-3xl md:text-5xl font-black text-blue-500 tracking-wide">
              🇹🇭 เลขไทย (๑-๑๐)
            </h1>
        </div>

        {/* 3. Grid ปุ่มเลขไทย */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  // ✅ ส่งข้อมูลแบบ Playlist
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
                  w-[100px] h-[100px] md:w-[160px] md:h-[160px]
                  rounded-[2rem] /* มุมมนมากกว่าปกตินิดนึงเพื่อให้เข้ากับลายเส้นเลขไทย */
                  ${item.color} ${item.border} border-[6px]
                  text-white shadow-xl
                  transition-all duration-150
                  hover:scale-110 hover:-rotate-3
                  active:scale-95 active:shadow-none
                `}
              >
                {/* ตัวเลขไทย */}
                <span className="text-5xl md:text-8xl font-black drop-shadow-lg">
                  {item.num}
                </span>
                
                {/* ตกแต่งลายไทยจางๆ (วงกลมข้างหลัง) */}
                <div className="absolute inset-0 bg-white/10 rounded-full scale-75 blur-sm"></div>
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

export default MathReadThaiPage;