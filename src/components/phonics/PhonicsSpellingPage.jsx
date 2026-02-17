import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsSpellingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔠 ข้อมูลคำศัพท์ฝึกสะกด (CVC Words ง่ายๆ)
  const lessons = [
    { id: 1, word: "CAT", th: "แมว", phonics: "C-A-T", color: "bg-red-500", video: "/videos/phonics/spell_cat.mp4" },
    { id: 2, word: "DOG", th: "สุนัข", phonics: "D-O-G", color: "bg-orange-500", video: "/videos/phonics/spell_dog.mp4" },
    { id: 3, word: "BAT", th: "ค้างคาว", phonics: "B-A-T", color: "bg-yellow-400", video: "/videos/phonics/spell_bat.mp4" },
    { id: 4, word: "PIG", th: "หมู", phonics: "P-I-G", color: "bg-pink-400", video: "/videos/phonics/spell_pig.mp4" },
    { id: 5, word: "HEN", th: "แม่ไก่", phonics: "H-E-N", color: "bg-green-500", video: "/videos/phonics/spell_hen.mp4" },
    { id: 6, word: "SUN", th: "พระอาทิตย์", phonics: "S-U-N", color: "bg-amber-500", video: "/videos/phonics/spell_sun.mp4" },
    { id: 7, word: "BOX", th: "กล่อง", phonics: "B-O-X", color: "bg-blue-500", video: "/videos/phonics/spell_box.mp4" },
    { id: 8, word: "FOX", th: "สุนัขจิ้งจอก", phonics: "F-O-X", color: "bg-orange-600", video: "/videos/phonics/spell_fox.mp4" },
    { id: 9, word: "BUS", th: "รถบัส", phonics: "B-U-S", color: "bg-teal-500", video: "/videos/phonics/spell_bus.mp4" },
    { id: 10, word: "RAT", th: "หนู", phonics: "R-A-T", color: "bg-gray-500", video: "/videos/phonics/spell_rat.mp4" },
  ];

  // แปลงข้อมูลสำหรับ Playlist
  const playlistItems = lessons.map(item => ({
    ...item,
    num: item.word,      // โชว์คำศัพท์ใน Playlist
    title: `สะกดคำ: ${item.word} (${item.th})`
  }));

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

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-16 md:pt-14 overflow-y-auto pb-10">
        
        {/* หัวข้อ (เล็กลง) */}
        <div className="relative z-10 bg-white px-6 py-1.5 md:px-10 md:py-2 rounded-full border-[3px] md:border-[5px] border-purple-500 shadow-[0_3px_0_#a855f7] mb-6 animate-bounce-slow text-center scale-90 md:scale-100">
            <h1 className="text-2xl md:text-4xl font-black text-purple-600 tracking-wide">
              🗣️ ฝึกสะกดคำ (Spelling)
            </h1>
        </div>

        {/* 3. Grid คำศัพท์ (เล็กลง) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-7xl">
            {playlistItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: playlistItems, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  /* ⭐ ปรับลดขนาดลงตรงนี้ ⭐ */
                  w-[110px] h-[80px]      /* มือถือ: ลดจาก 140x100 */
                  md:w-[180px] md:h-[120px] /* จอคอม: ลดจาก 240x160 */
                  
                  rounded-2xl
                  ${item.color} 
                  shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_2px_0_rgba(0,0,0,0.2)]
                  border-[3px] border-white/20
                  transition-all duration-150
                  hover:scale-105 hover:-translate-y-1
                  active:translate-y-1 active:shadow-none
                `}
              >
                {/* คำศัพท์ภาษาอังกฤษ */}
                <span className="text-3xl md:text-5xl font-black text-white drop-shadow-md tracking-wider leading-none">
                  {item.word}
                </span>
                
                {/* คำอ่านแบบ Phonics (ตัวเล็ก) */}
                <div className="mt-0.5 md:mt-1 bg-black/20 px-2 py-0.5 rounded-full text-white/90 text-[10px] md:text-xs font-bold">
                    {item.phonics}
                </div>

                {/* คำแปลภาษาไทย (ป้ายห้อยมุมขวาล่าง - เล็กลง) */}
                <div className="absolute -bottom-2 -right-1 bg-white px-2 py-0.5 rounded-lg shadow-sm rotate-3 group-hover:rotate-0 transition-transform">
                     <span className="text-[10px] md:text-sm font-bold text-gray-700">{item.th}</span>
                </div>
              </button>
            ))}
        </div>

      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default PhonicsSpellingPage;