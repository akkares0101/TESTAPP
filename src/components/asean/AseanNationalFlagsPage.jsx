import React, { useState, useRef, useEffect } from "react";
import bgImage from "../../assets/images/bg.png";

function AseanNationalFlagsPage({ isMuted, onVideoStateChange }) {
  const videoRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 🎥 Path วิดีโอหลัก
  const mainVideo = "/videos/asean/flags.mp4";

  // 🎵 จัดการเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) onVideoStateChange(true);
    return () => {
      if (onVideoStateChange) onVideoStateChange(false);
    };
  }, [onVideoStateChange]);

  // ▶️ สั่งให้วิดีโอเริ่มเล่นอัตโนมัติ
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.volume = 0.5;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  // 🚩 ข้อมูลประเทศและเวลา
  const aseanData = [
    { id: "asean", name: "ธงอาเซียน", time: 32 },
    { id: "thai", name: "ไทย", time: 69 },
    { id: "indo", name: "อินโดนีเซีย", time: 84 },
    { id: "malay", name: "มาเลเซีย", time: 96 },
    { id: "sing", name: "สิงคโปร์", time: 111 },
    { id: "phil", name: "ฟิลิปปินส์", time: 122 },
    { id: "laos", name: "ลาว", time: 136 },
    { id: "viet", name: "เวียดนาม", time: 147 },
    { id: "myan", name: "เมียนมา", time: 158 },
    { id: "brunei", name: "บรูไน", time: 170 },
    { id: "cam", name: "กัมพูชา", time: 183 },
    { id: "timor", name: "ติมอร์", time: 194 }
  ];

  const colorThemes = [
    { bg: "from-rose-400 to-pink-500", border: "border-pink-600" },
    { bg: "from-sky-400 to-blue-500", border: "border-blue-600" },
    { bg: "from-green-400 to-emerald-500", border: "border-emerald-600" },
    { bg: "from-orange-400 to-amber-500", border: "border-amber-600" },
    { bg: "from-purple-400 to-violet-500", border: "border-violet-600" },
  ];

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    if (videoRef.current) {
      videoRef.current.currentTime = country.time;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col items-center relative">
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
        }}
      ></div>

      {/* 1. Header (❌ ไม่มีปุ่มกลับ จัดกึ่งกลางคลีนๆ) */}
      <div className="w-full px-4 flex justify-center items-center py-2 shrink-0 z-10 mt-1">
        <div className="bg-white/90 backdrop-blur-md px-10 py-1.5 rounded-full border-[3px] border-orange-400 shadow-sm">
          <h1 className="text-xl md:text-2xl font-black text-orange-600 tracking-wide">
            🚩 ธงชาติอาเซียน
          </h1>
        </div>
      </div>

      {/* 2. Video Player Area (ขยายจอใหญ่ 1100px และสูง 65vh) */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 px-4 min-h-0">
        <div className="relative w-full max-w-[1100px] aspect-video max-h-[65vh] bg-black rounded-[2.5rem] border-[6px] md:border-[10px] border-orange-300 shadow-[0_12px_0_#c2410c] overflow-hidden group">
            <video
                ref={videoRef}
                src={mainVideo}
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {selectedCountry && (
                <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full text-lg backdrop-blur-sm pointer-events-none animate-fade-in z-20">
                    📍 {selectedCountry.name}
                </div>
            )}
        </div>
      </div>

      {/* 3. แผงปุ่มจิ๋ว (จบในหน้าเดียว ไม่ต้องเลื่อน) */}
      <div className="w-full max-w-[1150px] shrink-0 bg-white/90 backdrop-blur-md rounded-t-[2.5rem] border-t-2 border-white shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center z-20 pt-2 pb-5">
        
        {/* แถวปุ่มเล่น/หยุด */}
        <div className="flex items-center gap-4 mb-3 shrink-0">
            <button 
                onClick={togglePlay}
                className={`px-8 py-1.5 rounded-full text-base font-black text-white shadow-md transition-all ${isPlaying ? 'bg-rose-500' : 'bg-emerald-500'}`}
            >
                {isPlaying ? 'หยุดวิดีโอ' : 'เล่นต่อ'}
            </button>
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest hidden md:block">Select Flag</span>
        </div>

        {/* ตารางประเทศ (ปุ่มเล็กลงเพื่อให้ครบ 12 ปุ่มโดยไม่ต้องเลื่อน) */}
        <div className="w-full px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {aseanData.map((country, index) => {
               const theme = colorThemes[index % colorThemes.length];
               const isSelected = selectedCountry?.id === country.id;
               
               return (
                  <button
                    key={country.id}
                    onClick={() => handleSelectCountry(country)}
                    className={`
                      px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl
                      bg-gradient-to-br ${theme.bg}
                      border-b-[4px] border-r ${theme.border}
                      shadow-sm transition-all duration-150
                      ${isSelected 
                        ? "translate-y-1 border-b-0 brightness-110 ring-2 ring-white scale-105" 
                        : "hover:-translate-y-0.5 hover:brightness-105"
                      }
                    `}
                  >
                    <span className="text-sm md:text-lg font-black text-white drop-shadow-sm whitespace-nowrap">
                      {country.name}
                    </span>
                  </button>
               );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AseanNationalFlagsPage;