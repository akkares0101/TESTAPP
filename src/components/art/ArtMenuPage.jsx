import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม 10 ปุ่ม (ตั้งชื่อไฟล์ตามนี้หรือแก้ให้ตรงกับที่มีครับ)
import btnLine from '../../assets/images/art/btn_line.png';           // 1. เส้น
import btnColor from '../../assets/images/art/btn_color.png';         // 2. สีมหัศจรรย์
import btnShape from '../../assets/images/art/btn_shape.png';         // 3. รูปร่างรอบตัว
import btnTexture from '../../assets/images/art/btn_texture.png';     // 4. ลายและพื้นผิว
import btnCollage from '../../assets/images/art/btn_collage.png';     // 5. ตัด-ปะคอลลาจ
import btnPrint from '../../assets/images/art/btn_print.png';         // 6. พิมพ์ภาพ
import btnSculpture from '../../assets/images/art/btn_sculpture.png'; // 7. ปั้นและ 3 มิติ
import btnNature from '../../assets/images/art/btn_nature.png';       // 8. ศิลปะจากธรรมชาติ
import btnEmotion from '../../assets/images/art/btn_emotion.png';     // 9. ศิลปะกับอารมณ์
import btnDaily from '../../assets/images/art/btn_daily.png';         // 10. ศิลปะในชีวิตประจำวัน

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
             group flex items-center gap-3 bg-white text-pink-500 px-6 py-3 rounded-full shadow-lg border-4 border-white hover:border-pink-100 hover:scale-105 active:scale-95 transition-all
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
        <div className="relative z-10 bg-white px-12 py-3 rounded-full border-[6px] border-pink-400 shadow-[0_6px_0_#f472b6] mb-10 animate-bounce-slow">
            <h1 className="text-4xl md:text-6xl font-black text-pink-500 tracking-wide">
              ศิลปะ
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

export default ArtMenuPage;