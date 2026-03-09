import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// Import รูปปุ่มนิทาน 5 เรื่อง
const btnStory1 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_1.png";
const btnStory2 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_2.png";
const btnStory4 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_4.png";
const btnStory5 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_story_5.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");
const hoverSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/pop.mp3"); 
hoverSound.volume = 0.3;

function StoryMenuPage({ isMuted }) {
  const navigate = useNavigate();

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

  const stories = [
    { id: 1, image: btnStory1, title: "ราชสีห์กับวัว 4 ตัว" },
    { id: 2, image: btnStory2, title: "กบเลือกนาย" },
    //{ id: 3, image: btnStory3, title: "พ่อค้าเกลือกับลา" },
    { id: 4, image: btnStory4, title: "เด็กเลี้ยงแกะ" },
    { id: 5, image: btnStory5, title: "กากับนกยูง" },
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
      {/* Decoration: แสงวิ้งๆ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/30 rounded-full blur-2xl animate-bounce duration-[3s]"></div>
      </div>

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4 pt-10 z-10">
        
        {/* หัวข้อสไตล์นิทาน */}
        <div className="mb-10 text-center relative group cursor-default transform scale-90 md:scale-100">
           <div className="
             relative z-10
             bg-gradient-to-b from-amber-400 to-orange-600
             px-12 py-3 md:px-14 md:py-4
             rounded-[3rem]
             border-[6px] border-[#7c2d12]
             shadow-[0_10px_20px_rgba(0,0,0,0.3)]
             transform -rotate-2
             transition-transform duration-500 hover:rotate-0 hover:scale-105 animate-bounce-slow
           ">
             <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] opacity-20 pointer-events-none"></div>
             
             <h1 className="text-3xl md:text-7xl font-black text-white drop-shadow-[2px_4px_0_rgba(124,45,18,0.8)] tracking-wide">
               นิทานอีสป
             </h1>
           </div>
           {/* หมุด */}
           <div className="absolute top-2 left-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-200 shadow-inner z-20 border-2 border-orange-800"></div>
           <div className="absolute top-2 right-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-200 shadow-inner z-20 border-2 border-orange-800"></div>
        </div>

        {/* ⭐ Container ปุ่มนิทาน ⭐
            - flex-wrap: สำหรับมือถือ (ให้ปัดลงบรรทัดใหม่ได้)
            - md:flex-nowrap: สำหรับจอคอม (บังคับเรียงแถวเดียว 5 อัน)
        */}
        <div className="
          w-full flex flex-wrap md:flex-nowrap justify-center items-center 
          gap-4 md:gap-4 lg:gap-8 
          max-w-[98rem]
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
                
                /* ⭐ ปรับขนาดให้พอดีเมื่อเรียง 5 อัน */
                w-[150px] h-[150px]    /* มือถือ: เล็กหน่อย */
                md:w-auto md:h-[200px] /* ไอแพด/จอเล็ก: พอดีๆ */
                lg:h-[280px]           /* จอใหญ่: ใหญ่สะใจ */
                
                transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                hover:scale-110 hover:-translate-y-4
                active:scale-95 active:rotate-0
                
                ${index % 2 === 0 ? 'rotate-1 hover:rotate-3' : '-rotate-1 hover:-rotate-3'}
              `}
            >
               <div className="absolute inset-2 bg-yellow-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
              
              {/* ชื่อเรื่อง (แสดงตอนเอาเมาส์ชี้) */}
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

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default StoryMenuPage;