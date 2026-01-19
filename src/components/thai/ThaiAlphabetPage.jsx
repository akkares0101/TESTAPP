import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปปุ่ม
import btnWrite from '../../assets/images/thai/write.png';
import btnRead from '../../assets/images/thai/read.png';
import btnGame from '../../assets/images/thai/game.png';

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
    { id: 1, image: btnWrite, path: "/thai/writing", title: "การเขียน" },
    { id: 2, image: btnRead, path: "/thai/reading", title: "การอ่าน" },
    
    // ⭐ จุดสำคัญ: ปุ่มนี้จะลิงก์ไปหา "หน้าเลือกเกม" ครับ
    { id: 3, image: btnGame, path: "/thai/game", title: "เกมภาษาไทย" }, 
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/')} 
          className="bg-white text-orange-500 px-4 py-2 rounded-full shadow-md border-4 border-white hover:scale-105 transition-all flex items-center gap-2 font-black"
        >
          <span>◀</span> กลับหน้าหลัก
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-10">
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-8 bg-orange-400/80 px-12 py-4 rounded-full border-4 border-white">
           🇹🇭 ภาษาไทย
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => { playClick(); navigate(item.path); }}
                className="group relative cursor-pointer w-[200px] h-[200px] md:w-[300px] md:h-[300px] hover:scale-110 transition-transform"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-contain drop-shadow-xl" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ThaiAlphabetPage;