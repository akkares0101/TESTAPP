import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปภาพ
import imgWakeUp from '../../assets/images/daily/wakeup.png';    
import imgBrush from '../../assets/images/daily/brush.png';     
import imgShower from '../../assets/images/daily/shower.png';    
import imgBreakfast from '../../assets/images/daily/breakfast.png';     
import imgSchool from '../../assets/images/daily/school.png';    

// ⭐ Import ไฟล์วิดีโอ (ต้องเอาวิดีโอไปวางในโฟลเดอร์ assets/videos/daily/ ก่อนนะครับ)
// ถ้ายังไม่มีไฟล์วิดีโอจริง สามารถใช้ไฟล์ mp4 ทดสอบก่อนได้ครับ
import vidWakeUp from '../../assets/videos/daily/wakeup.mp4';
import vidBrush from '../../assets/videos/daily/brush.mp4';
import vidShower from '../../assets/videos/daily/shower.mp4';
import vidBreakfast from '../../assets/videos/daily/breakfast.mp4';
import vidSchool from '../../assets/videos/daily/school.mp4';

const clickSound = new Audio('/sounds/click.mp3');

function DailyActivityPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ⭐ เพิ่ม field 'video' เข้าไปในข้อมูลแต่ละปุ่ม
  const activities = [
    { id: 1, image: imgWakeUp, title: "Wake Up", video: vidWakeUp },
    { id: 2, image: imgBrush, title: "Brush Teeth", video: vidBrush },
    { id: 3, image: imgShower, title: "Take a Shower", video: vidShower },
    { id: 4, image: imgBreakfast, title: "Breakfast", video: vidBreakfast },
    { id: 5, image: imgSchool, title: "Go to School", video: vidSchool },
  ];

  const handleActivityClick = (item) => {
    playClick();
    
    // ⭐ สั่งให้กระโดดไปหน้า LessonPage พร้อมส่งคลิปวิดีโอไปด้วย
    navigate('/lesson', { 
      state: { 
        title: item.title,   // ส่งชื่อเรื่องไปโชว์
        videoSrc: item.video // ส่งไฟล์วิดีโอไปเล่น
      } 
    });
  };

  const renderButton = (item) => (
    <div
      key={item.id}
      onClick={() => handleActivityClick(item)} 
      className="
        group relative cursor-pointer
        flex items-center justify-center
        
        /* ขนาดปุ่มใหญ่ */
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
      {/* ปุ่มย้อนกลับ */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/alphabet')} 
          className="
            group flex items-center gap-2 bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-lg">ย้อนกลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] gap-8 px-4 mt-2">
        
        {/* หัวข้อ */}
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-10 py-3 rounded-full border-4 border-white">
           🌞 Daily Activity
        </h1>

        {/* Grid ปุ่มเมนู */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full max-w-6xl">
            {activities.map(renderButton)}
        </div>

      </div>
    </div>
  );
}

export default DailyActivityPage;