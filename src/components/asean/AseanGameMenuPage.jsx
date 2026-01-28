import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

// ⭐ ใช้รูปชั่วคราวไปก่อน
import tempImg from "../../assets/images/thai/write.png";

const clickSound = new Audio("/sounds/click.mp3");

function AseanGameMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ⭐ กำหนดหัวข้อ 7 อย่าง
  const menuItems = [
    {
      id: 1,
      title: "เกมสัตว์ประจำชาติ",
      path: "/asean/asean-trace",
      image: tempImg,
    },
    {
      id: 2,
      title: "เกมธงชาติอาเซียน",
      path: "/asean/asean-flags",
      image: tempImg,
    },
    {
      id: 3,
      title: "เกมดอกไม้ประจำชาติ",
      path: "/asean/asean-flowers",
      image: tempImg,
    },
    {
      id: 4,
      title: "เกมแต่งกายประจำชาติ",
      path: "/asean/asean-dress",
      image: tempImg,
    },
    {
      id: 5,
      title: "เกมคำทักทาย",
      path: "/asean/asean-greeting",
      image: tempImg,
    },
  ];

  const topRow = menuItems.slice(0, 4);
  const bottomRow = menuItems.slice(4, 7);

  const renderButton = (item) => (
    <div
      key={item.id}
      onClick={() => {
        playClick();
        // ✅ แก้ไขตรงนี้: สั่งให้ไปตาม path ที่กำหนด
        if (item.path) {
          navigate(item.path);
        }
      }}
      className="
        group relative cursor-pointer
        flex flex-col items-center justify-center
        
        w-[140px] h-[140px] 
        md:w-[200px] md:h-[200px]
        
        transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        hover:scale-110 hover:-rotate-2
        active:scale-95 active:rotate-0
      "
    >
      <img
        src={item.image}
        alt={item.title}
        className="
          w-full h-full object-contain
          drop-shadow-lg group-hover:drop-shadow-2xl
          transition-all duration-300
        "
      />

      <div className="absolute bottom-2 bg-white/80 px-2 rounded-md">
        <span className="text-sm md:text-lg font-bold text-orange-600">
          {item.title}
        </span>
      </div>
    </div>
  );

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

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] gap-8 px-4 mt-2">
        {/* 2. หัวข้อ */}
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4 bg-orange-400/80 px-10 py-3 rounded-full border-4 border-white">
          อาเซียน (ASEAN)
        </h1>

        {/* 3. Grid ปุ่มเมนู */}
        <div className="flex flex-col items-center gap-6 md:gap-10 w-full">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {topRow.map(renderButton)}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {bottomRow.map(renderButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AseanGameMenuPage;
