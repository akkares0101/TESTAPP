import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function ThaiLearningPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // 📝 ข้อมูลตัวอักษรและเวลา (44 ตัว)
  const consonants = [
    { char: 'ก', time: 14 }, { char: 'ข', time: 23 }, { char: 'ฃ', time: 31 },
    { char: 'ค', time: 40 }, { char: 'ฅ', time: 49 }, { char: 'ฆ', time: 59 },
    { char: 'ง', time: 69 }, { char: 'จ', time: 77 }, { char: 'ฉ', time: 86 },
    { char: 'ช', time: 98 }, { char: 'ซ', time: 107 }, { char: 'ฌ', time: 117 },
    { char: 'ญ', time: 126 }, { char: 'ฎ', time: 134 }, { char: 'ฏ', time: 144 },
    { char: 'ฐ', time: 153 }, { char: 'ฑ', time: 163 }, { char: 'ฒ', time: 171 },
    { char: 'ณ', time: 181 }, { char: 'ด', time: 190 }, { char: 'ต', time: 201 },
    { char: 'ถ', time: 217 }, { char: 'ท', time: 230 }, { char: 'ธ', time: 242 },
    { char: 'น', time: 254 }, { char: 'บ', time: 268 }, { char: 'ป', time: 281 },
    { char: 'ผ', time: 294 }, { char: 'ฝ', time: 307 }, { char: 'พ', time: 320 },
    { char: 'ฟ', time: 333 }, { char: 'ภ', time: 348 }, { char: 'ม', time: 361 },
    { char: 'ย', time: 373 }, { char: 'ร', time: 386 }, { char: 'ล', time: 398 },
    { char: 'ว', time: 411 }, { char: 'ศ', time: 423 }, { char: 'ษ', time: 437 },
    { char: 'ส', time: 449 }, { char: 'ห', time: 460 }, { char: 'ฬ', time: 471 },
    { char: 'อ', time: 483 }, { char: 'ฮ', time: 495 }
  ];

  // 🎯 ฟังก์ชันเมื่อกดปุ่มตัวอักษร
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
        <div className="px-6 py-1 md:px-10 md:py-1 rounded-full border-[3px] md:border-[4px] border-pink-300 bg-white/90 shadow-md">
           <h1 className="text-lg md:text-2xl font-black text-pink-600">
             🇹🇭 ฝึกอ่านพยัญชนะ ก-ฮ
           </h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอ (⭐ ขยายให้ใหญ่ขึ้น กินพื้นที่ 55% - 65% ของจอ) */}
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[65vh] flex justify-center items-center shrink-0 z-10 px-4 py-2">
        <video
            ref={videoRef}
            src="/videos/thai/อ่านพยัญชนะ.mp4" 
            className="h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-pink-400 shadow-lg object-contain"
            controls
            muted={isMuted} 
            playsInline
        />
      </div>

      {/* 3. โซนปุ่ม 44 ตัว (⭐ พื้นที่เล็กลง และจำกัดความกว้างให้ปุ่มดูจิ๋วและน่ารักขึ้น) */}
      <div className="flex-1 w-full flex justify-center items-center px-2 md:px-4 pb-4 pt-1 z-10">
        <div className="w-full h-full max-w-[70rem] mx-auto bg-white/60 backdrop-blur-md rounded-2xl p-2 md:p-3 border-2 border-pink-200 shadow-inner flex flex-col justify-center">
          
          {/* จัด Grid: 11 คอลัมน์ (ได้ 4 แถวพอดี) */}
          <div className="flex-1 grid grid-cols-8 md:grid-cols-11 gap-1 md:gap-1.5 h-full">
            {consonants.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                className="
                  w-full h-full flex items-center justify-center
                  bg-white text-pink-600 font-bold 
                  text-base sm:text-lg md:text-xl lg:text-2xl /* ⭐ ลดขนาดตัวหนังสือ */
                  rounded-lg md:rounded-xl border-[2px] border-pink-300
                  shadow-[0_2px_0_#f9a8d4] md:shadow-[0_3px_0_#f9a8d4]
                  hover:bg-pink-50 hover:scale-[1.05] hover:border-pink-500 hover:text-pink-700
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

export default ThaiLearningPage;