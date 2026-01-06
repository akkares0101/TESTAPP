import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปภาพ
import imgWakeUp from '../../assets/images/daily/wakeup.png';    
import imgafter from '../../assets/images/daily/after.png';     
import imggametime from '../../assets/images/daily/gametime.png';    
import imgnight from '../../assets/images/daily/night.png';     
import imgSchool from '../../assets/images/daily/school.png';    

// Import วิดีโอ
import vidWakeUp from '../../assets/videos/daily/wakeup.mp4';
import vidafter from '../../assets/videos/daily/after.mp4';
import vidgametime from '../../assets/videos/daily/gametime.mp4';
import vidnight from '../../assets/videos/daily/night.mp4';
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

  const activities = [
    { id: 1, image: imgWakeUp, title: "Wake Up", video: vidWakeUp },
    { id: 2, image: imgSchool, title: "Go to School", video: vidSchool }, // สลับเอา School ขึ้นมาแถวบนเพื่อให้ลำดับดูสมจริง (ตื่น -> ไปเรียน -> เลิกเรียน) หรือจะเรียงตามเดิมก็ได้ครับ
    { id: 3, image: imgafter, title: "After school", video: vidafter },
    { id: 4, image: imggametime, title: "Game Time", video: vidgametime },
    { id: 5, image: imgnight, title: "Night", video: vidnight },
  ];

  // ⭐ แบ่งข้อมูลเป็น 2 ชุด (3 ปุ่ม และ 2 ปุ่ม)
  const topRow = activities.slice(0, 3);
  const bottomRow = activities.slice(3, 5);

  const handleActivityClick = (item) => {
    playClick();
    navigate('/lesson', { 
      state: { 
        title: item.title,   
        videoSrc: item.video 
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
        
        /* ขนาดปุ่ม */
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

        {/* ⭐ จัด Layout เป็น 2 แถว (3-2) */}
        <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-6xl">
            
            {/* แถวบน 3 ปุ่ม */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {topRow.map(renderButton)}
            </div>

            {/* แถวล่าง 2 ปุ่ม */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {bottomRow.map(renderButton)}
            </div>

        </div>

      </div>
    </div>
  );
}

export default DailyActivityPage;