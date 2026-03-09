import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const imgCrying = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/1.png";
const imgHappy = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/2.png";
const imgBored = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/3.png";
const imgScared = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/4.png";
const imgConfident = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/5.png";
const imgSurprised = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/6.png";
const imgSad = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/7.png";
const imgLovely = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/8.png";
const imgSleepy = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/9.png";
const imgAngry = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/feeling/10.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");
const correctSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/correct.mp3");
const wrongSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/wrong.mp3");

// ปรับระดับเสียง
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function EmotionsGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลอารมณ์
  const allEmotions = [
    { id: "crying", image: imgCrying, word: "Crying", thai: "ร้องไห้" },
    { id: "happy", image: imgHappy, word: "Happy", thai: "มีความสุข" },
    { id: "bored", image: imgBored, word: "Bored", thai: "เบื่อ" },
    { id: "scared", image: imgScared, word: "Scared", thai: "กลัว" },
    { id: "confident", image: imgConfident, word: "Confident", thai: "มั่นใจ" },
    { id: "surprised", image: imgSurprised, word: "Surprised", thai: "ประหลาดใจ" },
    { id: "sad", image: imgSad, word: "Sad", thai: "เศร้า" },
    { id: "lovely", image: imgLovely, word: "Lovely", thai: "น่ารัก" },
    { id: "sleepy", image: imgSleepy, word: "Sleepy", thai: "ง่วงนอน" },
    { id: "angry", image: imgAngry, word: "Angry", thai: "โกรธ" },
  ];

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // สร้างโจทย์สุ่ม
  useEffect(() => {
    const generateQuestions = () => {
      const newQuestions = [];
      for (let i = 0; i < 10; i++) {
        // สุ่มคำตอบที่ถูก
        const target = allEmotions[Math.floor(Math.random() * allEmotions.length)];
        // สุ่มตัวหลอก 2 ตัว (ที่ไม่ซ้ำกับตัวถูก)
        let distractors = allEmotions.filter((e) => e.id !== target.id);
        distractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 2);
        // รวมและสลับตำแหน่ง
        const options = [target, ...distractors].sort(() => 0.5 - Math.random());

        newQuestions.push({
          id: i,
          target: target,
          options: options,
        });
      }
      setQuestions(newQuestions);
    };
    generateQuestions();
  }, []);

  // เล่นเสียงโจทย์ (Text-to-Speech)
  const playWordSound = (word) => {
    if (!isMuted) {
      // ยกเลิกเสียงพูดเก่าก่อนเริ่มใหม่ (กันเสียงตีกัน)
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // เล่นเสียงโจทย์เมื่อเปลี่ยนข้อ (ดีเลย์นิดหน่อยให้ลื่นไหล)
  useEffect(() => {
    if (questions.length > 0 && !showModal && !isAnswered) {
      const timer = setTimeout(() => {
        playWordSound(questions[currentQIndex].target.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQIndex, questions, showModal, isAnswered]);

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return; // ป้องกันกดซ้ำ
    setIsAnswered(true);
    setSelectedOptionId(option.id);

    const currentQ = questions[currentQIndex];

    if (option.id === currentQ.target.id) {
      playSound(correctSound);
      setScore(score + 1);
    } else {
      playSound(wrongSound);
    }

    // รอ 1.5 วิ แล้วไปข้อถัดไป
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setIsAnswered(false);
        setSelectedOptionId(null);
      } else {
        setShowModal(true);
        // เล่นเสียงจบเกม (Optional)
        playSound(correctSound); 
      }
    }, 1500);
  };

  const resetGame = () => {
    window.location.reload();
  };

  if (questions.length === 0)
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold text-white bg-blue-300">
        Loading...
      </div>
    );

  const currentQ = questions[currentQIndex];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-6 select-none overflow-hidden relative font-sans"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* --- Header --- */}
      <div className="w-full max-w-5xl px-4 flex justify-between items-center z-20 mb-6">
        <button
          onClick={() => navigate("/feeling")}
          className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full border-[4px] border-white shadow-md hover:scale-105 transition-all text-pink-500 font-black text-lg flex items-center gap-2"
        >
          ⬅ Back
        </button>

        {/* Score Board */}
        <div className="bg-yellow-400 px-8 py-2 rounded-full border-[4px] border-white shadow-lg flex items-center gap-3 animate-bounce-slow">
          <span className="text-3xl drop-shadow-md">⭐</span>
          <span className="text-white font-black text-3xl tracking-widest drop-shadow-sm">
            {score}
          </span>
        </div>
      </div>

      {/* --- Progress Bar --- */}
      <div className="w-full max-w-xl px-10 mb-4 z-10">
         <div className="flex justify-between text-white font-bold text-sm mb-1 px-2 shadow-sm">
            <span>Question {currentQIndex + 1}</span>
            <span>10</span>
         </div>
         <div className="w-full bg-white/40 h-4 rounded-full overflow-hidden border-2 border-white/60">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(74,222,128,0.8)]"
              style={{ width: `${((currentQIndex + 1) / 10) * 100}%` }}
            ></div>
         </div>
      </div>

      {/* --- Main Game Area --- */}
      <div className="flex-1 flex flex-col items-center w-full max-w-6xl px-4 z-10">
        
        {/* 🔊 โจทย์ (กดฟังเสียงซ้ำได้) */}
        <div
          onClick={() => playWordSound(currentQ.target.word)}
          className="cursor-pointer bg-white/95 backdrop-blur-xl rounded-[2.5rem] px-12 py-6 shadow-xl mb-8 border-[6px] border-white relative group hover:-translate-y-1 transition-transform max-w-2xl w-full text-center"
        >
          {/* ปุ่มลำโพงลอย */}
          <div className="absolute -top-5 -right-5 bg-blue-400 text-white w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md animate-pulse">
            🔊
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-700 mb-1">
            Find:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {currentQ.target.word}
            </span>
          </h2>
          <p className="text-gray-400 text-xl font-bold">
            ({currentQ.target.thai})
          </p>
        </div>

        {/* 🖼️ ตัวเลือก (Grid 3 ช่อง) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {currentQ.options.map((option) => {
            // คำนวณ Style ตามสถานะ (ถูก/ผิด/ปกติ)
            let cardStyle = "bg-white/80 border-white hover:border-pink-200 hover:bg-white";
            let effect = "hover:scale-105 hover:shadow-2xl hover:-translate-y-2";

            if (isAnswered) {
              if (option.id === currentQ.target.id) {
                // ✅ เฉลยตัวที่ถูก (สีเขียว)
                cardStyle = "bg-green-100 border-green-400 ring-4 ring-green-200 shadow-[0_0_40px_rgba(74,222,128,0.6)]";
                effect = "scale-110 z-20";
              } else if (selectedOptionId === option.id) {
                // ❌ ตัวที่กดผิด (สีแดง)
                cardStyle = "bg-red-100 border-red-400 opacity-80";
                effect = "scale-95 grayscale";
              } else {
                // 🌫️ ตัวอื่นๆ (จางลง)
                cardStyle = "bg-white/40 border-white/40 opacity-40 grayscale";
                effect = "scale-90";
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswer(option)}
                className={`
                  cursor-pointer relative
                  aspect-square md:h-[280px] w-full
                  rounded-[2rem] border-[6px] shadow-lg backdrop-blur-sm
                  flex items-center justify-center p-4
                  transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${cardStyle} ${effect}
                `}
              >
                <img
                  src={option.image}
                  alt={option.word}
                  className="max-w-full max-h-full object-contain drop-shadow-md"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Modal Victory --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-300 shadow-2xl relative overflow-hidden animate-bounce-in">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-white to-transparent -z-10"></div>

            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2 drop-shadow-sm">
              Awesome!
            </h2>
            <p className="text-gray-500 font-bold text-lg mb-8">
              เก่งมากๆ เลย!
            </p>

            <div className="bg-gray-50 rounded-3xl p-6 mb-8 border-4 border-gray-100 shadow-inner">
              <p className="text-xl text-gray-400 font-bold uppercase tracking-wider mb-2">
                Your Score
              </p>
              <div className="flex justify-center items-end gap-2">
                 <span className="text-7xl font-black text-green-500 leading-none drop-shadow-sm">{score}</span>
                 <span className="text-3xl font-bold text-gray-400 mb-2">/ 10</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={resetGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-2xl font-black py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                🔄 Play Again
              </button>
              <button
                onClick={() => navigate("/feeling")}
                className="w-full bg-white text-gray-500 text-xl font-black py-4 rounded-full border-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CSS Animations --- */}
      <style>{`
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounceIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default EmotionsGamePage;