import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม 10 ปุ่ม
import btnNation from '../../assets/images/social/btn_nation.png';
import btnReligion from '../../assets/images/social/btn_religion.png';
import btnCulture from '../../assets/images/social/btn_culture.png';
import btnDays from '../../assets/images/social/btn_days.png';
import btnFamily from '../../assets/images/social/btn_family.png';
import btnBehave from '../../assets/images/social/btn_behave.png';
import btnSelfCare from '../../assets/images/social/btn_selfcare.png';
import btnExercise from '../../assets/images/social/btn_exercise.png';
import btnPractice from '../../assets/images/social/btn_practice.png';
import btnGame from '../../assets/images/social/btn_game.png';

const clickSound = new Audio('/sounds/click.mp3');

function SocialMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnNation, path: "/social/nation", title: "ชาติ" },
    { id: 2, image: btnReligion, path: "/social/religion", title: "ศาสนา" },
    { id: 3, image: btnCulture, path: "/social/culture", title: "วัฒนธรรม" },
    { id: 4, image: btnDays, path: "/social/days", title: "วันสำคัญ" },
    { id: 5, image: btnFamily, path: "/social/family", title: "ครอบครัว" },
    { id: 6, image: btnBehave, path: "/social/manners", title: "ปฏิบัติตัว" },
    { id: 7, image: btnSelfCare, path: "/social/selfcare", title: "ดูแลตัวเอง" },
    { id: 8, image: btnExercise, path: "/social/exercise", title: "แบบฝึกหัด" },
    { id: 9, image: btnPractice, path: "/social/practice", title: "การปฏิบัติ" },
    { id: 10, image: btnGame, path: "/social/game", title: "เกม" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      
      {/* ❌ ลบปุ่มกลับหน้าหลักออกแล้วครับ */}

      {/* เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10"> 
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
              สังคมศึกษา
            </h1>
        </div>

        {/* Grid เมนู 10 ปุ่ม */}
        <div className="flex flex-wrap justify-center content-center gap-4 md:gap-8 w-full max-w-[95rem]">
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
                  /* ⭐⭐⭐ ปรับลดขนาดลงตรงนี้ครับ ⭐⭐⭐ */
                  w-auto 
                  h-[130px]      /* มือถือ: ลดจาก 180 เหลือ 130 */
                  md:h-[220px]   /* จอคอม: ลดจาก 300 เหลือ 220 */
                  
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

export default SocialMenuPage;