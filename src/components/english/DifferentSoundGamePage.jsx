import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปภาพ (ตัวอย่าง: ชุดสัตว์)
// คุณต้องเตรียมรูปให้ตรงกับโจทย์นะครับ (เช่น Cat, Bat, Rat, Dog, Pig, etc.)
import imgCat from '../../assets/images/phonics/cat.png';
import imgBat from '../../assets/images/phonics/bat.png';
import imgDog from '../../assets/images/phonics/dog.png'; // ตัวต่าง (สระ O)
import imgPen from '../../assets/images/phonics/pen.png';
import imgHen from '../../assets/images/phonics/hen.png';
import imgPan from '../../assets/images/phonics/pan.png'; // ตัวต่าง (สระ A)
import imgSun from '../../assets/images/phonics/sun.png';
import imgRun from '../../assets/images/phonics/run.png';
import imgFan from '../../assets/images/phonics/fan.png'; // ตัวต่าง (สระ A)

// Import เสียง (ถ้ามี)
const clickSound = new Audio('/sounds/click.mp3');
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');

function DifferentSoundGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ⭐ ข้อมูลโจทย์ (ชุดละ 3 ตัวเลือก)
  // ให้เลือกตัวที่ "เสียงต่างจากพวก" (isCorrect: true)
  const [questions] = useState([
    {
      id: 1,
      title: "Find the Odd One Out (Sound 'A')",
      options: [
        { id: 'cat', image: imgCat, word: 'Cat', isCorrect: false },
        { id: 'bat', image: imgBat, word: 'Bat', isCorrect: false },
        { id: 'dog', image: imgDog, word: 'Dog', isCorrect: true }, // Dog เสียงต่าง (O)
      ]
    },
    {
      id: 2,
      title: "Find the Odd One Out (Sound 'E')",
      options: [
        { id: 'pen', image: imgPen, word: 'Pen', isCorrect: false },
        { id: 'pan', image: imgPan, word: 'Pan', isCorrect: true }, // Pan เสียงต่าง (A)
        { id: 'hen', image: imgHen, word: 'Hen', isCorrect: false },
      ]
    },
    {
      id: 3,
      title: "Find the Odd One Out (Sound 'U')",
      options: [
        { id: 'fan', image: imgFan, word: 'Fan', isCorrect: true }, // Fan เสียงต่าง (A)
        { id: 'sun', image: imgSun, word: 'Sun', isCorrect: false },
        { id: 'run', image: imgRun, word: 'Run', isCorrect: false },
      ]
    },
  ]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // กันกดซ้ำ
  const [selectedOptionId, setSelectedOptionId] = useState(null); // ไว้แสดงผลตอนเลือก

  const currentQuestion = questions[currentQIndex];

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  // ฟังเสียงคำศัพท์ (จำลอง)
  const speakWord = (word) => {
    if (!isMuted) {
      // ใช้ Web Speech API อ่านออกเสียงภาษาอังกฤษ
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // พูดช้าลงนิดนึง
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      playSound(correctSound);
      setScore(score + 1);
    } else {
      playSound(wrongSound);
    }

    // รอ 1.5 วินาที แล้วไปข้อต่อไป
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setIsAnswered(false);
        setSelectedOptionId(null);
      } else {
        setShowModal(true); // จบเกม
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
      className="min-h-screen w-full flex flex-col items-center py-6"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      
      {/* --- Header --- */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center z-10 mb-8">
        <button 
          onClick={() => navigate('/alphabet')} // หรือหน้ารวมเกมที่ต้องการ
          className="bg-white px-6 py-2 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all text-orange-500 font-black text-xl flex items-center gap-2"
        >
           <span>◀</span> Back
        </button>

        <div className="bg-white/90 px-8 py-3 rounded-full border-4 border-purple-400 shadow-lg">
           <h1 className="text-3xl font-black text-purple-500 tracking-wide">
             Odd One Out 🎵
           </h1>
        </div>

        <div className="bg-yellow-400 px-6 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-xl">
           Score: {score}/{questions.length}
        </div>
      </div>

      {/* --- Question Area --- */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl px-4">
        
        {/* โจทย์ */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-10 border-b-8 border-gray-200 text-center w-full md:w-2/3 animate-bounce-slow">
           <h2 className="text-2xl md:text-3xl font-black text-gray-600">
             {currentQuestion.title}
           </h2>
           <p className="text-gray-400 mt-2 text-lg">เลือกภาพที่มีเสียงแตกต่างจากเพื่อน</p>
        </div>

        {/* ตัวเลือก 3 รูป */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
          {currentQuestion.options.map((option) => {
            
            // ตรวจสอบสถานะเพื่อเปลี่ยนสีปุ่ม
            let cardClass = "bg-white border-white"; // ปกติ
            if (isAnswered) {
                if (option.isCorrect) {
                    cardClass = "bg-green-100 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.6)] scale-110"; // เฉลยถูก
                } else if (selectedOptionId === option.id) {
                    cardClass = "bg-red-100 border-red-400 opacity-60"; // ตอบผิด
                } else {
                    cardClass = "bg-gray-100 border-gray-200 opacity-50"; // ไม่ได้เลือก
                }
            } else {
                cardClass = "bg-white border-white hover:border-purple-300 hover:scale-110 hover:shadow-2xl"; // สถานะรอเลือก
            }

            return (
              <div key={option.id} className="relative group">
                {/* การ์ดตัวเลือก */}
                <button
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`
                    w-[200px] h-[260px] md:w-[280px] md:h-[340px] 
                    rounded-[3rem] border-[8px] shadow-xl transition-all duration-300
                    flex flex-col items-center justify-center gap-4 p-4
                    ${cardClass}
                  `}
                >
                  <img src={option.image} alt={option.word} className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-md" />
                  <span className="text-2xl md:text-4xl font-black text-gray-700">{option.word}</span>
                </button>

                {/* ปุ่มฟังเสียง (แยกออกมาให้กดฟังก่อนได้) */}
                <button
                   onClick={(e) => { e.stopPropagation(); speakWord(option.word); }}
                   className="absolute -top-4 -right-4 bg-sky-400 text-white w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white shadow-md flex items-center justify-center hover:scale-110 hover:bg-sky-500 transition-all z-10"
                >
                   🔊
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- Modal จบเกม (เหมือน Movement Matching) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-2xl relative overflow-hidden animate-bounce-in">
              <div className="absolute top-0 left-0 w-full h-6 bg-yellow-300"></div>
              <h2 className="text-5xl font-black text-purple-500 mb-4 drop-shadow-sm">Good Job! 🎧</h2>
              
              <div className="flex justify-center gap-2 mb-6">
                 {[1, 2, 3].map((i) => (
                    <span key={i} className="text-7xl animate-star-pop" style={{animationDelay: `${i*0.2}s`}}>⭐</span>
                 ))}
              </div>

              <div className="bg-purple-50 rounded-2xl p-4 mb-8 border-2 border-purple-100">
                <p className="text-xl text-gray-600 font-bold">Total Score</p>
                <p className="text-6xl font-black text-green-500 mt-2">{score} / {questions.length}</p>
              </div>

              <div className="flex flex-col gap-3">
                 <button onClick={resetGame} className="bg-green-500 text-white text-2xl font-black py-3 rounded-full shadow-lg hover:scale-105 border-b-4 border-green-700 active:border-b-0 active:translate-y-1">
                   🔄 Play Again
                 </button>
                 <button onClick={() => navigate('/alphabet')} className="bg-white text-orange-500 text-xl font-black py-3 rounded-full border-4 border-orange-200 hover:bg-orange-50">
                   Back to Menu
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes star-pop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.5) rotate(20deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        .animate-star-pop { animation: star-pop 0.6s ease-out backwards; }
      `}</style>
    </div>
  );
}

export default DifferentSoundGamePage;