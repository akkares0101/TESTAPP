import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

// รับ props: globalVolume (ความดัง) และ isMuted (ปิดเสียง) มาจากตัวแม่
function AseanNationalFlagPage({ globalVolume, isMuted }) {
  const navigate = useNavigate();
  const videoRef = useRef(null); // ⭐ เพิ่ม ref สำหรับคุมวิดีโอ
  const [selectedCountry, setSelectedCountry] = useState(null);

  // ข้อมูลประเทศ (ใช้ id เป็นชื่อไฟล์วิดีโอ)
  const aseanCountries = [
    { id: "thai", name: "ไทย" },
    { id: "indo", name: "อินโดนีเซีย" },
    { id: "malay", name: "มาเลเซีย" },
    { id: "sing", name: "สิงคโปร์" },
    { id: "phil", name: "ฟิลิปปินส์" },
    { id: "laos", name: "ลาว" },
    { id: "viet", name: "เวียดนาม" },
    { id: "myan", name: "เมียนมา" },
    { id: "brunei", name: "บรูไน" },
    { id: "cam", name: "กัมพูชา" },
    { id: "timor", name: "ติมอร์-เลสเต" },
  ];

  // ธีมสี (เหมือนหน้า ก-ฮ)
  const colorThemes = [
    {
      bg: "from-rose-400 to-pink-500",
      border: "border-pink-600",
      shadow: "shadow-pink-200",
    },
    {
      bg: "from-sky-400 to-blue-500",
      border: "border-blue-600",
      shadow: "shadow-sky-200",
    },
    {
      bg: "from-green-400 to-emerald-500",
      border: "border-emerald-600",
      shadow: "shadow-green-200",
    },
    {
      bg: "from-orange-400 to-amber-500",
      border: "border-amber-600",
      shadow: "shadow-orange-200",
    },
    {
      bg: "from-purple-400 to-violet-500",
      border: "border-violet-600",
      shadow: "shadow-purple-200",
    },
  ];

  // ⭐ ฟังก์ชันหาไฟล์วิดีโอ: ต้องมีไฟล์ใน folder /videos/asean/ ชื่อตาม id เช่น thai.mp4
  const getVideoSrc = (id) => `/videos/asean/${id}.mp4`;

  // ⭐ useEffect สำหรับ Auto-play เหมือนหน้า ก-ฮ
  useEffect(() => {
    if (selectedCountry && videoRef.current) {
      videoRef.current.volume = globalVolume || 1.0;
      videoRef.current.load(); // สั่งโหลดไฟล์ใหม่เมื่อเปลี่ยนประเทศ
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play error:", e));
      }
    }
  }, [selectedCountry, globalVolume]);

  const CountryButton = ({ country, index }) => {
    const isSelected = selectedCountry?.id === country.id;
    const theme = colorThemes[index % colorThemes.length];
    return (
      <button
        onClick={() => setSelectedCountry(country)}
        className={`
          group relative h-10 md:h-12 px-3 md:px-5 rounded-xl md:rounded-2xl 
          bg-gradient-to-br ${
            theme.bg
          } border-b-4 border-r-2 border-l-0 border-t-0 ${theme.border}
          flex items-center justify-center shadow-md md:shadow-lg ${
            theme.shadow
          }
          transition-all duration-200
          ${
            isSelected
              ? "translate-y-1 border-b-0 brightness-110 ring-4 ring-white/50 scale-95"
              : "hover:-translate-y-1 hover:scale-110"
          }
        `}
      >
        <span className="text-sm md:text-xl font-black text-white drop-shadow-sm whitespace-nowrap">
          {country.name}
        </span>
      </button>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
        }}
      ></div>

      <div className="w-full max-w-6xl px-4 flex justify-between items-center py-2 shrink-0 h-16 md:h-20 z-10">
        <button
          onClick={() => navigate("/asean")}
          className="bg-white text-orange-500 w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-xl md:text-2xl shadow-sm border-4 border-white hover:scale-110"
        >
          ◀
        </button>
        <div className="bg-white/90 px-6 py-1 rounded-full shadow-lg border-4 border-orange-200">
          <h1 className="text-xl md:text-3xl font-black text-orange-500">
            การแต่งกายประจำชาติ
          </h1>
        </div>
        <div className="w-10 md:w-12"></div>
      </div>

      <div className="w-full max-w-5xl px-4 flex-1 min-h-0 flex flex-col justify-center pb-2 z-10">
        <div className="w-full h-full bg-orange-100 ring-4 ring-white rounded-[2rem] border-[8px] border-orange-300 shadow-xl overflow-hidden relative flex flex-col">
          <div className="flex-1 bg-black relative flex items-center justify-center">
            {selectedCountry ? (
              // ⭐ ใช้ <video> แทน <img>
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                autoPlay
              >
                <source
                  src={getVideoSrc(selectedCountry.id)}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className="text-white/30 text-center">
                <span className="text-6xl">🎬</span>
                <p>เลือกประเทศ</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl h-[30vh] shrink-0 bg-white/60 backdrop-blur-xl rounded-t-[2rem] p-3 shadow-lg flex flex-col z-10">
        <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-2 px-1">
            {aseanCountries.map((country, index) => (
              <CountryButton key={country.id} country={country} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AseanNationalFlagPage;
