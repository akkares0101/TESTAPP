import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function MathReadArabicPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };
//เตรียมไฟล์วิดีโอชื่อ arabic_1.mp4 ถึง arabic_10.mp4
  // ข้อมูลเลข 1-10 (ตัวเลขอารบิก)
  const lessons = [
    { id: 1, num: "1", title: "เลข 1 (อารบิก)", color: "bg-red-500", border: "border-red-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_1.mp4" },
    { id: 2, num: "2", title: "เลข 2 (อารบิก)", color: "bg-orange-500", border: "border-orange-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_2.mp4" },
    { id: 3, num: "3", title: "เลข 3 (อารบิก)", color: "bg-yellow-400", border: "border-yellow-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_3.mp4" },
    { id: 4, num: "4", title: "เลข 4 (อารบิก)", color: "bg-green-500", border: "border-green-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_4.mp4" },
    { id: 5, num: "5", title: "เลข 5 (อารบิก)", color: "bg-teal-500", border: "border-teal-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_5.mp4" },
    { id: 6, num: "6", title: "เลข 6 (อารบิก)", color: "bg-blue-500", border: "border-blue-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_6.mp4" },
    { id: 7, num: "7", title: "เลข 7 (อารบิก)", color: "bg-indigo-500", border: "border-indigo-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_7.mp4" },
    { id: 8, num: "8", title: "เลข 8 (อารบิก)", color: "bg-purple-500", border: "border-purple-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_8.mp4" },
    { id: 9, num: "9", title: "เลข 9 (อารบิก)", color: "bg-pink-500", border: "border-pink-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_9.mp4" },
    { id: 10, num: "10", title: "เลข 10 (อารบิก)", color: "bg-rose-500", border: "border-rose-600", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/arabic_10.mp4" },
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

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-blue-400 shadow-[0_4px_0_#60a5fa] mb-8 animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl font-black text-blue-500 tracking-wide">
              🔢 ตัวเลขอารบิก (1-10)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม 1-10 (ดีไซน์แบบ Block สี่เหลี่ยมแข็งแรง) */}
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
                  rounded-2xl
                  ${item.color} ${item.border} border-b-[8px] border-r-[8px]
                  text-white shadow-xl
                  transition-all duration-150
                  hover:scale-105 hover:-translate-y-2
                  active:border-b-0 active:border-r-0 active:translate-y-2 active:translate-x-2 active:shadow-none
                `}
              >
                <span className="text-5xl md:text-8xl font-black drop-shadow-md">
                  {item.num}
                </span>
                
                {/* ลายน้ำจางๆ ด้านหลัง */}
                <span className="absolute text-9xl opacity-10 pointer-events-none -rotate-12">
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

export default MathReadArabicPage;