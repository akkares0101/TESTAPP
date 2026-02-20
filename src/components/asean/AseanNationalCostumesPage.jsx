import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

function AseanNationalCostumesPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  // State เก็บประเทศที่เลือก (เริ่มต้นเป็น null หรือเลือกประเทศแรกก็ได้)
  const [selectedCountry, setSelectedCountry] = useState(null);

  // 🎥 Path วิดีโอหลัก (คลิปรวมการแต่งกาย)
  // ⚠️ อย่าลืมเตรียมไฟล์ video นี้ไว้ใน folder: public/videos/asean/costumes.mp4
  const mainVideo = "/videos/asean/costumes.mp4";

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ เล่นวิดีโอทันทีที่เข้าหน้า
  useEffect(() => {
    if (videoRef.current) {
        // ลดเสียงลงหน่อยเพื่อไม่ให้ดังเกินไป
        videoRef.current.volume = 0.5;
        videoRef.current.play().catch(() => {});
    }
  }, []);

  // ข้อมูลประเทศและเวลา (วินาที)
  const aseanData = [
    { id: "brunei", name: "บรูไน", time: 15 },    // 0.15
    { id: "cam", name: "กัมพูชา", time: 45 },     // 0.45
    { id: "indo", name: "อินโดนีเซีย", time: 62 },// 1.02
    { id: "laos", name: "ลาว", time: 88 },        // 1.28
    { id: "malay", name: "มาเลเซีย", time: 111 }, // 1.51
    { id: "myan", name: "เมียนมา", time: 139 },   // 2.19
    { id: "phil", name: "ฟิลิปปินส์", time: 156 },// 2.36
    { id: "sing", name: "สิงคโปร์", time: 184 },  // 3.04
    { id: "thai", name: "ไทย", time: 215 },       // 3.35
    { id: "viet", name: "เวียดนาม", time: 242 },  // 4.02
    { id: "timor", name: "ติมอร์-เลสเต", time: 259 } // 4.19
  ];

  // ธีมสีปุ่ม
  const colorThemes = [
    { bg: "from-rose-400 to-pink-500", border: "border-pink-600", shadow: "shadow-pink-200" },
    { bg: "from-sky-400 to-blue-500", border: "border-blue-600", shadow: "shadow-sky-200" },
    { bg: "from-green-400 to-emerald-500", border: "border-emerald-600", shadow: "shadow-green-200" },
    { bg: "from-orange-400 to-amber-500", border: "border-amber-600", shadow: "shadow-orange-200" },
    { bg: "from-purple-400 to-violet-500", border: "border-violet-600", shadow: "shadow-purple-200" },
  ];

  // ฟังก์ชันกระโดดไปเวลาที่กำหนด
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    if (videoRef.current) {
      videoRef.current.currentTime = country.time;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
        }}
      ></div>

      {/* Header */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center py-2 shrink-0 h-16 md:h-20 z-10 pt-4">
        <button
          onClick={() => navigate("/asean")}
          className="bg-white text-orange-500 w-12 h-12 md:w-14 md:h-14 rounded-full font-black text-2xl shadow-sm border-[3px] border-orange-200 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
        >
          ⬅️
        </button>
        <div className="bg-white/90 px-8 py-2 rounded-full shadow-lg border-[4px] border-orange-300">
          <h1 className="text-xl md:text-3xl font-black text-orange-600 tracking-wide">
            👗 การแต่งกายประจำชาติอาเซียน
          </h1>
        </div>
        <div className="w-12 md:w-14"></div>
      </div>

      {/* Video Player Area */}
      <div className="w-full max-w-5xl px-4 flex-1 min-h-0 flex flex-col justify-center pb-2 z-10">
        <div className="relative w-full aspect-video bg-black rounded-[2rem] border-[8px] border-orange-300 shadow-[0_10px_0_#c2410c] overflow-hidden group">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                autoPlay
                playsInline
            />
            {/* Overlay ชื่อประเทศที่กำลังเลือกอยู่ */}
            {selectedCountry && (
                <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full text-lg backdrop-blur-sm pointer-events-none animate-fade-in">
                    📍 {selectedCountry.name}
                </div>
            )}
        </div>
      </div>

      {/* Control Panel (Buttons) */}
      <div className="w-full max-w-6xl h-[30vh] md:h-[25vh] shrink-0 bg-white/80 backdrop-blur-md rounded-t-[2.5rem] p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex flex-col z-20 border-t-4 border-white">
        <div className="text-center mb-2">
            <span className="text-gray-500 font-bold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                เลือกประเทศเพื่อดูการแต่งกาย
            </span>
        </div>
        <div className="flex-1 overflow-y-auto pb-4 px-2 no-scrollbar">
          <div className="flex flex-wrap justify-center gap-3">
            {aseanData.map((country, index) => {
               const theme = colorThemes[index % colorThemes.length];
               const isSelected = selectedCountry?.id === country.id;
               
               return (
                  <button
                    key={country.id}
                    onClick={() => handleSelectCountry(country)}
                    className={`
                      relative px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl
                      bg-gradient-to-br ${theme.bg}
                      border-b-[4px] border-r-[2px] border-l-0 border-t-0 ${theme.border}
                      shadow-md transition-all duration-150
                      flex items-center gap-2
                      ${isSelected 
                        ? "translate-y-1 border-b-0 brightness-110 ring-4 ring-white scale-95" 
                        : "hover:-translate-y-1 hover:scale-105 hover:brightness-105"
                      }
                    `}
                  >
                    <span className="text-base md:text-xl font-black text-white drop-shadow-sm whitespace-nowrap">
                      {country.name}
                    </span>
                  </button>
               );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default AseanNationalCostumesPage;