import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปกวิดีโอ (ถ้าไม่มีใช้รูปปุ่มเดิมแก้ขัดได้ครับ)
// ต้องตรวจสอบว่า path นี้มีรูปอยู่จริง หรือลบ import นี้ออกแล้วใช้ path รูปอื่น
import coverImg from '../../assets/images/science/btn_intro.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function ScienceIntroPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🧪 ข้อมูลวิดีโอ
  const lessons = [
    { 
      id: 1, 
      num: "1", 
      title: "วิทยาศาสตร์คืออะไร?", 
      video: "/videos/science/science_intro.mp4", // ⚠️ เตรียมไฟล์นี้นะครับ
      color: "bg-green-500", 
      border: "border-green-700" 
    },
  ];

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-green-500 shadow-[0_4px_0_#22c55e] mb-10 animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl font-black text-green-600 tracking-wide">
              🧪 บทนำ: วิทยาศาสตร์คืออะไร
            </h1>
        </div>

        {/* การ์ดเลือกวิดีโอ */}
        <div className="flex flex-wrap justify-center gap-8">
            {lessons.map((item, index) => (
                <div 
                    key={item.id}
                    onClick={() => {
                        playClick();
                        navigate('/lesson', { state: { playlist: lessons, initialIndex: index } });
                    }}
                    className="
                        group relative cursor-pointer
                        w-[280px] h-[200px] md:w-[400px] md:h-[280px]
                        bg-white rounded-3xl border-8 border-green-300 shadow-2xl
                        flex flex-col items-center justify-center overflow-hidden
                        hover:scale-105 hover:border-green-500 transition-all duration-300
                    "
                >
                    {/* ปุ่ม Play */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* ถ้ามีรูป coverImg ให้ใช้ ถ้าไม่มีให้ใช้สีพื้นแทน */}
                    <img 
                        src={coverImg} 
                        alt="Cover" 
                        className="w-full h-[70%] object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {e.target.style.display='none'}} 
                    />

                    {/* ชื่อคลิป */}
                    <div className="absolute bottom-0 w-full h-[30%] bg-green-100 flex items-center justify-center px-4">
                        <span className="text-xl md:text-2xl font-black text-green-700 truncate">{item.title}</span>
                    </div>
                </div>
            ))}
        </div>

      </div>
      <style>{` .animate-bounce-slow { animation: bounce 3s infinite; } `}</style>
    </div>
  );
}

export default ScienceIntroPage;