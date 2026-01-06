import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่มไทย
import btnThai1 from '../../assets/images/thai.png';    
import btnThai2 from '../../assets/images/eng.png';     
import btnThai3 from '../../assets/images/math.png';    
import btnThai4 from '../../assets/images/sci.png';     
import btnThai5 from '../../assets/images/cont.png';    
import btnThai6 from '../../assets/images/draw.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function ThaiAlphabetPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnThai1, path: "/thai-alphabet/learn", title: "ก-ฮ" },
    { id: 2, image: btnThai2, path: "/thai-vowels", title: "สระ" },
    { id: 3, image: btnThai3, path: "/thai-tones", title: "วรรณยุกต์" },
    { id: 4, image: btnThai4, path: "/thai-spelling", title: "ตัวสะกด" },
    { id: 5, image: btnThai5, path: "/thai-numbers", title: "เลขไทย" },
    { id: 6, image: btnThai6, path: "/thai-reading", title: "ฝึกอ่าน" },
  ];

  const topRow = menuItems.slice(0, 3);
  const bottomRow = menuItems.slice(3, 6);

  const renderButton = (item) => (
    <div
      key={item.id}
      onClick={() => { playClick(); if (item.path) navigate(item.path); }}
      className="
        group relative cursor-pointer
        flex items-center justify-center
        
        /* ⭐ ปรับขนาดให้ใหญ่ขึ้นตรงนี้ครับ ⭐ */
        w-[160px] h-[160px] 
        md:w-[240px] md:h-[240px]
        
        /* Animation */
        transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        hover:scale-110 hover:-rotate-2
        active:scale-95 active:rotate-0
      "
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="
          w-full h-full object-contain
          drop-shadow-lg group-hover:drop-shadow-2xl
          transition-all duration-300
        "
      />
    </div>
  );

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* 1. ปุ่มย้อนกลับ */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/')} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-lg">กลับหน้าหลัก</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] gap-8 px-4 mt-2">
        
        {/* 2. หัวข้อพื้นหลังสีส้ม */}
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-10 py-3 rounded-full border-4 border-white">
           ภาษาไทย
        </h1>

        {/* 3. Grid ปุ่มเมนู */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {topRow.map(renderButton)}
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {bottomRow.map(renderButton)}
            </div>
        </div>

      </div>
    </div>
  );
}

export default ThaiAlphabetPage;