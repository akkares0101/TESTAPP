import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/Daysbg.png";

// ⭐ 1. Import รูปหน้าปกของแต่ละวัน (เตรียมไฟล์ให้ครบนะครับ)
import imgSun from "../../assets/images/days/sunday.png";
import imgMon from "../../assets/images/days/monday.png";
import imgTue from "../../assets/images/days/tuesday.png";
import imgWed from "../../assets/images/days/wednesday.png";
import imgThu from "../../assets/images/days/thursday.png";
import imgFri from "../../assets/images/days/friday.png";
import imgSat from "../../assets/images/days/saturday.png";

// ⭐ 2. Import วิดีโอ
import vidSun from "../../assets/videos/days/sunday.mp4";
import vidMon from "../../assets/videos/days/monday.mp4";
import vidTue from "../../assets/videos/days/tuesday.mp4";
import vidWed from "../../assets/videos/days/wednesday.mp4";
import vidThu from "../../assets/videos/days/thursday.mp4";
import vidFri from "../../assets/videos/days/friday.mp4";
import vidSat from "../../assets/videos/days/saturday.mp4";

const clickSound = new Audio("/sounds/click.mp3");

function DaysLearningPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // จับคู่ข้อมูล: รูปภาพ + วิดีโอ + สีขอบ
  const days = [
    {
      id: 1,
      eng: "Sunday",
      thai: "วันอาทิตย์",
      image: imgSun,
      video: vidSun,
      border: "border-red-500",
      shadow: "shadow-red-200",
    },
    {
      id: 2,
      eng: "Monday",
      thai: "วันจันทร์",
      image: imgMon,
      video: vidMon,
      border: "border-yellow-400",
      shadow: "shadow-yellow-200",
    },
    {
      id: 3,
      eng: "Tuesday",
      thai: "วันอังคาร",
      image: imgTue,
      video: vidTue,
      border: "border-pink-400",
      shadow: "shadow-pink-200",
    },
    {
      id: 4,
      eng: "Wednesday",
      thai: "วันพุธ",
      image: imgWed,
      video: vidWed,
      border: "border-green-500",
      shadow: "shadow-green-200",
    },
    {
      id: 5,
      eng: "Thursday",
      thai: "วันพฤหัสบดี",
      image: imgThu,
      video: vidThu,
      border: "border-orange-400",
      shadow: "shadow-orange-200",
    },
    {
      id: 6,
      eng: "Friday",
      thai: "วันศุกร์",
      image: imgFri,
      video: vidFri,
      border: "border-blue-400",
      shadow: "shadow-blue-200",
    },
    {
      id: 7,
      eng: "Saturday",
      thai: "วันเสาร์",
      image: imgSat,
      video: vidSat,
      border: "border-purple-500",
      shadow: "shadow-purple-200",
    },
  ];

  const handleDayClick = (item) => {
    playClick();
    // ส่งข้อมูลไปหน้าเล่นวิดีโอ
    navigate("/lesson", {
      state: {
        title: item.eng,
        videoSrc: item.video,
      },
    });
  };

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
      {/* --- Header --- */}
      <div className="w-full max-w-7xl px-4 flex justify-between items-center z-20 mb-6">
        <button
          onClick={() => navigate("/days")}
          className="bg-white text-orange-500 px-4 py-2 rounded-full border-4 border-white shadow-md font-black hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span>◀</span> Back
        </button>

        <div className="bg-white/90 px-8 py-2 rounded-full border-4 border-sky-400 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-black text-sky-500">
            📅 Days Vocabulary
          </h1>
        </div>

        <button
          onClick={() => navigate("/days/game")}
          className="bg-green-500 text-white px-4 py-2 rounded-full border-4 border-white shadow-md font-black hover:bg-green-600 hover:scale-105 transition-transform flex items-center gap-2"
        >
          Play Game <span>▶</span>
        </button>
      </div>

      {/* --- Grid Cards (รูปภาพ) --- */}
      <div className="flex-1 flex flex-wrap justify-center content-center gap-6 max-w-6xl px-4 pb-10">
        {days.map((day) => (
          <div
            key={day.id}
            onClick={() => handleDayClick(day)}
            className={`
              cursor-pointer group relative
              /* ขนาดการ์ด */
              w-[160px] h-[200px] md:w-[240px] md:h-[300px]
              rounded-[2rem] border-[6px] bg-white
              flex flex-col items-center overflow-hidden
              transition-all duration-300 hover:scale-105 hover:-translate-y-2
              ${day.border} shadow-xl
            `}
          >
            {/* ส่วนรูปภาพ (เต็มพื้นที่ด้านบน) */}
            <div className="w-full h-[75%] bg-gray-50 flex items-center justify-center overflow-hidden p-2">
              <img
                src={day.image}
                alt={day.eng}
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* ส่วนชื่อด้านล่าง */}
            <div className="w-full h-[25%] flex flex-col items-center justify-center bg-white border-t-2 border-gray-100 z-10">
              <h2 className="text-xl md:text-2xl font-black text-gray-700">
                {day.eng}
              </h2>
              <p className="text-gray-400 font-bold text-sm md:text-base">
                {day.thai}
              </p>
            </div>

            {/* ไอคอนปุ่ม Play (ลอยอยู่ตรงกลางเมื่อเอาเมาส์ชี้) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
              <div className="bg-white/90 rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <span className="text-4xl ml-2">▶️</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaysLearningPage;
