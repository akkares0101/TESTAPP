import React from 'react';

// โหลดเสียง (ใช้แบบ Global เพื่อให้โหลดครั้งเดียว)
const hoverSound = new Audio('/sounds/pop.mp3');
const clickSound = new Audio('/sounds/click.mp3');
hoverSound.volume = 0.4;
clickSound.volume = 0.8;

function MenuCard({ image, onClick, isMuted }) {

  const playHover = () => {
    if (!isMuted) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    }
  };

  const handleClick = () => {
    // 1. เล่นเสียง
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    
    // 2. สั่งให้ทำงาน (เรียกฟังก์ชันที่ App.jsx ส่งมา)
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      onMouseEnter={playHover}
      onClick={handleClick}
      className="
        group relative 
        /* ⭐ ปรับขนาดให้พอดีเป๊ะ: มือถือ w-32 -> แท็บเล็ต w-48 -> ทีวี w-[240px] */
        w-32 sm:w-40 md:w-48 lg:w-56 xl:w-[240px] 
        aspect-[4/3]
        cursor-pointer 
        flex items-center justify-center
        
        /* Animation: เด้งดึ๋ง */
        transition-transform duration-300
        hover:scale-110 hover:-rotate-2
        active:scale-95 active:rotate-0
        
        /* z-index เพื่อให้คลิกง่าย */
        z-10
      "
    >
      {/* ✨ แสงฟุ้งด้านหลัง (Glow) */}
      <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* 🖼️ รูปภาพปุ่ม */}
      <img 
        src={image} 
        alt="menu-icon" 
        className="
          relative z-10
          w-full h-full 
          object-contain 
          
          /* เงา */
          drop-shadow-lg 
          group-hover:drop-shadow-2xl
          
          transition-all duration-300
        " 
      />
    </div>
  );
}

export default MenuCard;