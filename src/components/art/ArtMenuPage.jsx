import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม 8 ปุ่ม
import btnVisualElements from '../../assets/images/art/btn_1.png'; // ทัศนธาตุ
import btnColoring from '../../assets/images/art/btn_2.png';             // ฝึกระบายสี
import btnTexture from '../../assets/images/art/btn_3.png';               // พื้นผิวในศิลปะ
import btnBeautifulWorld from '../../assets/images/art/btn_4.png'; // โลกสวยเพราะมีสีสัน
import btnColorTone from '../../assets/images/art/btn_5.png';           // วรรณะของสี
import btnLineArt from '../../assets/images/art/btn_6.png';               // เส้นงานในศิลปะ
import btnArtTools from '../../assets/images/art/btn_7.png';             // อุปกรณ์สร้างงานศิลปะ
import btnArtGame from '../../assets/images/art/btn_8.png';               // เกมศิลปะ 

const clickSound = new Audio('/sounds/click.mp3');

function ArtMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnVisualElements, path: "/art/visual-elements", title: "ทัศนธาตุ" },
    { id: 2, image: btnColoring, path: "/art/coloring", title: "ฝึกระบายสี" },
    { id: 3, image: btnTexture, path: "/art/texture", title: "พื้นผิวในศิลปะ" },
    { id: 4, image: btnBeautifulWorld, path: "/art/beautiful-world", title: "โลกสวยเพราะมีสีสัน" },
    { id: 5, image: btnColorTone, path: "/art/color-tone", title: "วรรณะของสี" },
    { id: 6, image: btnLineArt, path: "/art/line-art", title: "เส้นงานในศิลปะ" },
    { id: 7, image: btnArtTools, path: "/art/tools", title: "อุปกรณ์สร้างงานศิลปะ" },
    { id: 8, image: btnArtGame, path: "/art/game", title: "เกมศิลปะ" }, 
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-8"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* เนื้อหาหลัก */}
      <div className="flex flex-col items-center gap-6 md:gap-10 z-10 px-4 w-full"> 
        
        {/* หัวข้อ (ปรับขนาดให้พอดีจอ) */}
        <div className="bg-white/90 backdrop-blur-sm px-10 py-2.5 md:px-14 md:py-3.5 rounded-full border-[4px] md:border-[6px] border-pink-400 shadow-[0_4px_0_#f472b6] md:shadow-[0_6px_0_#f472b6] animate-bounce-slow mb-2">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-pink-500 tracking-wide">
              🎨 ศิลปะ
            </h1>
        </div>

        {/* Container เมนู 8 ปุ่ม (บีบ max-width ให้ปุ่มเกาะกลุ่มกันตรงกลาง) */}
        <div className="flex flex-wrap justify-center content-center gap-4 md:gap-8 lg:gap-10 max-w-[85rem]">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  playClick();
                  if (item.path) navigate(item.path);
                }}
                className="
                  group relative cursor-pointer
                  flex flex-col items-center justify-center
                  transition-transform duration-300 hover:scale-110 active:scale-95
                "
              >
                {/* ⭐ ปรับขนาดรูปปุ่มให้พอดีกับจอทีวี ไม่ใหญ่จนล้น */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all"
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

export default ArtMenuPage;