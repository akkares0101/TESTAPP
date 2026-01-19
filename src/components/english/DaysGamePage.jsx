import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/Daysbg.png";

// Import รูปภาพวัน
import imgSun from "../../assets/images/days/7.png";
import imgMon from "../../assets/images/days/1.png";
import imgTue from "../../assets/images/days/2.png";
import imgWed from "../../assets/images/days/3.png";
import imgThu from "../../assets/images/days/4.png";
import imgFri from "../../assets/images/days/5.png";
import imgSat from "../../assets/images/days/6.png";

// Import เสียง
const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

// ปรับระดับเสียง
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function DaysGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลวันทั้ง 7
  const allDays = [
    { id: "sun", eng: "Sunday", thai: "วันอาทิตย์", image: imgSun },
    { id: "mon", eng: "Monday", thai: "วันจันทร์", image: imgMon },
    { id: "tue", eng: "Tuesday", thai: "วันอังคาร", image: imgTue },
    { id: "wed", eng: "Wednesday", thai: "วันพุธ", image: imgWed },
    { id: "thu", eng: "Thursday", thai: "วันพฤหัสบดี", image: imgThu },
    { id: "fri", eng: "Friday", thai: "วันศุกร์", image: imgFri },
    { id: "sat", eng: "Saturday", thai: "วันเสาร์", image: imgSat },
  ];

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    const shuffledDays = [...allDays].sort(() => Math.random() - 0.5);

    const newQuestions = shuffledDays.map((target) => {
      let distractors = allDays.filter((d) => d.id !== target.id);
      distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);

      return {
        target: target,
        options: options,
      };
    });

    setQuestions(newQuestions);
  }, []);

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const speakWord = (text, lang = "th-TH") => {
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (questions.length > 0 && !showModal) {
      setTimeout(() => {
        speakWord(questions[currentQIndex].target.thai);
      }, 500);
    }
  }, [currentQIndex, questions]);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionId(option.id);

    const currentQ = questions[currentQIndex];

    if (option.id === currentQ.target.id) {
      playSound(correctSound);
      setScore(score + 1);
      setTimeout(() => speakWord(currentQ.target.eng, "en-US"), 500);
    } else {
      playSound(wrongSound);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setIsAnswered(false);
        setSelectedOptionId(null);
      } else {
        setShowModal(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    window.location.reload();
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQ = questions[currentQIndex];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-4 select-none overflow-hidden relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

      {/* --- Header --- */}
      <div className="w-full max-w-7xl px-4 flex justify-between items-center z-20 mb-6">
        <button
          onClick={() => navigate("/days")}
          className="bg-white px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all text-orange-500 font-black text-xl flex items-center gap-2"
        >
          Back
        </button>

        {/* Progress Bar */}
        <div className="hidden md:flex flex-col items-center w-1/3">
          <div className="w-full bg-white/50 h-6 rounded-full overflow-hidden border-4 border-white shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-500"
              style={{ width: `${((currentQIndex + 1) / 7) * 100}%` }}
            ></div>
          </div>
          <span className="text-orange-600 font-bold mt-1 bg-white/60 px-3 rounded-full text-sm">
            ข้อที่ {currentQIndex + 1} / 7
          </span>
        </div>

        <div className="bg-green-500 px-6 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-2xl">
          Score: {score}
        </div>
      </div>

      {/* --- Main Game Area --- */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-[90rem] px-4 z-10">
        {/* โจทย์ (ภาษาไทย) - ยังมีกรอบอยู่เพื่อให้เด่นชัด */}
        <div
          onClick={() => speakWord(currentQ.target.thai)}
          className="cursor-pointer bg-white rounded-[3rem] px-16 py-8 shadow-[0_10px_0_rgba(0,0,0,0.1)] mb-16 border-8 border-orange-200 animate-bounce-slow hover:scale-105 transition-transform"
        >
          <h2 className="text-5xl md:text-8xl font-black text-gray-700 text-center drop-shadow-sm">
            {currentQ.target.thai}
          </h2>
          <p className="text-center text-gray-400 mt-4 font-bold flex justify-center gap-2 items-center text-xl">
            <span>🔊</span> กดเพื่อฟังเสียง
          </p>
        </div>

        {/* ตัวเลือก 3 รูป (แบบไม่มีกรอบ) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-24 w-full items-center">
          {currentQ.options.map((option, index) => {
            let containerEffect = "";
            // ใช้ drop-shadow และ filter แทนกรอบ
            let imageStyle = "drop-shadow-2xl";

            if (isAnswered) {
              if (option.id === currentQ.target.id) {
                // ถูกต้อง: เปล่งแสงสีเขียว, สว่างขึ้น, ขยาย
                imageStyle =
                  "drop-shadow-[0_0_40px_rgba(74,222,128,0.9)] brightness-110 saturate-125";
                containerEffect = "scale-115 z-10";
              } else if (selectedOptionId === option.id) {
                // ผิด (ที่เลือก): สีเทา, จางลง, หด
                imageStyle = "grayscale opacity-60 drop-shadow-none";
                containerEffect = "scale-90";
              } else {
                // ผิด (ที่ไม่ได้เลือก): สีเทา, จางมาก, หด
                imageStyle = "grayscale opacity-30 drop-shadow-none";
                containerEffect = "scale-85";
              }
            } else {
              // ปกติ: ลอย, เมาส์ชี้แล้วขยาย
              containerEffect = "hover:scale-110 animate-float";
              // imageStyle คือ drop-shadow-2xl ตั้งต้น
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswer(option)}
                style={{ animationDelay: `${index * 0.2}s` }}
                className={`
                  cursor-pointer group relative
                  /* กำหนดขนาดพื้นที่ เพื่อการจัดวาง แต่ไม่มีสีพื้นหลัง/กรอบ */
                  w-[240px] h-[300px] md:w-[350px] md:h-[450px] 
                  flex items-center justify-center
                  transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${containerEffect}
                `}
              >
                {/* รูปภาพเพียวๆ + เอฟเฟกต์แสงเงา */}
                <img
                  src={option.image}
                  alt={option.eng}
                  className={`
                     w-full h-full object-contain 
                     transition-all duration-500 
                     ${imageStyle}
                   `}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Modal จบเกม --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-2xl relative overflow-hidden animate-bounce-in">
            <h2 className="text-5xl font-black text-orange-500 mb-4 drop-shadow-sm">
              Great Job! 🎉
            </h2>

            <div className="flex justify-center gap-2 mb-6 text-6xl">
              ⭐ ⭐ ⭐
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 mb-8 border-2 border-orange-100">
              <p className="text-xl text-gray-600 font-bold">Total Score</p>
              <p className="text-7xl font-black text-green-500 mt-2">
                {score} / 7
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white text-2xl font-black py-3 rounded-full shadow-lg hover:scale-105 border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
              >
                🔄 Play Again
              </button>
              <button
                onClick={() => navigate("/days")}
                className="bg-white text-orange-500 text-xl font-black py-3 rounded-full border-4 border-orange-200 hover:bg-orange-50"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 2s infinite; }
        @keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default DaysGamePage;
