import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function ThaiReadTonePage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // 📝 แยก Symbol (สัญลักษณ์) และ Name (ชื่อเรียก) ออกจากกัน และใช้ "อ" เป็นฐานรองรับ
  const tones = [
    { name: 'เสียงเอก', symbol: 'อ่', time: 60 },   // 1.00
    { name: 'เสียงโท', symbol: 'อ้', time: 83 },   // 1.23
    { name: 'เสียงตรี', symbol: 'อ๊', time: 98 },   // 1.38
    { name: 'เสียงจัตวา', symbol: 'อ๋', time: 125 } // 2.05
  ];

  // 🎯 ฟังก์ชันเมื่อกดปุ่มวรรณยุกต์
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
      
      {/* 1. ส่วนหัว */}
      <div className="w-full flex justify-center items-center z-20 pt-2 pb-1 shrink-0">
        <div className="px-6 py-1 md:px-10 md:py-1 rounded-full border-[3px] md:border-[4px] border-orange-300 bg-white/90 shadow-md">
           <h1 className="text-lg md:text-2xl font-black text-orange-600">
             🇹🇭 ฝึกอ่านวรรณยุกต์ไทย
           </h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอ */}
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[65vh] flex justify-center items-center shrink-0 z-10 px-4 py-2">
        <video
            ref={videoRef}
            src="/videos/thai/อ่านวรรณยุกต์.mp4" 
            className="h-full aspect-video bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-orange-400 shadow-lg object-contain"
            controls
            muted={isMuted} 
            playsInline
        />
      </div>

      {/* 3. โซนปุ่มวรรณยุกต์ (ปรับปรุง Layout ใหม่ให้สวยงาม ⭐) */}
      <div className="flex-1 w-full flex justify-center items-center px-4 pb-4 pt-1 z-10">
        <div className="w-full h-full max-w-5xl mx-auto bg-white/60 backdrop-blur-md rounded-[2rem] p-4 border-2 border-orange-200 shadow-inner flex flex-col justify-center">
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 h-full">
            {tones.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                className="
                  w-full h-full flex flex-col items-center justify-center gap-1 md:gap-2
                  bg-white text-orange-600 font-bold 
                  rounded-2xl border-[3px] border-orange-300
                  shadow-[0_4px_0_#fdba74] md:shadow-[0_6px_0_#fdba74]
                  hover:bg-orange-50 hover:scale-[1.05] hover:border-orange-500 hover:text-orange-700
                  active:scale-95 active:translate-y-2 active:shadow-none
                  transition-all duration-150 cursor-pointer
                "
              >
                {/* แยกตัวสัญลักษณ์ให้ใหญ่เบิ้มๆ และข้อความชื่อให้อยู่ด้านล่าง */}
                <span className="text-4xl md:text-5xl lg:text-6xl font-black">{item.symbol}</span>
                <span className="text-sm md:text-lg lg:text-xl font-bold bg-orange-100 px-3 py-1 rounded-full text-orange-700">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ThaiReadTonePage;