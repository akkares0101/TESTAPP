import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// ⭐ Import รูปปุ่ม
const btnLearn = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_learn.png";
const btnGame = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_game.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

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
      path: "/family/learn", 
      title: "Family Vocabulary" 
    },
    { 
      id: 2, 
      image: btnGame, 
      path: "/family/game", 
      title: "Family Game" 
    },
  ];

  return (
    <div 
      className="h-full min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >

      {/* 2. เนื้อหาหลัก (เอา -mt ออกเพื่อให้จัดกึ่งกลางพอดีเป๊ะ) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[90rem] gap-6 md:gap-12 px-4 py-10">
        
        {/* หัวข้อ (ปรับขนาดให้ไล่ระดับตามจอ) */}
        <div className="relative z-10 bg-orange-400/90 px-8 py-3 md:px-16 md:py-4 rounded-full border-[4px] md:border-[6px] border-white shadow-lg animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-md tracking-wide">
              👨‍👩‍👧‍👦 Family (ครอบครัว)
            </h1>
        </div>

        {/* 3. ปุ่มเมนู 2 ปุ่มใหญ่ (Grid) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-20 w-full">
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
                  
                  /* ⭐ ปรับขนาดให้ไล่สเต็ปอย่างสมดุล ไม่ใหญ่ทะลุจอทีวี */
                  w-48 h-48                 /* มือถือ */
                  sm:w-56 sm:h-56           /* มือถือแนวนอน */
                  md:w-64 md:h-64           /* แท็บเล็ต */
                  lg:w-72 lg:h-72           /* โน๊ตบุ๊ค */
                  xl:w-[320px] xl:h-[320px] /* ทีวี (หยุดใหญ่แค่นี้) */

                  transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                  hover:scale-110 hover:-rotate-2
                  active:scale-95 active:rotate-0
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

export default FamilyMenuPage;