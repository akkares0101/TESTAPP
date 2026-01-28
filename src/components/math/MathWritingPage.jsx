import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function MathWritingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ✍️ ข้อมูลสอนเขียนเลข 0-9
  // ⚠️ เตรียมไฟล์วิดีโอ: write_0.mp4 ถึง write_9.mp4
  const lessons = [
    { id: 0, num: "0", title: "วิธีเขียนเลข 0", color: "bg-gray-500", border: "border-gray-600", video: "/videos/math/write_0.mp4" },
    { id: 1, num: "1", title: "วิธีเขียนเลข 1", color: "bg-red-500", border: "border-red-600", video: "/videos/math/write_1.mp4" },
    { id: 2, num: "2", title: "วิธีเขียนเลข 2", color: "bg-orange-500", border: "border-orange-600", video: "/videos/math/write_2.mp4" },
    { id: 3, num: "3", title: "วิธีเขียนเลข 3", color: "bg-yellow-400", border: "border-yellow-600", video: "/videos/math/write_3.mp4" },
    { id: 4, num: "4", title: "วิธีเขียนเลข 4", color: "bg-green-500", border: "border-green-600", video: "/videos/math/write_4.mp4" },
    { id: 5, num: "5", title: "วิธีเขียนเลข 5", color: "bg-teal-500", border: "border-teal-600", video: "/videos/math/write_5.mp4" },
    { id: 6, num: "6", title: "วิธีเขียนเลข 6", color: "bg-blue-500", border: "border-blue-600", video: "/videos/math/write_6.mp4" },
    { id: 7, num: "7", title: "วิธีเขียนเลข 7", color: "bg-indigo-500", border: "border-indigo-600", video: "/videos/math/write_7.mp4" },
    { id: 8, num: "8", title: "วิธีเขียนเลข 8", color: "bg-purple-500", border: "border-purple-600", video: "/videos/math/write_8.mp4" },
    { id: 9, num: "9", title: "วิธีเขียนเลข 9", color: "bg-pink-500", border: "border-pink-600", video: "/videos/math/write_9.mp4" },
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
            <h1 className="text-3xl md:text-5xl font-black text-blue-500 tracking-wide flex items-center gap-3">
              ✍️ ฝึกเขียนตัวเลข (0-9)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม 0-9 */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  // ✅ ส่งข้อมูลแบบ Playlist (0-9)
                  navigate('/lesson', { 
                    state: { 
                        playlist: lessons, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  w-[100px] h-[100px] md:w-[160px] md:h-[160px]
                  rounded-2xl
                  border-4 border-dashed border-gray-300 bg-white
                  hover:border-solid ${item.border.replace('border-', 'hover:border-')}
                  shadow-md hover:shadow-xl
                  transition-all duration-200
                  hover:scale-110 hover:-translate-y-2
                  active:scale-95
                `}
              >
                {/* ไอคอนดินสอเล็กๆ มุมขวาบน */}
                <span className="absolute top-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity">✏️</span>

                {/* ตัวเลข */}
                <span className={`text-6xl md:text-8xl font-black ${item.color.replace('bg-', 'text-')} opacity-80 group-hover:opacity-100`}>
                  {item.num}
                </span>

                {/* คำว่า "เขียน" เล็กๆ */}
                <span className="text-xs md:text-sm text-gray-400 mt-1 group-hover:text-gray-600">
                    ฝึกเขียน
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

export default MathWritingPage;