import React, { useRef, useEffect, useState } from 'react';
import bgImage from '../../assets/images/bg.png';

function ThaiLearningPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLetterClick = (timeInSeconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. Header (บีบให้เล็กและคลีนที่สุด) */}
      <div className="w-full flex justify-center items-center z-20 pt-1 pb-1 shrink-0">
        <div className="px-4 py-0.5 rounded-full border border-pink-200 bg-white/90 shadow-sm">
           <h1 className="text-xs md:text-sm font-black text-pink-600">
             🇹🇭 ฝึกอ่านพยัญชนะ ก-ฮ
           </h1>
        </div>
      </div>

      {/* 2. โซนวิดีโอ (ขยายใหญ่ขึ้นเป็น 60% ของจอเพื่อให้เห็นชัด) */}
      <div className="w-full h-[50vh] md:h-[60vh] flex justify-center items-center shrink-0 z-10 px-4 mt-1">
        <div 
          onClick={togglePlay}
          className="relative h-full aspect-video bg-black rounded-[1.2rem] md:rounded-[2rem] border-[5px] md:border-[8px] border-pink-400 shadow-lg overflow-hidden cursor-pointer"
        >
            <video
                ref={videoRef}
                src="/videos/thai/อ่านพยัญชนะ.mp4" 
                className="w-full h-full object-contain pointer-events-none"
                muted={isMuted} 
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-pink-600 border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 3. แผงปุ่ม (Micro-Compact ปรับให้เล็กลงมากและจัดกึ่งกลาง) */}
      <div className="flex-1 w-full flex justify-center items-center px-4 pb-4 pt-1 z-10 min-h-0">
        <div className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-sm rounded-[1.5rem] p-2 md:p-3 border border-white/30 shadow-md">
          <div className="grid grid-cols-11 gap-1 md:gap-1.5 w-full">
            {consonants.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.time)}
                className="
                  aspect-square w-full flex items-center justify-center
                  bg-white text-pink-600 font-black
                  text-[9px] md:text-sm lg:text-base
                  rounded-lg border border-pink-50
                  shadow-[0_2px_0_#f9a8d4]
                  hover:bg-pink-50 active:translate-y-0.5 active:shadow-none
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