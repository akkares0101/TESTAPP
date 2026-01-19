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
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ปุ่มย้อนกลับ */}
      <div className="absolute top-8 left-4 z-20 md:top-32 md:left-10"> 
         <button 
          onClick={() => navigate('/')} 
          className="
             group flex items-center gap-3 bg-white text-orange-500 px-6 py-3 rounded-full shadow-lg border-4 border-white hover:border-orange-100 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-xl">กลับหน้าหลัก</span>
        </button>
      </div>

      {/* เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-32 md:pt-48"> 
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-12 py-3 rounded-full border-[6px] border-orange-400 shadow-[0_6px_0_#fb923c] mb-10 animate-bounce-slow">
            <h1 className="text-4xl md:text-6xl font-black text-orange-500 tracking-wide">
              สังคมศึกษา
            </h1>
        </div>

        {/* Grid เมนู 10 ปุ่ม (5x2) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 w-full max-w-[90rem]">
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
                  /* ⭐ ปรับขนาดตรงนี้ครับ (ให้ใหญ่ขึ้น) */
                  w-auto h-[160px] md:h-[240px]
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