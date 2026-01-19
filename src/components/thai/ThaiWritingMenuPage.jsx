import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม (เหลือ 4 ปุ่ม)
import btnConsonant from '../../assets/images/thai/btn_consonant.png'; 
import btnTone from '../../assets/images/thai/btn_tone.png';           
import btnVowel from '../../assets/images/thai/btn_vowel.png';         
import btnHandwriting from '../../assets/images/thai/btn_handwriting.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function ThaiWritingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ❌ ลบปุ่มเกมออกแล้ว
  const menuItems = [
    { id: 1, image: btnConsonant, path: "/thai-alphabet/write-consonant", title: "พยัญชนะไทย" },
    { id: 2, image: btnTone, path: "/thai-alphabet/write-tone", title: "วรรณยุกต์" },
    { id: 3, image: btnVowel, path: "/thai-alphabet/write-vowel", title: "สระ" },
    { id: 4, image: btnHandwriting, path: "/thai-alphabet/handwriting", title: "คัดลายมือ" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/thai-alphabet')} 
          className="bg-white text-orange-500 px-4 py-2 rounded-full shadow-md border-4 border-white hover:scale-105 transition-all flex items-center gap-2 font-black"
        >
          <span>◀</span> ย้อนกลับ
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full gap-10 -mt-10">
        <h1 className="text-4xl md:text-6xl font-black text-white bg-orange-400/80 px-12 py-4 rounded-full border-4 border-white">
           ✍️ ฝึกเขียน
        </h1>

        {/* จัด 4 ปุ่มเป็น Grid 2x2 หรือแถวเดียวตามขนาดจอ */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => { playClick(); navigate(item.path); }}
                className="group relative cursor-pointer w-[160px] h-[160px] md:w-[240px] md:h-[240px] hover:scale-110 transition-transform"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ThaiWritingMenuPage;