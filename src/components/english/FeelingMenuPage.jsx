import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปภาพประกอบ
import imgFeeling from '../../assets/images/buttons/img_feeling_card.png';   
import imgMovement from '../../assets/images/buttons/img_movement_card.png'; 

const clickSound = new Audio('/sounds/click.mp3');

function FeelingMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

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
      {/* 1. ปุ่มย้อนกลับ (มุมซ้ายบน) */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/alphabet')} 
          className="
            group flex items-center gap-2 bg-white text-blue-500 px-4 py-2 md:px-6 md:py-3 rounded-[2rem] shadow-lg border-4 border-white hover:border-blue-200 hover:scale-105 active:scale-95 transition-all
          "
        >
          <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">◀</span>
          <span className="hidden md:inline font-black text-xl">หน้าหลัก</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] gap-10 px-4 mt-4">
        
        {/* 2. หัวข้อ "Feeling and Movement" */}
        <div className="relative z-10 bg-white px-10 py-4 rounded-full border-[6px] border-emerald-400 shadow-[0_6px_0_#34d399] mb-6">
            <h1 className="text-3xl md:text-5xl font-black text-gray-700 tracking-wide flex items-center gap-3">
              ✨ Feeling and Movement ✨
            </h1>
        </div>

        {/* 3. Grid ปุ่มเมนู 2 ปุ่มใหญ่ (เฉพาะรูปภาพ) */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 w-full">
          
          {/* --- ปุ่ม Feeling --- */}
          <div
            onClick={() => { playClick(); navigate('/feeling/emotions'); }}
            className="group relative cursor-pointer w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-transform duration-300 hover:scale-105 hover:-rotate-2"
          >
            {/* การ์ดพื้นหลังสีขาว */}
            <div className="absolute inset-0 bg-white rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center p-4 bg-green-50">
                {/* รูปภาพเต็มใบ */}
                <img src={imgFeeling} alt="Feeling" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* --- ปุ่ม Movement --- */}
          <div
            onClick={() => { playClick(); navigate('/feeling/movement'); }}
            className="group relative cursor-pointer w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-transform duration-300 hover:scale-105 hover:rotate-2"
          >
            {/* การ์ดพื้นหลังสีขาว */}
            <div className="absolute inset-0 bg-white rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center p-4 bg-sky-50">
                {/* รูปภาพเต็มใบ */}
                <img src={imgMovement} alt="Movement" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default FeelingMenuPage;