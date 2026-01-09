import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/Daysbg.png";

// Import รูปปุ่ม (ใช้รูปเดียวกับ Family ได้เลย หรือจะทำใหม่ก็ได้ครับ)
import btnLearn from "../../assets/images/buttons/btn_learn.png";
import btnGame from "../../assets/images/buttons/btn_game.png";

const clickSound = new Audio("/sounds/click.mp3");

function DaysMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    {
      id: 1,
      image: btnLearn,
      path: "/days/learn",
      title: "Learn Days",
    },
    {
      id: 2,
      image: btnGame,
      path: "/days/game",
      title: "Days Game",
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ปุ่มย้อนกลับ */}
      <div className="w-full max-w-[95rem] px-4 mt-4 mb-2 z-20 flex justify-start">
        <button
          onClick={() => navigate("/alphabet")}
          className="bg-white text-orange-500 px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md border-4 border-white hover:border-orange-100 active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            ◀
          </span>
          <span className="hidden md:inline font-black text-lg">ย้อนกลับ</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] gap-10 px-4 -mt-10">
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-10 py-4 rounded-full border-[6px] border-sky-400 shadow-[0_6px_0_#0ea5e9] mb-6">
          <h1 className="text-3xl md:text-5xl font-black text-gray-700 tracking-wide flex items-center gap-3">
            📅 Days of the Week
          </h1>
        </div>

        {/* ปุ่มเมนู */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playClick();
                navigate(item.path);
              }}
              className="
                  group relative cursor-pointer
                  w-[200px] h-[200px] md:w-[300px] md:h-[300px]
                  transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95
                "
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DaysMenuPage;
