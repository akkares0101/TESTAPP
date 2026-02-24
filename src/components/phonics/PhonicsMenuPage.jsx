import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปปุ่ม 7 ปุ่ม
import btnSound from '../../assets/images/phonics/btn_sound.png';       
import btnCompare from '../../assets/images/phonics/btn_compare.png';   
import btnVowel from '../../assets/images/phonics/btn_vowel.png';       
import btnSpell from '../../assets/images/phonics/btn_spell.png';       
import btnRead from '../../assets/images/phonics/btn_read.png';         
import btnGame from '../../assets/images/phonics/btn_game.png';         
import btnExercise from '../../assets/images/phonics/btn_exercise.png'; 

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
    // 🛑 ซ่อน "เสียงตัวอักษร" ไว้ก่อน โดยใส่ // ข้างหน้าครับ
    // { id: 1, title: "เสียงตัวอักษร", path: "/phonics/sounds", image: btnSound },
    
    { id: 2, title: "เทียบอักษร", path: "/phonics/mapping", image: btnCompare },
    { id: 3, title: "สระภาษาอังกฤษ", path: "/phonics/vowels", image: btnVowel },
    { id: 4, title: "ฝึกสะกดคำ", path: "/phonics/spelling", image: btnSpell },
    { id: 5, title: "ฝึกอ่าน", path: "/phonics/reading", image: btnRead },
    { id: 6, title: "เกมทายคำศัพท์", path: "/phonics/game", image: btnGame },
    { id: 7, title: "แบบฝึกหัด", path: "/phonics/exercises", image: btnExercise },
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
        
        {/* หัวข้อ (ธีมสีม่วง) */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-6 md:mb-10 animate-bounce-slow transform scale-90 md:scale-100">
            <h1 className="text-3xl md:text-6xl font-black text-purple-600 tracking-wide">
              Phonics (โฟนิคส์)
            </h1>
        </div>

        {/* Grid เมนูที่เหลือ 6 ปุ่ม */}
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

export default PhonicsMenuPage;