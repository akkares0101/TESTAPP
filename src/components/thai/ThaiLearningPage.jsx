import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

function ThaiLearningPage({ globalVolume, isMuted }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [selectedChar, setSelectedChar] = useState(null);

  const thaiConsonants = [
    "ก",
    "ข",
    "ฃ",
    "ค",
    "ฅ",
    "ฆ",
    "ง",
    "จ",
    "ฉ",
    "ช",
    "ซ",
    "ฌ",
    "ญ",
    "ฎ",
    "ฏ",
    "ฐ",
    "ฑ",
    "ฒ",
    "ณ",
    "ด",
    "ต",
    "ถ",
    "ท",
    "ธ",
    "น",
    "บ",
    "ป",
    "ผ",
    "ฝ",
    "พ",
    "ฟ",
    "ภ",
    "ม",
    "ย",
    "ร",
    "ล",
    "ว",
    "ศ",
    "ษ",
    "ส",
    "ห",
    "ฬ",
    "อ",
    "ฮ",
  ];

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

  const getVideoSrc = (char) => `/videos/thai/${char}.mp4`;

  const handleLetterClick = (char) => setSelectedChar(char);

  useEffect(() => {
    if (selectedChar && videoRef.current) {
      videoRef.current.volume = globalVolume || 1.0;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play error:", e));
      }
    }
  }, [selectedChar, globalVolume]);

  const ThaiCharButton = ({ char, index }) => {
    const isSelected = selectedChar === char;
    const theme = colorThemes[index % colorThemes.length];
    return (
      <button
        onClick={() => handleLetterClick(char)}
        className={`
          group relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl 
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
        <span className="text-lg md:text-2xl font-black text-white drop-shadow-sm">
          {char}
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
          onClick={() => navigate("/thai-alphabet")}
          className="bg-white text-orange-500 w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-xl md:text-2xl shadow-sm border-4 border-white hover:scale-110"
        >
          ◀
        </button>
        <div className="bg-white/90 px-6 py-1 rounded-full shadow-lg border-4 border-orange-200">
          <h1 className="text-xl md:text-3xl font-black text-orange-500">
            🇹🇭 ฝึกท่อง ก-ฮ
          </h1>
        </div>
        <div className="w-10 md:w-12"></div>
      </div>

      <div className="w-full max-w-5xl px-4 flex-1 min-h-0 flex flex-col justify-center pb-2 z-10">
        <div className="w-full h-full bg-orange-100 ring-4 ring-white rounded-[2rem] border-[8px] border-orange-300 shadow-xl overflow-hidden relative flex flex-col">
          <div className="flex-1 bg-black relative flex items-center justify-center">
            {selectedChar ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                muted={isMuted}
                autoPlay
              >
                <source src={getVideoSrc(selectedChar)} type="video/mp4" />
              </video>
            ) : (
              <div className="text-white/30 text-center">
                <span className="text-6xl">🎬</span>
                <p>เลือกพยัญชนะ</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl h-[30vh] shrink-0 bg-white/60 backdrop-blur-xl rounded-t-[2rem] p-3 shadow-lg flex flex-col z-10">
        <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-2 px-1">
            {thaiConsonants.map((char, index) => (
              <ThaiCharButton key={char} char={char} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThaiLearningPage;
