import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม 10 ปุ่ม
import btnLine from '../../assets/images/art/btn_line.png';           
import btnColor from '../../assets/images/art/btn_color.png';         
import btnShape from '../../assets/images/art/btn_shape.png';         
import btnTexture from '../../assets/images/art/btn_texture.png';     
import btnCollage from '../../assets/images/art/btn_collage.png';     
import btnPrint from '../../assets/images/art/btn_print.png';         
import btnSculpture from '../../assets/images/art/btn_sculpture.png'; 
import btnNature from '../../assets/images/art/btn_nature.png';       
import btnEmotion from '../../assets/images/art/btn_emotion.png';     
import btnDaily from '../../assets/images/art/btn_daily.png';         

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
    { id: 1, image: btnLine, path: "/art/line", title: "เส้น" },
    { id: 2, image: btnColor, path: "/art/color", title: "สีมหัศจรรย์" },
    { id: 3, image: btnShape, path: "/art/shape", title: "รูปร่างรอบตัว" },
    { id: 4, image: btnTexture, path: "/art/texture", title: "ลายและพื้นผิว" },
    { id: 5, image: btnCollage, path: "/art/collage", title: "ตัด-ปะคอลลาจ" },
    { id: 6, image: btnPrint, path: "/art/print", title: "พิมพ์ภาพ" },
    { id: 7, image: btnSculpture, path: "/art/sculpture", title: "ปั้นและ 3 มิติ" },
    { id: 8, image: btnNature, path: "/art/nature", title: "ศิลปะจากธรรมชาติ" },
    { id: 9, image: btnEmotion, path: "/art/emotion", title: "ศิลปะกับอารมณ์" },
    { id: 10, image: btnDaily, path: "/art/daily", title: "ศิลปะในชีวิตประจำวัน" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* เนื้อหาหลัก */}
      <div className="flex flex-col items-center gap-8 md:gap-12 z-10 px-4 w-full"> 
        
        {/* หัวข้อ */}
        <div className="bg-white/90 backdrop-blur-sm px-12 py-4 rounded-full border-[6px] border-pink-400 shadow-[0_6px_0_#f472b6] animate-bounce-slow">
            <h1 className="text-3xl md:text-5xl font-black text-pink-500 tracking-wide">
              🎨 ศิลปะ
            </h1>
        </div>

        {/* Grid เมนู 10 ปุ่ม */}
        {/* ปรับขนาด Container ให้กว้างขึ้นเพื่อรองรับปุ่มใหญ่ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 max-w-[90rem]">
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
                {/* ✅ ปรับขนาดรูปปุ่มตรงนี้ 
                   w-36 h-36 (มือถือ) 
                   md:w-52 md:h-52 (จอใหญ่) 
                */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-36 h-36 md:w-52 md:h-52 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
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