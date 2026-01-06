import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';

// ⭐ Import รูปปุ่มนิทาน 5 เรื่อง
import btnStory1 from '../assets/images/buttons/btn_story_1.png';
import btnStory2 from '../assets/images/buttons/btn_story_2.png';
import btnStory3 from '../assets/images/buttons/btn_story_3.png';
import btnStory4 from '../assets/images/buttons/btn_story_4.png';
import btnStory5 from '../assets/images/buttons/btn_story_5.png';

// 🔊 โหลดเสียง
const clickSound = new Audio('/sounds/click.mp3');
const hoverSound = new Audio('/sounds/pop.mp3'); // เพิ่มเสียง Pop ตอนชี้
hoverSound.volume = 0.3;

function StoryMenuPage({ isMuted }) {
  const navigate = useNavigate();

  // ฟังก์ชันเล่นเสียง
  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const playHover = () => {
    if (!isMuted) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    }
  };

  // ⭐ อัปเดตรายชื่อนิทานตามที่คุณต้องการ
  const stories = [
    { id: 1, image: btnStory1, title: "ราชสีห์กับวัว 4 ตัว" },
    { id: 2, image: btnStory2, title: "กบเลือกนาย" },
    { id: 3, image: btnStory3, title: "พ่อค้าเกลือกับลา" },
    { id: 4, image: btnStory4, title: "เด็กเลี้ยงแกะ" },
    { id: 5, image: btnStory5, title: "กากับนกยูง" },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6 relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* ✨ Decoration: แสงวิ้งๆ ลอยไปมา (สร้างบรรยากาศแฟนตาซี) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/30 rounded-full blur-2xl animate-bounce duration-[3s]"></div>
      </div>

      {/* Header & Back Button */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
         <button 
          onClick={() => navigate('/')} 
          onMouseEnter={playHover}
          className="
            group flex items-center gap-2 
            bg-white text-orange-600 px-5 py-2 md:px-6 md:py-3 
            rounded-[2rem] 
            shadow-[0_6px_0_#fed7aa] /* เงาแบบ 3D */
            border-4 border-white 
            hover:border-orange-200 hover:translate-y-1 hover:shadow-[0_3px_0_#fed7aa]
            active:translate-y-2 active:shadow-none
            transition-all duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.114 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline font-black text-xl">กลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 -mt-10 z-10">
        
        {/* ⭐ หัวข้อแบบใหม่: ป้ายไม้สไตล์นิทาน (Wooden Sign Style) ⭐ */}
        <div className="mb-14 text-center relative group cursor-default">
           {/* แผ่นป้าย */}
           <div className="
             relative z-10
             bg-gradient-to-b from-amber-400 to-orange-600
             px-14 py-4
             rounded-[3rem]
             border-[6px] border-[#7c2d12] /* ขอบสีน้ำตาลเข้ม */
             shadow-[0_10px_20px_rgba(0,0,0,0.3)]
             transform -rotate-2
             transition-transform duration-500 hover:rotate-0 hover:scale-105
           ">
             {/* ลายไม้จางๆ */}
             <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
             
             <h1 className="text-4xl md:text-7xl font-black text-white drop-shadow-[2px_4px_0_rgba(124,45,18,0.8)] tracking-wide">
               นิทานอีสป
             </h1>
           </div>
           
           {/* หมุดยึดป้าย (ตกแต่ง) */}
           <div className="absolute top-2 left-6 w-4 h-4 rounded-full bg-yellow-200 shadow-inner z-20 border-2 border-orange-800"></div>
           <div className="absolute top-2 right-6 w-4 h-4 rounded-full bg-yellow-200 shadow-inner z-20 border-2 border-orange-800"></div>
        </div>

        {/* ⭐ เรียงแถวเดียว 5 เรื่อง (Horizontal Line) ⭐ */}
        <div className="
          w-full flex flex-wrap justify-center items-center 
          gap-4 md:gap-8 lg:gap-10
          md:flex-nowrap /* บังคับแถวเดียวบนจอใหญ่ */
        ">
          
          {stories.map((story, index) => (
            <div
              key={story.id}
              onMouseEnter={playHover}
              onClick={() => { 
                playClick(); 
                navigate('/stories/watch', { state: { initialStoryId: story.id } }); 
              }}
              className={`
                group relative cursor-pointer
                flex flex-col items-center justify-center
                
                /* ปรับขนาด */
                w-[180px] h-[180px]
                md:w-[210px] md:h-[210px]
                lg:w-[280px] lg:h-[280px]
                
                /* Animation */
                transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                hover:scale-110 hover:-translate-y-4
                active:scale-95 active:rotate-0
                
                /* เอียงสลับซ้ายขวานิดๆ */
                ${index % 2 === 0 ? 'rotate-1 hover:rotate-3' : '-rotate-1 hover:-rotate-3'}
              `}
            >
               {/* Glow Effect (แสงเรืองด้านหลังเวลาชี้) */}
               <div className="absolute inset-2 bg-yellow-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

               {/* รูปภาพ (ไม่เอากรอบ) */}
               <img 
                src={story.image} 
                alt={story.title} 
                className="
                  w-full h-full object-contain
                  drop-shadow-xl 
                  group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  z-10
                "
              />
              
              {/* ชื่อเรื่องลอยขึ้นมาตอนชี้ (Optional: ถ้าอยากให้มีชื่อขึ้นมาด้วย) */}
              <div className="
                absolute -bottom-8 
                bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full 
                text-orange-800 font-bold text-sm md:text-lg shadow-md
                opacity-0 translate-y-2 
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300 delay-100
                whitespace-nowrap z-20 pointer-events-none border-2 border-orange-100
              ">
                {story.title}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default StoryMenuPage;