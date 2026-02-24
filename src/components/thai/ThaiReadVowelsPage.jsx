import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function ThaiReadVowelsPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // 📝 ข้อมูลสระ 32 ตัว และเวลาที่แปลงเป็นวินาทีแล้ว
  const vowels = [
    { char: 'ะ', time: 13 }, { char: 'อา', time: 25 }, { char: 'อิ', time: 34 }, { char: 'อี', time: 44 },
    { char: 'อึ', time: 56 }, { char: 'อื', time: 66 }, { char: 'อุ', time: 79 }, { char: 'อู', time: 89 },
    { char: 'เอะ', time: 100 }, { char: 'เอ', time: 112 }, { char: 'แอะ', time: 124 }, { char: 'แอ', time: 136 },
    { char: 'โอะ', time: 146 }, { char: 'โอ', time: 157 }, { char: 'เอาะ', time: 169 }, { char: 'ออ', time: 179 },
    { char: 'เออะ', time: 192 }, { char: 'เออ', time: 204 }, { char: 'เอียะ', time: 215 }, { char: 'เอีย', time: 224 },
    { char: 'เอือะ', time: 235 }, { char: 'เอือ', time: 245 }, { char: 'อัวะ', time: 254 }, { char: 'อัว', time: 263 },
    { char: 'อำ', time: 273 }, { char: 'ใอ', time: 282 }, { char: 'ไอ', time: 296 }, { char: 'เอา', time: 308 },
    { char: 'ฤ', time: 318 }, { char: 'ฤๅ', time: 327 }, { char: 'ฦ', time: 336 }, { char: 'ฦๅ', time: 346 }
  ];

  // 🎯 ฟังก์ชันเมื่อกดปุ่มสระ
  const handleLetterClick = (timeInSeconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      {/* 1. ส่วนหัว (บีบให้เล็กที่สุด) */}
      <div className="w-full flex justify-center items-center z-20 pt-2 pb-1 shrink-0">
        <div className="px-6 py-1 md:px-10 md:py-1 rounded-full border-[3px] md:border-[4px] border-emerald-300 bg-white/90 shadow-md">
           <h1 className="text-lg md:text-2xl font-black text-emerald-600">
             🇹🇭 ฝึกอ่านสระภาษาไทย
           </h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอ (ความสูง 50-65% ของหน้าจอ) */}
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[65vh] flex justify-center items-center shrink-0 z-10 px-4 py-2">
        <video
            ref={videoRef}
            src="/videos/thai/อ่านสระ.mp4" // ⚠️ เปลี่ยนชื่อไฟล์ตรงนี้
            className="h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-emerald-400 shadow-lg object-contain"
            controls
            muted={isMuted} 
            playsInline
        />
      </div>

      {/* 3. โซนปุ่มสระ 32 ตัว */}
      <div className="flex-1 w-full flex justify-center items-center px-2 md:px-4 pb-4 pt-1 z-10">
        <div className="w-full h-full max-w-[60rem] mx-auto bg-white/60 backdrop-blur-md rounded-2xl p-2 md:p-3 border-2 border-emerald-200 shadow-inner flex flex-col justify-center">
          
          {/* จัด Grid: คอม 8 คอลัมน์ x 4 แถว / มือถือ 4 คอลัมน์ x 8 แถว */}
          <div className="flex-1 grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2 h-full">
            {vowels.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                className="
                  w-full h-full flex items-center justify-center
                  bg-white text-emerald-600 font-bold 
                  text-lg sm:text-xl md:text-2xl /* ปรับขนาดให้พอดีสระ */
                  rounded-lg md:rounded-xl border-[2px] border-emerald-300
                  shadow-[0_2px_0_#a7f3d0] md:shadow-[0_3px_0_#a7f3d0]
                  hover:bg-emerald-50 hover:scale-[1.05] hover:border-emerald-500 hover:text-emerald-700
                  active:scale-95 active:translate-y-1 active:shadow-none
                  transition-all duration-150 cursor-pointer
                "
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ThaiReadVowelsPage;