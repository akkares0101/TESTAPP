import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bg.png';

function PhonicsSpellingPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 🎥 Path วิดีโอหลัก
  const mainVideo = "/videos/phonics/cvc_spelling.mp4";

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ สั่งให้วิดีโอเล่นทันที
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5; 
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  // ฟังก์ชันกระโดดไปเวลาที่กำหนด
  const jumpToTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // ⭐ ฟังก์ชันสำหรับปุ่มกดหยุด/เล่นต่อ
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 🔠 ข้อมูลปุ่มกดข้ามเวลา
  const timeStamps = [
    { id: 1, char: "A", time: 29,  color: "bg-red-500", border: "border-red-600" },      
    { id: 2, char: "E", time: 110, color: "bg-yellow-400", border: "border-yellow-500" }, 
    { id: 3, char: "I", time: 179, color: "bg-green-500", border: "border-green-600" },  
    { id: 4, char: "O", time: 250, color: "bg-blue-500", border: "border-blue-600" },    
    { id: 5, char: "U", time: 322, color: "bg-purple-500", border: "border-purple-600" } 
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
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาด */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* 1. Header (❌ ไม่มีปุ่มกลับ จัดกึ่งกลางกะทัดรัด) */}
      <div className="w-full px-4 flex justify-center items-center py-2 shrink-0 z-10 mt-2">
        <div className="bg-white/90 backdrop-blur-md px-8 py-2 rounded-full border-[3px] md:border-[4px] border-purple-400 shadow-md text-center">
            <h1 className="text-xl md:text-2xl font-black text-purple-600 tracking-wide">
                🗣️ ฝึกสะกดคำ (Spelling)
            </h1>
        </div>
      </div>

      {/* 2. Video Player Area (สูตรผอมเพรียว 950px ตัดขอบดำ) */}
      <div className="w-full max-w-[950px] px-2 md:px-4 flex-1 min-h-0 flex flex-col justify-center pb-2 z-10">
        <div className="relative w-full aspect-video max-h-[55vh] md:max-h-[60vh] bg-black rounded-[2rem] border-[6px] md:border-[8px] border-orange-400 shadow-[0_10px_0_#ea580c] overflow-hidden group">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
      </div>

      {/* 3. แผงควบคุมด้านล่าง (ปุ่มหยุด และ ปุ่มเลือกสระ) */}
      <div className="w-full max-w-[950px] shrink-0 bg-white/80 backdrop-blur-xl rounded-t-[2.5rem] border-t-4 border-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center z-20 pt-4 pb-6">
        
        {/* ปุ่มเล่น/หยุด ใหญ่ๆ กดง่าย */}
        <button 
          onClick={togglePlay}
          className={`
            mb-4 px-12 py-2 rounded-full text-lg font-black text-white shadow-md transition-all
            ${isPlaying ? 'bg-rose-500 hover:bg-rose-400' : 'bg-emerald-500 hover:bg-emerald-400'}
          `}
        >
          {isPlaying ? 'หยุดวิดีโอ' : 'เล่นต่อ'}
        </button>

        <div className="flex flex-col items-center w-full px-6">
            <span className="text-purple-500 font-bold text-sm mb-3 bg-purple-50 px-4 py-1 rounded-full">
                เลือกฝึกสะกดคำตามเสียงสระ ✨
            </span>

            {/* ปุ่มทางลัด A E I O U */}
            <div className="flex gap-3 md:gap-5">
                {timeStamps.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => jumpToTime(item.time)}
                        className={`
                            group flex items-center justify-center
                            w-12 h-12 md:w-16 md:h-16
                            rounded-2xl 
                            ${item.color} ${item.border} border-b-[6px]
                            shadow-md transition-all duration-150
                            hover:scale-110 hover:-translate-y-1
                            active:scale-95 active:translate-y-1 active:border-b-0
                        `}
                    >
                        <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                            {item.char}
                        </span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default PhonicsSpellingPage;