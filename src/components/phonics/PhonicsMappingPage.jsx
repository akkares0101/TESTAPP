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
    num: item.en,
    title: `เทียบเสียง ${item.en} = ${item.th}`,
    video: `/videos/phonics/map_${item.en.toLowerCase()}.mp4`,
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
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-16 md:pt-14 overflow-y-auto pb-10">
        
        {/* หัวข้อ (เล็กลง) */}
        <div className="relative z-10 bg-white px-6 py-1.5 md:px-10 md:py-2 rounded-full border-[3px] md:border-[5px] border-purple-500 shadow-[0_3px_0_#a855f7] mb-6 animate-bounce-slow text-center scale-90 md:scale-100">
            <h1 className="text-2xl md:text-4xl font-black text-purple-600 tracking-wide">
              🔠 เทียบอักษร (A-Z Mapping)
            </h1>
        </div>

        {/* 3. Grid ปุ่ม A-Z (เล็กลง) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-6xl">
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
                  /* ⭐ ปรับลดขนาดลงตรงนี้ ⭐ */
                  w-[70px] h-[70px]      /* มือถือ: ลดจาก 90 เหลือ 70 */
                  md:w-[100px] md:h-[100px] /* จอคอม: ลดจาก 140 เหลือ 100 */
                  
                  rounded-xl
                  ${item.color} 
                  shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_2px_0_rgba(0,0,0,0.2)]
                  border-[3px] border-white/30
                  transition-all duration-150
                  hover:scale-110 hover:-translate-y-1
                  active:translate-y-1 active:shadow-none
                `}
              >
                {/* ตัวอักษรภาษาอังกฤษ */}
                <span className="text-3xl md:text-5xl font-black text-white drop-shadow-md leading-none">
                  {item.en}
                </span>
                
                {/* เครื่องหมายเท่ากับ */}
                <span className="text-white/80 text-xs md:text-sm font-bold -mt-1 md:-mt-0">=</span>

                {/* ตัวอักษรไทย (พื้นหลังขาว) */}
                <div className="bg-white/90 px-1 py-0.5 rounded-md shadow-sm w-[90%] truncate mt-0.5">
                   <span className={`text-xs md:text-base font-bold ${item.color.replace('bg-', 'text-')}`}>
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