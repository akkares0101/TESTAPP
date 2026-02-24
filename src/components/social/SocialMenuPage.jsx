import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม (แก้ไขตัวแปรให้ตรงกับความหมายของภาพตามรูปที่ส่งมาล่าสุด)
import imgReligion from '../../assets/images/social/21.png';
import imgImportantDays from '../../assets/images/social/22.png';
import imgCulture from '../../assets/images/social/23.png';
import imgFlag from '../../assets/images/social/24.png';
import imgFamily from '../../assets/images/social/25.png';
import imgRoutines from '../../assets/images/social/26.png';
import imgDressing from '../../assets/images/social/27.png';
import imgSelfCare from '../../assets/images/social/28.png';
import imgGame from '../../assets/images/social/btn_game.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function SocialMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // จัดเรียงลำดับตามรูปภาพ 21.png -> 28.png และปุ่มเกมตามที่คุณต้องการ
  const menuItems = [
    { id: 1, image: imgReligion, path: "/social/religion", title: "ศาสนา" },
    { id: 2, image: imgImportantDays, path: "/social/important-days", title: "วันสำคัญ" },
    { id: 3, image: imgCulture, path: "/social/culture", title: "วัฒนธรรม" },
    { id: 4, image: imgFlag, path: "/social/flag", title: "ธงชาติ" },
    { id: 5, image: imgFamily, path: "/social/family", title: "ครอบครัว" },
    { id: 6, image: imgRoutines, path: "/social/routines", title: "กิจวัตรประจำวัน" },
    { id: 7, image: imgDressing, path: "/social/dressing", title: "การแต่งกาย" },
    { id: 8, image: imgSelfCare, path: "/social/self-care", title: "การดูแลตัวเอง" },
    { id: 9, image: imgGame, path: "/social/game", title: "เกมสังคมศึกษา" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center gap-8 md:gap-12 z-10 px-4 w-full pt-10 pb-10"> 
        
        {/* หัวข้อ */}
        <div className="bg-white/90 backdrop-blur-sm px-10 py-3 md:px-12 md:py-4 rounded-full border-[6px] border-blue-400 shadow-[0_6px_0_#60a5fa] animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl font-black text-blue-600 tracking-wide">
              🗺️ สังคมศึกษา
            </h1>
        </div>

        {/* Container เมนู 9 ปุ่ม */}
        <div className="flex flex-wrap justify-center content-center gap-6 md:gap-10 max-w-[90rem]">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate(item.path);
                }}
                className="
                  group relative cursor-pointer
                  flex flex-col items-center justify-center
                  transition-transform duration-300 hover:scale-110 active:scale-95
                "
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                />
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

export default SocialMenuPage;