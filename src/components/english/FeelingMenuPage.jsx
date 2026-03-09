import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// Import รูปภาพประกอบ
const imgFeeling = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/img_feeling_card.png";
const imgMovement = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/img_movement_card.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function FeelingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

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
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-8 px-4">
        
        {/* 2. หัวข้อ "Feeling and Movement" */}
        <div className="relative z-10 bg-white px-8 py-3 rounded-full border-[5px] border-emerald-400 shadow-[0_5px_0_#34d399] mb-6 animate-bounce-slow">
            <h1 className="text-2xl md:text-4xl font-black text-gray-700 tracking-wide flex items-center gap-3">
              ✨ Feeling and Movement ✨
            </h1>
        </div>

        {/* 3. Grid ปุ่มเมนู (ลดขนาดลง 50%) */}
        {/* ปรับ gap ให้ชิดกันมากขึ้น */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 w-full items-center">
          
          {/* --- ปุ่ม Feeling --- */}
          <div
            onClick={() => { playClick(); navigate('/feeling/emotions'); }}
            className="
              group relative cursor-pointer 
              /* ✅ ปรับขนาดเล็กลง 50% */
              w-36 h-36 md:w-60 md:h-60 
              transition-transform duration-300 hover:scale-110 hover:-rotate-3
              flex items-center justify-center
            "
          >
             <img 
               src={imgFeeling} 
               alt="Feeling" 
               className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] transition-all" 
             />
          </div>

          {/* --- ปุ่ม Movement --- */}
          <div
            onClick={() => { playClick(); navigate('/feeling/movement'); }}
            className="
              group relative cursor-pointer 
              /* ✅ ปรับขนาดเล็กลง 50% */
              w-36 h-36 md:w-60 md:h-60 
              transition-transform duration-300 hover:scale-110 hover:rotate-3
              flex items-center justify-center
            "
          >
             <img 
               src={imgMovement} 
               alt="Movement" 
               className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] transition-all" 
             />
          </div>

        </div>

      </div>
      
      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default FeelingMenuPage;