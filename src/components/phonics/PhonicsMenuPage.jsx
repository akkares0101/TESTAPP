import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม 7 ปุ่ม (สร้างโฟลเดอร์ phonics ไว้ใน assets/images ด้วยนะครับ)
// ถ้ายังไม่มีรูปจริง ให้ใช้รูปชั่วคราว (เช่น btn_learn.png เดิม) ไปก่อนได้ครับ
import btnSound from '../../assets/images/phonics/btn_sound.png';       // 1. เสียงตัวอักษร
import btnCompare from '../../assets/images/phonics/btn_compare.png';   // 2. เทียบอักษร
import btnVowel from '../../assets/images/phonics/btn_vowel.png';       // 3. สระในภาษาอังกฤษ
import btnSpell from '../../assets/images/phonics/btn_spell.png';       // 4. ฝึกสะกดคำ
import btnRead from '../../assets/images/phonics/btn_read.png';         // 5. ฝึกอ่าน
import btnGame from '../../assets/images/phonics/btn_game.png';         // 6. เกมทายคำศัพท์
import btnExercise from '../../assets/images/phonics/btn_exercise.png'; // 7. แบบฝึกหัด

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, title: "เสียงตัวอักษร", path: "/phonics/sounds", image: btnSound },
    { id: 2, title: "เทียบอักษร", path: "/phonics/mapping", image: btnCompare },
    { id: 3, title: "สระภาษาอังกฤษ", path: "/phonics/vowels", image: btnVowel },
    { id: 4, title: "ฝึกสะกดคำ", path: "/phonics/spelling", image: btnSpell },
    { id: 5, title: "ฝึกอ่าน", path: "/phonics/reading", image: btnRead },
    { id: 6, title: "เกมทายคำศัพท์", path: "/phonics/game", image: btnGame },
    { id: 7, title: "แบบฝึกหัด", path: "/phonics/exercises", image: btnExercise },
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
      {/* ปุ่มย้อนกลับ (ธีมสีม่วง) */}
      <div className="absolute top-8 left-4 z-50 md:top-40 md:left-70"> 
         <button 
          onClick={() => navigate('/')} 
          className="
             group flex items-center gap-3 bg-white text-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-purple-200 hover:scale-105 active:scale-95 transition-all
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
        
        {/* หัวข้อ (ธีมสีม่วง) */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-purple-600 tracking-wide">
              Phonics (โฟนิคส์)
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

export default PhonicsMenuPage;