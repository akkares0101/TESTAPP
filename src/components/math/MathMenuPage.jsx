import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png'; // พื้นหลังเดียวกัน

// --- Import รูปภาพของหน้านั้นๆ ---
import btnCount from '../../assets/images/math/btn_count.png';           
import btnReadEng from '../../assets/images/math/btn_read_eng.png';     
import btnReadArabic from '../../assets/images/math/btn_read_arabic.png'; 
import btnReadThai from '../../assets/images/math/btn_read_thai.png';   
import btnWrite from '../../assets/images/math/btn_write.png';           
import btnGame from '../../assets/images/math/btn_game.png';             
import btnMoney from '../../assets/images/math/btn_money.png';           

const clickSound = new Audio('/sounds/click.mp3');

function MathMenuPage({ isMuted }) { // ⭐ เปลี่ยนชื่อ Function ตามหน้านั้นๆ (เช่น ArtMenuPage)
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ⭐ เปลี่ยนข้อมูลในนี้ตามวิชา (จำนวนปุ่มจะมากน้อย ระบบจะจัดกลางให้เอง)
  const menuItems = [
    { id: 1, image: btnCount, path: "/math/counting", title: "สอนนับ" },
    { id: 2, image: btnReadEng, path: "/math/read-eng", title: "สอนอ่าน(อังกฤษ)" },
    { id: 3, image: btnReadArabic, path: "/math/read-arabic", title: "สอนอ่าน(อารบิก)" },
    { id: 4, image: btnReadThai, path: "/math/read-thai", title: "สอนอ่าน(ไทย)" },
    { id: 5, image: btnWrite, path: "/math/writing", title: "สอนเขียน" },
    { id: 6, image: btnGame, path: "/math/game", title: "เกมตัวเลข" },
    { id: 7, image: btnMoney, path: "/math/money", title: "เงิน" },
  ];

  return (
    // 1️⃣ CONTAINER หลัก: ล็อคความสูงเท่าจอ (h-screen)
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 2️⃣ ปุ่มย้อนกลับ: ตำแหน่งเดิมเป๊ะๆ ทุกหน้า */}
      <div className="absolute top-4 left-4 z-50 md:top-8 md:left-8"> 
         <button 
          onClick={() => navigate('/')} 
          // เปลี่ยนสี text-... border-... hover:border-... ตามธีมสีวิชาได้
          className="
             group flex items-center gap-3 bg-white text-blue-500 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-blue-100 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">กลับหน้าหลัก</span>
        </button>
      </div>

      {/* 3️⃣ พื้นที่เนื้อหา: จัดกึ่งกลาง (justify-center) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10"> 
        
        {/* หัวข้อ: ขนาด font เท่าเดิมทุกหน้า */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-blue-400 shadow-[0_4px_0_#60a5fa] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-blue-500 tracking-wide">
              คณิตศาสตร์ {/* ⭐ เปลี่ยนชื่อวิชา */}
            </h1>
        </div>

        {/* 4️⃣ Grid ปุ่มเมนู: ใช้ Flex Wrap จัดกลาง */}
        <div className="flex flex-wrap justify-center content-center gap-4 md:gap-8 w-full max-w-[90rem]">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  playClick();
                  if (item.path) navigate(item.path);
                }}
                className="
                  group relative cursor-pointer
                  flex items-center justify-center
                  /* ⭐ ขนาดปุ่มมาตรฐาน: มือถือ 140px / จอใหญ่ 240px */
                  w-auto h-[140px] md:h-[240px] 
                  transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
                />
              </div>
            ))}
        </div>

      </div>
      
      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default MathMenuPage; 