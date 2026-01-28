import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsMappingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔠 ข้อมูลเทียบเสียง A-Z เป็นภาษาไทย
  const mappingData = [
    { id: 1, en: "A", th: "แอะ / เอ", color: "bg-red-500" },
    { id: 2, en: "B", th: "บ", color: "bg-orange-500" },
    { id: 3, en: "C", th: "ค / ซ", color: "bg-yellow-400" },
    { id: 4, en: "D", th: "ด", color: "bg-green-500" },
    { id: 5, en: "E", th: "เอะ / อี", color: "bg-teal-500" },
    { id: 6, en: "F", th: "ฟ", color: "bg-blue-500" },
    { id: 7, en: "G", th: "ก / จ", color: "bg-indigo-500" },
    { id: 8, en: "H", th: "ฮ", color: "bg-purple-500" },
    { id: 9, en: "I", th: "อิ / ไอ", color: "bg-pink-500" },
    { id: 10, en: "J", th: "จ", color: "bg-rose-500" },
    { id: 11, en: "K", th: "ค", color: "bg-red-400" },
    { id: 12, en: "L", th: "ล", color: "bg-orange-400" },
    { id: 13, en: "M", th: "ม", color: "bg-amber-400" },
    { id: 14, en: "N", th: "น", color: "bg-lime-500" },
    { id: 15, en: "O", th: "ออ / โอ", color: "bg-emerald-500" },
    { id: 16, en: "P", th: "พ", color: "bg-cyan-500" },
    { id: 17, en: "Q", th: "คว", color: "bg-sky-500" },
    { id: 18, en: "R", th: "ร", color: "bg-violet-500" },
    { id: 19, en: "S", th: "ส", color: "bg-fuchsia-500" },
    { id: 20, en: "T", th: "ท", color: "bg-pink-500" },
    { id: 21, en: "U", th: "อะ / อุ", color: "bg-rose-400" },
    { id: 22, en: "V", th: "ว (ฝ)", color: "bg-red-500" },
    { id: 23, en: "W", th: "ว", color: "bg-orange-500" },
    { id: 24, en: "X", th: "กซ", color: "bg-yellow-500" },
    { id: 25, en: "Y", th: "ย", color: "bg-green-500" },
    { id: 26, en: "Z", th: "ซ", color: "bg-blue-500" },
  ];

  // แปลงข้อมูลให้เป็นรูปแบบ Playlist
  const lessons = mappingData.map((item) => ({
    id: item.id,
    num: item.en, // โชว์ใน Playlist ด้านล่าง
    title: `เทียบเสียง ${item.en} = ${item.th}`,
    video: `/videos/phonics/map_${item.en.toLowerCase()}.mp4`, // public map_a.mp4, map_b.mp4...
    ...item
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
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-24 md:pt-20 overflow-y-auto pb-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-8 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-purple-600 tracking-wide">
              🔠 เทียบอักษร (A-Z Mapping)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม A-Z พร้อมคำเทียบไทย */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: lessons, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  w-[90px] h-[90px] md:w-[140px] md:h-[140px]
                  rounded-2xl
                  ${item.color} 
                  shadow-[0_6px_0_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.2)]
                  border-4 border-white/30
                  transition-all duration-150
                  hover:scale-110 hover:-translate-y-1
                  active:translate-y-2 active:shadow-none
                `}
              >
                {/* ตัวอักษรภาษาอังกฤษ */}
                <span className="text-4xl md:text-6xl font-black text-white drop-shadow-md leading-none">
                  {item.en}
                </span>
                
                {/* เครื่องหมายเท่ากับ */}
                <span className="text-white/80 text-sm md:text-lg font-bold">=</span>

                {/* ตัวอักษรไทย (พื้นหลังขาวให้เด่น) */}
                <div className="bg-white/90 px-2 py-0.5 rounded-md shadow-sm w-[90%] truncate">
                   <span className={`text-sm md:text-xl font-bold ${item.color.replace('bg-', 'text-')}`}>
                     {item.th}
                   </span>
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

export default PhonicsMappingPage;