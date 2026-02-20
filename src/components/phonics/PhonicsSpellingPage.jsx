import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

function PhonicsSpellingPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 🎥 Path วิดีโอหลัก (คลิปรวม CVC Spelling)
  // ⚠️ อย่าลืมเตรียมไฟล์วิดีโอและเปลี่ยนชื่อให้ตรงนะครับ
  const mainVideo = "/videos/phonics/cvc_spelling.mp4";

  // 🎵 จัดการเสียง BGM (ปิดเพลงพื้นหลังเมื่อเข้าหน้านี้)
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true); // ปิด BGM
    return () => {
      if (onVideoStateChange) onVideoStateChange(false); // เปิด BGM เมื่อออก
    };
  }, [onVideoStateChange]);

  // ▶️ สั่งให้วิดีโอเล่นทันทีที่โหลดหน้าเสร็จ
  useEffect(() => {
    if (videoRef.current) {
      // ลดเสียงลงเหลือ 30% เพื่อไม่ให้ดังเกินไป
      videoRef.current.volume = 0.3; 
      
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  // ฟังก์ชันกระโดดไปเวลาที่กำหนด
  const jumpToTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play(); // สั่งเล่นต่อทันที
    }
  };

  // 🔠 ข้อมูลปุ่มกดข้ามเวลา (A, E, I, O, U)
  const timeStamps = [
    { id: 1, char: "A", time: 29,  color: "bg-red-500", border: "border-red-600" },      // 0:29
    { id: 2, char: "E", time: 110, color: "bg-yellow-400", border: "border-yellow-500" }, // 1:50
    { id: 3, char: "I", time: 179, color: "bg-green-500", border: "border-green-600" },  // 2:59
    { id: 4, char: "O", time: 250, color: "bg-blue-500", border: "border-blue-600" },    // 4:10
    { id: 5, char: "U", time: 322, color: "bg-purple-500", border: "border-purple-600" } // 5:22
  ];

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden bg-orange-50"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center', 
      }}
    >
      
      {/* ส่วนบน: ปุ่มย้อนกลับ & หัวข้อ */}
      <div className="relative z-20 w-full px-4 pt-4 pb-2 flex items-center justify-between">
         <button 
            onClick={() => navigate(-1)} 
            className="bg-white border-[3px] border-orange-300 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
         >
            <span className="text-2xl">⬅️</span>
         </button>

         <div className="bg-white/90 border-[3px] border-purple-400 px-6 py-1.5 rounded-full shadow-sm">
            <h1 className="text-lg md:text-2xl font-black text-purple-600">
                🗣️ ฝึกสะกดคำ (Spelling)
            </h1>
         </div>
         <div className="w-12"></div> {/* พื้นที่ว่างจัดสมดุล */}
      </div>

      {/* 📺 Video Player (เล่นทันที) */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 px-2 pb-2">
         <div className="relative w-full max-w-4xl aspect-video bg-black rounded-[2rem] border-[8px] border-orange-400 shadow-[0_10px_0_#ea580c] overflow-hidden">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain" 
                controls
                autoPlay
                playsInline
                muted={isMuted}
            />
         </div>
      </div>

      {/* 🔢 ปุ่มกดข้ามเวลา (A, E, I, O, U) */}
      <div className="relative z-20 w-full pb-6 pt-2 flex justify-center items-center">
         <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-[2rem] border-[4px] border-blue-200 shadow-lg flex gap-3 md:gap-6 overflow-x-auto no-scrollbar">
            
            <div className="flex flex-col justify-center mr-2">
                 <span className="text-xs md:text-sm font-bold text-gray-500">เลือกสระ:</span>
            </div>

            {timeStamps.map((item) => (
                <button
                    key={item.id}
                    onClick={() => jumpToTime(item.time)}
                    className={`
                        group flex flex-col items-center justify-center
                        w-12 h-12 md:w-16 md:h-16
                        rounded-full 
                        ${item.color} ${item.border} border-[3px]
                        shadow-md transition-all duration-150
                        hover:scale-110 hover:-translate-y-1 hover:shadow-lg
                        active:scale-90 active:translate-y-1
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
  );
}

export default PhonicsSpellingPage;