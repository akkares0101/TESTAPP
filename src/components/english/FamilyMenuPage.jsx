import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม (เตรียมรูปให้พร้อมนะครับ)
import btnLearn from '../../assets/images/buttons/btn_learn.png'; // รูปปุ่มเรียน
import btnGame from '../../assets/images/buttons/btn_game.png';   // รูปปุ่มเกม

const clickSound = new Audio('/sounds/click.mp3');

function FamilyMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { 
      id: 1, 
      image: btnLearn, 
      path: "/family/learn", // ลิงค์ไปหน้าเรียน (เดี๋ยวไปเพิ่ม Route ใน App.jsx)
      title: "Family Vocabulary" 
    },
    { 
      id: 2, 
      image: btnGame, 
      path: "/family/game", // ลิงค์ไปหน้าเกม (เดี๋ยวไปเพิ่ม Route ใน App.jsx)
      title: "Family Game" 
    },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ปุ่มย้อนกลับ */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/alphabet')} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center">◀</span>
          <span className="hidden md:inline font-black text-lg">ย้อนกลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-10 py-4 rounded-full border-[6px] border-orange-400 shadow-[0_6px_0_#fb923c] mb-6">
            <h1 className="text-3xl md:text-5xl font-black text-gray-700 tracking-wide flex items-center gap-3">
              👨‍👩‍👧‍👦 Family (ครอบครัว)
            </h1>
        </div>

        {/* ปุ่มเมนู 2 ปุ่มใหญ่ */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
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
                  /* ขนาดปุ่มใหญ่ */
                  w-[200px] h-[200px] 
                  md:w-[300px] md:h-[300px]
                  /* Animation */
                  transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                  hover:scale-110 hover:-rotate-2
                  active:scale-95 active:rotate-0
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="
                    w-full h-full object-contain
                    drop-shadow-lg group-hover:drop-shadow-2xl
                    transition-all duration-300
                  "
                />
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default FamilyMenuPage;