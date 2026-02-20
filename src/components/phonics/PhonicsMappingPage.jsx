import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsMappingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🎥 Path วิดีโอหลัก
  const mainVideoPath = "/videos/phonics/phonics_mapping.mp4"; 

  const lessons = [
    { 
      id: 1, 
      title: "พยัญชนะ", 
      subTitle: "Consonants",
      desc: "เทียบเสียง B, C, D, F...",
      video: mainVideoPath, 
      // ธีมสีฟ้า
      bgGradient: "from-cyan-400 to-blue-500",
      shadowColor: "shadow-blue-400",
      icon: "🗣️",
      decor: "B C D F G H..." 
    },
    { 
      id: 2, 
      title: "สระ", 
      subTitle: "Vowels",
      desc: "เทียบเสียง A, E, I, O, U",
      video: `${mainVideoPath}#t=78`, // เริ่มนาทีที่ 1:18 (78 วินาที)
      // ธีมสีชมพู
      bgGradient: "from-pink-400 to-rose-500",
      shadowColor: "shadow-rose-400",
      icon: "🅰️",
      decor: "A E I O U",
      badge: "เริ่มนาทีที่ 1:18 ⏩"
    }
  ];

  const playlistItems = lessons.map((item, index) => ({
    ...item,
    num: index + 1,
    title: `${item.title} (${item.subTitle})`
  }));

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
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pb-10">
        
        {/* หัวข้อ (ตกแต่งใหม่) */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm px-10 py-3 rounded-full border-[5px] border-purple-400 shadow-[0_8px_0_rgba(168,85,247,0.4)] mb-12 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-wide drop-shadow-sm">
              🔠 เทียบเสียง (Mapping)
            </h1>
        </div>

        {/* Container การ์ด 2 ใบ */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full justify-center items-center max-w-5xl">
            {playlistItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: playlistItems, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative overflow-hidden
                  flex flex-col items-center justify-between
                  w-full max-w-[320px] md:max-w-[380px]
                  h-[200px] md:h-[280px]
                  rounded-[2.5rem]
                  bg-gradient-to-br ${item.bgGradient}
                  border-[6px] border-white/40
                  shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]
                  ${item.shadowColor ? `hover:${item.shadowColor}/50` : ''}
                  transition-all duration-300
                  hover:scale-105 hover:-translate-y-2
                  active:scale-95 active:shadow-none
                `}
              >
                {/* ลวดลายพื้นหลังจางๆ */}
                <span className="absolute -top-4 -left-4 text-9xl text-white/10 font-black rotate-12 select-none">
                    {index === 0 ? "ABC" : "AEIOU"}
                </span>
                
                {/* 🔵 Badge (ป้ายบอกเวลาสำหรับสระ) */}
                {item.badge && (
                    <div className="absolute top-4 right-4 bg-white text-rose-500 px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-md animate-pulse">
                        {item.badge}
                    </div>
                )}

                {/* ส่วนเนื้อหาตรงกลาง */}
                <div className="flex flex-col items-center justify-center flex-1 z-10 pt-4">
                    {/* ไอคอนใหญ่ */}
                    <div className="text-5xl md:text-7xl mb-2 drop-shadow-md grayscale-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </div>

                    {/* ชื่อหัวข้อหลัก */}
                    <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-wide">
                        {item.title}
                    </h2>
                    
                    {/* ชื่อรอง (ภาษาอังกฤษ) */}
                    <span className="text-white/90 text-sm md:text-lg font-bold tracking-wider uppercase bg-black/10 px-4 py-0.5 rounded-full mt-1">
                        {item.subTitle}
                    </span>
                </div>

                {/* ส่วนล่าง (คำอธิบาย) */}
                <div className="w-full bg-black/20 backdrop-blur-sm py-3 px-4 z-10 border-t border-white/20">
                    <p className="text-white text-sm md:text-lg font-medium truncate w-full text-center">
                        {item.decor}
                    </p>
                </div>
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

export default PhonicsMappingPage;