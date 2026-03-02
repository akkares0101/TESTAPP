import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

const clickSound = new Audio("/sounds/click.mp3");

function AseanGameMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, title: "สัตว์ประจำชาติ", path: "/asean/asean-trace", color: "from-rose-500 to-rose-600", border: "border-rose-800" },
    { id: 2, title: "ธงชาติอาเซียน", path: "/asean/asean-flags", color: "from-sky-500 to-sky-600", border: "border-sky-800" },
    { id: 3, title: "ดอกไม้ประจำชาติ", path: "/asean/asean-flowers", color: "from-emerald-500 to-emerald-600", border: "border-emerald-800" },
    { id: 4, title: "แต่งกายประจำชาติ", path: "/asean/asean-dress", color: "from-purple-500 to-purple-600", border: "border-purple-800" },
    { id: 5, title: "คำทักทาย", path: "/asean/asean-greeting", color: "from-orange-500 to-orange-600", border: "border-orange-800" },
  ];

  return (
    <div
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4">
        
        {/* 1. หัวข้อ (ดีไซน์เรียบหรู) */}
        <div className="bg-white/95 backdrop-blur-md px-12 py-3 rounded-[2rem] border-[5px] border-orange-400 shadow-[0_10px_0_#c2410c] mb-16 shrink-0">
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-orange-600 tracking-tighter drop-shadow-sm uppercase">
             ASEAN GAME MENU
           </h1>
        </div>

        {/* 2. Grid ปุ่มเมนูดีไซน์พรีเมียม (No Emoji) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full max-w-7xl shrink-0 px-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  if (item.path) navigate(item.path);
                }}
                className={`
                  group relative flex items-center justify-center
                  w-[180px] h-[140px] md:w-[280px] md:h-[180px] lg:w-[320px] lg:h-[200px]
                  bg-gradient-to-br ${item.color}
                  border-b-[12px] border-r-[4px] ${item.border}
                  rounded-[2.5rem] shadow-2xl
                  transition-all duration-150
                  hover:brightness-110 hover:-translate-y-2
                  active:translate-y-[10px] active:border-b-0 active:shadow-inner
                `}
              >
                {/* ข้อความขนาดใหญ่ (เน้นความชัดเจน) */}
                <div className="flex flex-col items-center text-center px-4">
                    <span className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tight">
                        {item.title.split(" ").map((word, i) => (
                            <div key={i}>{word}</div>
                        ))}
                    </span>
                    <div className="w-12 h-1 bg-white/40 rounded-full mt-3 group-hover:w-24 transition-all duration-300"></div>
                </div>

                {/* แสงตกกระทบบนขอบปุ่มเพื่อให้ดูนูน */}
                <div className="absolute top-3 left-6 right-6 h-4 bg-white/20 rounded-full blur-[2px]"></div>
              </button>
            ))}
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default AseanGameMenuPage;