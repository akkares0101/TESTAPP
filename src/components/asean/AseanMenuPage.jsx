import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปภาพจริง 7 รูป (ตรวจสอบชื่อไฟล์ให้ตรงกับในโฟลเดอร์ asean นะครับ)
import btnFlag from '../../assets/images/asean/btn_flag.png';
import btnGreeting from '../../assets/images/asean/btn_greeting.png';
import btnFood from '../../assets/images/asean/btn_food.png';
import btnAnimal from '../../assets/images/asean/btn_animal.png';
import btnGame from '../../assets/images/asean/btn_game.png';
import btnCostume from '../../assets/images/asean/btn_costume.png';
import btnFlower from '../../assets/images/asean/btn_flower.png';

const clickSound = new Audio('/sounds/click.mp3');

function AseanMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, title: "ธงชาติ", path: "/asean/flags", image: btnFlag },
    { id: 2, title: "คำทักทาย", path: "/asean/greetings", image: btnGreeting },
    { id: 3, title: "อาหารประจำชาติ", path: "/asean/national-dishes", image: btnFood },
    { id: 4, title: "สัตว์ประจำชาติ", path: "/asean/national-animals", image: btnAnimal },
    { id: 5, title: "เกม", path: "/asean/game-menu", image: btnGame },
    { id: 6, title: "การแต่งกายประจำชาติ", path: "/asean/national-costumes", image: btnCostume },
    { id: 7, title: "ดอกไม้ประจำชาติ", path: "/asean/national-flowers", image: btnFlower },
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

      {/* เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10"> 
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_4px_0_#fb923c] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 tracking-wide">
              อาเซียน (ASEAN)
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
                  /* ขนาดปุ่มใหญ่มาตรฐาน */
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

export default AseanMenuPage;