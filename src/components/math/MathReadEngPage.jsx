import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function MathReadEngPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔤 ข้อมูลเลข 1-10 + คำศัพท์อังกฤษ
  // ⚠️ เตรียมไฟล์วิดีโอ: eng_1.mp4 ถึง eng_10.mp4
  const lessons = [
    { id: 1, num: "1", text: "ONE", title: "Number ONE", color: "bg-red-500", shadow: "shadow-red-500/50", video: "/videos/math/eng_1.mp4" },
    { id: 2, num: "2", text: "TWO", title: "Number TWO", color: "bg-orange-500", shadow: "shadow-orange-500/50", video: "/videos/math/eng_2.mp4" },
    { id: 3, num: "3", text: "THREE", title: "Number THREE", color: "bg-yellow-400", shadow: "shadow-yellow-400/50", video: "/videos/math/eng_3.mp4" },
    { id: 4, num: "4", text: "FOUR", title: "Number FOUR", color: "bg-green-500", shadow: "shadow-green-500/50", video: "/videos/math/eng_4.mp4" },
    { id: 5, num: "5", text: "FIVE", title: "Number FIVE", color: "bg-teal-500", shadow: "shadow-teal-500/50", video: "/videos/math/eng_5.mp4" },
    { id: 6, num: "6", text: "SIX", title: "Number SIX", color: "bg-blue-500", shadow: "shadow-blue-500/50", video: "/videos/math/eng_6.mp4" },
    { id: 7, num: "7", text: "SEVEN", title: "Number SEVEN", color: "bg-indigo-500", shadow: "shadow-indigo-500/50", video: "/videos/math/eng_7.mp4" },
    { id: 8, num: "8", text: "EIGHT", title: "Number EIGHT", color: "bg-purple-500", shadow: "shadow-purple-500/50", video: "/videos/math/eng_8.mp4" },
    { id: 9, num: "9", text: "NINE", title: "Number NINE", color: "bg-pink-500", shadow: "shadow-pink-500/50", video: "/videos/math/eng_9.mp4" },
    { id: 10, num: "10", text: "TEN", title: "Number TEN", color: "bg-rose-500", shadow: "shadow-rose-500/50", video: "/videos/math/eng_10.mp4" },
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
              🇬🇧 English Numbers (นับเลข)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม 1-10 + คำศัพท์ */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  // ✅ ส่งข้อมูลแบบ Playlist ไปที่ LessonPage
                  navigate('/lesson', { 
                    state: { 
                        playlist: lessons,  // ส่งไปทั้งก้อน
                        initialIndex: index // บอกตำแหน่งที่กด
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  w-[110px] h-[110px] md:w-[170px] md:h-[170px]
                  rounded-3xl
                  ${item.color} 
                  shadow-[0_8px_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_rgba(0,0,0,0.2)]
                  border-4 border-white/20
                  transition-all duration-150
                  hover:scale-105 hover:translate-y-1
                  active:translate-y-2 active:shadow-none
                `}
              >
                {/* ตัวเลข */}
                <span className="text-4xl md:text-7xl font-black text-white drop-shadow-md mb-0 md:mb-2">
                  {item.num}
                </span>
                
                {/* คำศัพท์ (แถบขาวด้านล่าง) */}
                <div className="bg-white/90 rounded-full px-3 py-1 w-[80%] shadow-sm">
                    <span className={`text-sm md:text-lg font-bold uppercase tracking-wider ${item.color.replace('bg-', 'text-')}`}>
                        {item.text}
                    </span>
                </div>
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

export default MathReadEngPage;