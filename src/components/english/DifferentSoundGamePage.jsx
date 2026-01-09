import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

// Import รูปภาพ
import imgCat from "../../assets/images/phonics/cat.png";
import imgBat from "../../assets/images/phonics/bat.png";
import imgDog from "../../assets/images/phonics/dog.png";
import imgPen from "../../assets/images/phonics/pen.png";
import imgHen from "../../assets/images/phonics/hen.png";
import imgPan from "../../assets/images/phonics/pan.png";
import imgSun from "../../assets/images/phonics/sun.png";
import imgRun from "../../assets/images/phonics/run.png";
import imgFan from "../../assets/images/phonics/fan.png";

// --- ตั้งค่าเสียง ---
const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

// ⭐ ลดเสียงผิดลงเหลือ 20% (จะได้ไม่ดังเกินไป)
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function DifferentSoundGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลโจทย์
  const [questions] = useState([
    {
      id: 1,
      title: "Sound 'A'", // (Cat, Bat) -> Dog is odd
      desc: "หาคำที่ออกเสียงต่างจากพวก",
      options: [
        { id: "cat", image: imgCat, word: "Cat", isCorrect: false },
        { id: "bat", image: imgBat, word: "Bat", isCorrect: false },
        { id: "dog", image: imgDog, word: "Dog", isCorrect: true },
      ],
    },
    {
      id: 2,
      title: "Sound 'E'", // (Pen, Hen) -> Pan is odd
      desc: "คำไหนเสียงสระต่างกันนะ?",
      options: [
        { id: "pen", image: imgPen, word: "Pen", isCorrect: false },
        { id: "pan", image: imgPan, word: "Pan", isCorrect: true },
        { id: "hen", image: imgHen, word: "Hen", isCorrect: false },
      ],
    },
    {
      id: 3,
      title: "Sound 'U'", // (Sun, Run) -> Fan is odd
      desc: "ฟังดีๆ คำไหนไม่เข้าพวก?",
      options: [
        { id: "fan", image: imgFan, word: "Fan", isCorrect: true },
        { id: "sun", image: imgSun, word: "Sun", isCorrect: false },
        { id: "run", image: imgRun, word: "Run", isCorrect: false },
      ],
    },
  ]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const currentQuestion = questions[currentQIndex];

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const speakWord = (word) => {
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionId(option.id);

    // speakWord(option.word); // อ่านคำที่กดด้วย

    if (option.isCorrect) {
      playSound(correctSound);
      setScore(score + 1);
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
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQIndex(0);
    setScore(0);
    setShowModal(false);
    setIsAnswered(false);
    setSelectedOptionId(null);
  };

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
      {/* Overlay จางๆ */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-purple-100/20 pointer-events-none"></div>

      {/* --- Header --- */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center z-20 mb-4 relative">
        <button
          onClick={() => navigate("/alphabet")}
          className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-all text-purple-500 font-black text-xl flex items-center gap-2"
        >
          <span>◀</span> Back
        </button>

        {/* Progress Bar */}
        <div className="hidden md:flex flex-col items-center w-1/3">
          <div className="w-full bg-white/50 h-6 rounded-full overflow-hidden border-4 border-white shadow-inner relative">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500 ease-out"
              style={{
                width: `${((currentQIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-purple-600 font-bold mt-1 bg-white/60 px-3 rounded-full text-sm">
            Question {currentQIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Score Badge */}
        <div className="bg-yellow-400 px-6 py-3 rounded-full border-4 border-white shadow-[0_4px_10px_rgba(250,204,21,0.5)] flex items-center gap-2 animate-bounce-slow">
          <span className="text-2xl">⭐</span>
          <span className="text-white font-black text-2xl tracking-widest">
            {score}
          </span>
        </div>
      </div>

      {/* --- Question Area --- */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-6xl px-4 z-10">
        {/* โจทย์ (Bubble Style) */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] px-10 py-6 md:px-20 md:py-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-10 border-4 border-white relative group">
          {/* ไอคอนเพลง */}
          <div className="absolute -top-6 -right-6 bg-purple-400 w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
            <span className="text-2xl">🎵</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-700 text-center">
            Odd One Out:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {currentQuestion.title}
            </span>
          </h2>
          <p className="text-center text-gray-400 mt-2 font-bold text-lg">
            ({currentQuestion.desc})
          </p>
        </div>

        {/* ตัวเลือก 3 รูป */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full">
          {currentQuestion.options.map((option, index) => {
            // Logic เปลี่ยนสีการ์ด
            let cardStyle = "bg-white/80 border-white";
            let effect = "";

            if (isAnswered) {
              if (option.isCorrect) {
                cardStyle =
                  "bg-green-100/90 border-green-400 ring-4 ring-green-200 shadow-[0_0_50px_rgba(74,222,128,0.5)]";
                effect = "scale-105 z-10";
              } else if (selectedOptionId === option.id) {
                cardStyle = "bg-red-100/80 border-red-400 opacity-60"; // ตอบผิด
                effect = "scale-95 grayscale";
              } else {
                cardStyle = "bg-white/50 border-white/50 opacity-40 grayscale"; // ไม่ได้เลือก
                effect = "scale-90";
              }
            } else {
              cardStyle =
                "bg-white/80 border-white hover:border-purple-300 hover:bg-white";
              effect =
                "hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-float";
            }

            return (
              <div
                key={option.id}
                className="relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* การ์ดตัวเลือก */}
                <button
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`
                    relative
                    w-[160px] h-[220px] md:w-[260px] md:h-[320px] 
                    rounded-[2.5rem] border-[8px] shadow-xl backdrop-blur-sm
                    flex flex-col items-center justify-center gap-4 p-4
                    transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                    ${cardStyle} ${effect}
                  `}
                >
                  <img
                    src={option.image}
                    alt={option.word}
                    className="w-24 h-24 md:w-40 md:h-40 object-contain drop-shadow-md"
                  />
                  <span className="text-xl md:text-3xl font-black text-gray-700">
                    {option.word}
                  </span>
                </button>

                {/* ปุ่มฟังเสียงเล็กๆ (ลอยอยู่มุมขวาบนของการ์ด) */}
                {!isAnswered && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(option.word);
                    }}
                    className="absolute -top-2 -right-2 bg-sky-400 text-white w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center hover:scale-110 hover:bg-sky-500 transition-all z-20"
                  >
                    🔊
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Modal จบเกม --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[10px] border-yellow-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden animate-bounce-in">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-100 to-transparent -z-10"></div>

            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-2 drop-shadow-sm">
              Awesome!
            </h2>
            <p className="text-gray-500 font-bold text-lg mb-6">หูดีมากเลย!</p>

            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <span
                    className="text-6xl md:text-8xl animate-star-pop drop-shadow-lg block"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    ⭐
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 mb-8 border-4 border-purple-100 shadow-inner">
              <p className="text-xl text-gray-500 font-bold uppercase tracking-wider">
                Total Score
              </p>
              <p className="text-7xl font-black text-green-500 mt-2 drop-shadow-sm">
                {score}{" "}
                <span className="text-3xl text-gray-400">
                  /{questions.length}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-2xl font-black py-4 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.4)] hover:scale-105 hover:shadow-[0_15px_25px_rgba(34,197,94,0.5)] transition-all active:scale-95"
              >
                🔄 Play Again
              </button>
              <button
                onClick={() => navigate("/alphabet")}
                className="w-full bg-white text-gray-500 text-xl font-black py-4 rounded-full border-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
           animation: bounce-slow 3s infinite ease-in-out;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes bounce-in {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes star-pop {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            70% { transform: scale(1.2) rotate(20deg); }
            100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .animate-star-pop { animation: star-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; }
      `}</style>
    </div>
  );
}

export default DifferentSoundGamePage;
