import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const btnIntro = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_intro.png";
const btnAnimals = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_animals.png";
const btnOrgans = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_organs.png";
const btnEnvironment = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_environment.png";
const btnSorting = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_sorting.png";
const btnReviewEnv = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_review_env.png";
const btnReviewBody = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/science/btn_review_body.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function ScienceMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, title: "วิทยาศาสตร์คืออะไร", path: "/science/intro", image: btnIntro },
    { id: 2, title: "สิ่งมีชีวิตที่เป็นสัตว์", path: "/science/animals", image: btnAnimals },
    { id: 3, title: "เกมหน้าที่ของอวัยวะ", path: "/science/organs-game", image: btnOrgans },
    { id: 4, title: "สิ่งแวดล้อม", path: "/science/environment", image: btnEnvironment },
    { id: 5, title: "แยกสิ่งมีชีวิต/ไม่มีชีวิต", path: "/science/sorting", image: btnSorting },
    { id: 6, title: "ทบทวนสิ่งแวดล้อม", path: "/science/review-env", image: btnReviewEnv },
    { id: 7, title: "ทบทวนเรื่องตัวเรา", path: "/science/review-body", image: btnReviewBody },
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

      {/* เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10"> 
        
        {/* หัวข้อ (ธีมสีเขียว) */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-green-500 shadow-[0_4px_0_#22c55e] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-green-600 tracking-wide">
              วิทยาศาสตร์
            </h1>
        </div>

        {/* Grid เมนู 7 ปุ่ม */}
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

export default ScienceMenuPage;