import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม (ตั้งชื่อไฟล์ตามนี้หรือแก้ให้ตรงกับที่มีครับ)
// ถ้ายังไม่มีรูปจริง ให้ใช้รูปชั่วคราว (tempImg) ไปก่อนได้ครับ
import btnIntro from '../../assets/images/science/btn_intro.png';           // 1. วิทยาศาสตร์คืออะไร
import btnAnimals from '../../assets/images/science/btn_animals.png';       // 2. สิ่งมีชีวิตที่เป็นสัตว์
import btnOrgans from '../../assets/images/science/btn_organs.png';         // 3. เกมหน้าที่ของอวัยวะภายนอก
import btnEnvironment from '../../assets/images/science/btn_environment.png'; // 4. สิ่งแวดล้อมที่อยู่รอบตัวเรา
import btnSorting from '../../assets/images/science/btn_sorting.png';       // 5. แยกขยะสิ่งมีชีวิตและสิ่งไม่มีชีวิต
import btnReviewEnv from '../../assets/images/science/btn_review_env.png';  // 6. ทบทวนสิ่งแวดล้อมที่อยู่รอบตัวเรา
import btnReviewBody from '../../assets/images/science/btn_review_body.png'; // 7. ทบทวนเรื่องตัวเรา

const clickSound = new Audio('/sounds/click.mp3');

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
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ปุ่มย้อนกลับ (ตำแหน่งเดียวกับหน้าอื่นๆ) */}
      <div className="absolute top-8 left-4 z-50 md:top-45 md:left-80"> 
         <button 
          onClick={() => navigate('/')} 
          className="
             group flex items-center gap-3 bg-white text-green-600 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-green-200 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">กลับหน้าหลัก</span>
        </button>
      </div>

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
                  /* ขนาดปุ่มใหญ่สะใจ (ตามมาตรฐานหน้าอื่นๆ) */
                  w-auto 
                  h-[180px]      
                  md:h-[300px]   
                  
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