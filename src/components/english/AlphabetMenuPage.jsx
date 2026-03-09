import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const btnABC = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_abc.png";
const btnFamily = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_family.png";
const btnSound = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_sound.png";
const btnFeeling = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_feeling.png";
const btnColors = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_colors.png";
const btnDays = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_days.png";
const btnactivity = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/buttons/btn_months.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function AlphabetMenuPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const menuItems = [
    { id: 1, image: btnABC, path: "/alphabet/select", title: "ABC" },
    { id: 2, image: btnFamily, path: "/family", title: "Family" },
    { id: 3, image: btnSound, path: "/alphabet/game-sound", title: "Phonics" },
    { id: 4, image: btnFeeling, path: "/feeling", title: "Feelings" },
    { id: 5, image: btnColors, path: "/colors", title: "Colors" },
    { id: 6, image: btnDays, path: "/days", title: "Days" },
    { id: 7, image: btnactivity, path: "/activity", title: "Daily activity" },
  ];

  // แยก 2 แถว (4 บน / 3 ล่าง)
  const topRow = menuItems.slice(0, 4);
  const bottomRow = menuItems.slice(4, 7);

  // ปุ่มแบบปรับตามจอ: ใหญ่บน 4K แต่ไม่ล้น
  const renderButton = (item) => (
    <div
      key={item.id}
      onClick={() => { playClick(); if (item.path) navigate(item.path); }}
      className="
        group relative cursor-pointer
        flex items-center justify-center

        w-[clamp(200px,12vw,420px)] h-[clamp(200px,12vw,420px)]

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
    </div>
  );

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >

      {/* เนื้อหากลางจอให้พอดี 4K */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-6">
        {/* หัวข้อ */}
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl
          font-black text-white drop-shadow-md
          bg-orange-400/80
          px-10 py-3
          rounded-full border-4 border-white
          mb-6
        ">
          ภาษาอังกฤษ
        </h1>

        {/* Grid ปุ่มเมนู */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {topRow.map(renderButton)}
          </div>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {bottomRow.map(renderButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlphabetMenuPage;
