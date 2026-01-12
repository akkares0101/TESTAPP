import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

// Import รูปภาพ
import imgKhai from "../../assets/images/thai/kai.png";
import imgKhai2 from "../../assets/images/thai/khai.png";
import imgKhuad from "../../assets/images/thai/khuad.png";
import imgKwai from "../../assets/images/thai/kwai.png";
import imgKhon from "../../assets/images/thai/khon.png";

// Import เสียง
const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function ThaiGamePage({ isMuted }) {
  const navigate = useNavigate();

  const allChars = [
    { id: "k", char: "ก", word: "ก. ไก่", image: imgKhai },
    { id: "kh", char: "ข", word: "ข. ไข่", image: imgKhai2 },
    { id: "kh2", char: "ฃ", word: "ฃ. ขวด", image: imgKhuad },
    { id: "kw", char: "ค", word: "ค. ควาย", image: imgKwai },
    { id: "kh3", char: "ฅ", word: "ฅ. คน", image: imgKhon },
  ];

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    const shuffled = [...allChars].sort(() => Math.random() - 0.5);
    const newQuestions = shuffled.map((target) => {
      let distractors = allChars.filter((c) => c.id !== target.id);
      distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);
      return { target, options };
    });
    setQuestions(newQuestions);
  }, []);

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const speakWord = (text) => {
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "th-TH";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (questions.length > 0 && !showModal) {
      setTimeout(() => {
        speakWord(questions[currentQIndex].target.char);
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
      setTimeout(() => speakWord(currentQ.target.word), 500);
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
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/30 pointer-events-none"></div>

      {/* --- Header --- */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center z-20 mb-6">
        {/* ⭐ แก้ไขตรงนี้ครับ: เปลี่ยน path เป็น /thai/game */}
        <button
          onClick={() => navigate("/thai/game")}
          className="bg-white px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all text-orange-500 font-black text-xl flex items-center gap-2"
        >
          <span>◀</span> เลือกเกมอื่น
        </button>

        <div className="hidden md:flex flex-col items-center w-1/3">
          <div className="w-full bg-white/50 h-6 rounded-full overflow-hidden border-4 border-white shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-500"
              style={{
                width: `${((currentQIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-orange-600 font-bold mt-1 bg-white/60 px-3 rounded-full text-sm">
            ข้อที่ {currentQIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="bg-green-500 px-6 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-2xl">
          คะแนน: {score}
        </div>
      </div>

      {/* --- Main Game Area --- */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-[90rem] px-4 z-10">
        <div
          onClick={() => speakWord(currentQ.target.word)}
          className="cursor-pointer bg-white rounded-[3rem] w-40 h-40 md:w-60 md:h-60 flex items-center justify-center shadow-[0_10px_0_rgba(0,0,0,0.1)] mb-10 border-[10px] border-orange-200 animate-bounce-slow hover:scale-105 transition-transform"
        >
          <h2 className="text-[8rem] md:text-[10rem] font-black text-gray-800 leading-none drop-shadow-sm mt-[-1rem]">
            {currentQ.target.char}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-16 w-full items-center">
          {currentQ.options.map((option, index) => {
            let containerEffect = "";
            let imageStyle = "drop-shadow-2xl";

            if (isAnswered) {
              if (option.id === currentQ.target.id) {
                imageStyle =
                  "drop-shadow-[0_0_50px_rgba(74,222,128,1)] brightness-110";
                containerEffect = "scale-110 z-10";
              } else if (selectedOptionId === option.id) {
                imageStyle = "grayscale opacity-50 drop-shadow-none";
                containerEffect = "scale-90";
              } else {
                imageStyle = "grayscale opacity-30 drop-shadow-none";
                containerEffect = "scale-80";
              }
            } else {
              containerEffect = "hover:scale-110 animate-float";
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswer(option)}
                style={{ animationDelay: `${index * 0.2}s` }}
                className={`
                  cursor-pointer group relative
                  w-[180px] h-[180px] md:w-[280px] md:h-[280px] 
                  flex items-center justify-center
                  transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${containerEffect}
                `}
              >
                <img
                  src={option.image}
                  alt={option.word}
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

      {/* --- Victory Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-2xl relative overflow-hidden animate-bounce-in">
            <h2 className="text-5xl font-black text-orange-500 mb-4 drop-shadow-sm">
              เก่งมาก! 🎉
            </h2>
            <div className="flex justify-center gap-2 mb-6 text-6xl">
              ⭐ ⭐ ⭐
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 mb-8 border-2 border-orange-100">
              <p className="text-xl text-gray-600 font-bold">คะแนนรวม</p>
              <p className="text-7xl font-black text-green-500 mt-2">
                {score} / {questions.length}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white text-2xl font-black py-3 rounded-full shadow-lg hover:scale-105"
              >
                🔄 เล่นอีกครั้ง
              </button>
              {/* แก้ปุ่มใน Modal ด้วยครับ */}
              <button
                onClick={() => navigate("/thai/game")}
                className="bg-white text-orange-500 text-xl font-black py-3 rounded-full border-4 border-orange-200"
              >
                เลือกเกมอื่น
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

export default ThaiGamePage;
