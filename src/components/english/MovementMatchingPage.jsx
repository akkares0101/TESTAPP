import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.png";

// Import รูปภาพ
import imgRun from "../../assets/images/movement/run.png";
import imgJump from "../../assets/images/movement/jump.png";
import imgWalk from "../../assets/images/movement/walk.png";
import imgSpin from "../../assets/images/movement/spin.png";
import imgClap from "../../assets/images/movement/clap.png";

const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
//const wrongSound = new Audio('/sounds/wrong.mp3'); // (ถ้ามีเสียงผิด)

function MovementMatchingPage({ isMuted }) {
  const navigate = useNavigate();

  const [items] = useState([
    { id: "run", word: "Run", image: imgRun, color: "#FF5733" },
    { id: "jump", word: "Jump", image: imgJump, color: "#FFC300" },
    { id: "walk", word: "Walk", image: imgWalk, color: "#3498DB" },
    { id: "spin", word: "Spin", image: imgSpin, color: "#9B59B6" },
    { id: "clap", word: "Clap", image: imgClap, color: "#2ECC71" },
  ]);

  const [shuffledWords, setShuffledWords] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);

  const containerRef = useRef(null);
  const imgRefs = useRef({});
  const wordRefs = useRef({});

  // ตรวจสอบว่าจบเกมหรือยัง
  const isGameOver = matchedIds.length === items.length;

  useEffect(() => {
    setShuffledWords([...items].sort(() => Math.random() - 0.5));
  }, [items]);

  const playSound = (sound) => {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const handleStart = (item, e) => {
    if (matchedIds.includes(item.id)) return;
    playSound(clickSound);

    const rect = imgRefs.current[item.id].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const startX = rect.left + rect.width / 2 - containerRect.left;
    const startY = rect.top + rect.height / 2 - containerRect.top;

    setCurrentLine({
      startId: item.id,
      startX,
      startY,
      endX: startX,
      endY: startY,
      color: item.color,
    });
  };

  const handleMove = (e) => {
    if (!currentLine) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setCurrentLine({
      ...currentLine,
      endX: clientX - containerRect.left,
      endY: clientY - containerRect.top,
    });
  };

  const handleEnd = (targetItem) => {
    if (!currentLine) return;

    if (currentLine.startId === targetItem.id) {
      playSound(correctSound);
      const rect = wordRefs.current[targetItem.id].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const endX = rect.left + rect.width / 2 - containerRect.left;
      const endY = rect.top + rect.height / 2 - containerRect.top;

      setLines([...lines, { ...currentLine, endX, endY }]);
      setMatchedIds([...matchedIds, targetItem.id]);
      setScore((prev) => prev + 1);
    } else {
      if (wrongSound) playSound(wrongSound); // เล่นเสียงผิดถ้ามี
    }
    setCurrentLine(null);
  };

  const handleCancel = () => {
    setCurrentLine(null);
  };

  const resetGame = () => {
    setLines([]);
    setMatchedIds([]);
    setScore(0);
    setShuffledWords([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-4 md:py-6 select-none overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleCancel}
      onTouchEnd={handleCancel}
    >
      {/* --- ⭐ POPUP สรุปคะแนน (Victory Modal) ⭐ --- */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden animate-bounce-in">
            {/* ตกแต่งพื้นหลัง Modal */}
            <div className="absolute top-0 left-0 w-full h-6 bg-yellow-300"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50"></div>
            <div className="absolute top-10 -left-10 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>

            {/* ข้อความแสดงความยินดี */}
            <h2 className="text-4xl md:text-6xl font-black text-orange-500 mb-2 drop-shadow-md relative z-10">
              Excellent! 🎉
            </h2>
            <p className="text-gray-500 font-bold text-xl mb-6 relative z-10">
              เก่งมากเลย!
            </p>

            {/* ดาวดึ๋งๆ */}
            <div className="flex justify-center gap-2 mb-8 relative z-10">
              {[1, 2, 3].map((star, i) => (
                <span
                  key={i}
                  className="text-6xl md:text-8xl drop-shadow-lg animate-star-pop"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {/* คะแนนรวม */}
            <div className="bg-orange-50 rounded-2xl p-4 mb-8 border-2 border-orange-100 relative z-10">
              <p className="text-2xl text-gray-600 font-bold">คะแนนของคุณ</p>
              <p className="text-5xl font-black text-green-500 mt-2">
                {score} / {items.length}
              </p>
            </div>

            {/* ปุ่มควบคุม */}
            <div className="flex flex-col gap-4 relative z-10">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white text-xl md:text-2xl font-black py-4 rounded-full shadow-lg hover:scale-105 transition-transform border-b-4 border-green-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2"
              >
                <span>🔄</span> เล่นอีกครั้ง
              </button>
              <button
                onClick={() => navigate("/feeling")}
                className="bg-white text-orange-500 text-xl md:text-2xl font-black py-4 rounded-full shadow-md hover:bg-orange-50 transition-colors border-4 border-orange-200"
              >
                กลับหน้าเมนู
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Header (ใช้ SVG แทน Emoji) --- */}
      <div className="w-full max-w-[90rem] px-4 flex justify-between items-center z-40 mb-4 md:mb-8">
        {/* ปุ่ม Back */}
        <button
          onClick={() => navigate("/feeling")}
          className="bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all flex items-center gap-2 text-orange-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="font-black text-lg md:text-2xl">Back</span>
        </button>

        {/* Score Board */}
        <div className="bg-yellow-400 px-6 py-2 md:px-10 md:py-4 rounded-full border-4 border-white shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center gap-3 animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-md"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-3xl md:text-5xl font-black text-white drop-shadow-md tracking-widest">
            {score}/{items.length}
          </span>
        </div>

        {/* ปุ่ม Reset */}
        <button
          onClick={resetGame}
          className="bg-sky-400 px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all flex items-center gap-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span className="font-black text-lg md:text-2xl">Reset</span>
        </button>
      </div>

      {/* --- Main Game Area --- */}
      <div
        className="relative w-full max-w-[95rem] px-2 md:px-8 flex-1 flex flex-col justify-center"
        ref={containerRef}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[3rem]"></div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{
            overflow: "visible",
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
          }}
        >
          {lines.map((line, i) => (
            <g key={i}>
              <line
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <line
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke={line.color}
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>
          ))}
          {currentLine && (
            <line
              x1={currentLine.startX}
              y1={currentLine.startY}
              x2={currentLine.endX}
              y2={currentLine.endY}
              stroke={currentLine.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="20,20"
              className="opacity-90 animate-pulse"
            />
          )}
        </svg>

        <div className="relative z-30 flex flex-col justify-between min-h-[60vh] md:min-h-[70vh] py-4">
          {/* Top Row: Images */}
          <div className="flex justify-around items-end">
            {items.map((item, index) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center group relative w-1/5"
                >
                  <div
                    className={`relative transition-all duration-500 ease-in-out flex items-center justify-center p-2
                      ${
                        isMatched
                          ? "scale-90 grayscale-[0.5] opacity-70"
                          : "hover:scale-110"
                      }
                    `}
                    style={{
                      animation: isMatched
                        ? "none"
                        : `float 4s ease-in-out infinite ${index * 0.8}s`,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.word}
                      className="w-32 h-32 md:w-64 md:h-64 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  <div
                    ref={(el) => (imgRefs.current[item.id] = el)}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleStart(item, e);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleStart(item, e);
                    }}
                    style={{ backgroundColor: item.color }}
                    className={`
                      w-12 h-12 md:w-16 md:h-16 rounded-full border-[6px] border-white shadow-[0_8px_15px_rgba(0,0,0,0.3)] cursor-pointer -mt-4 z-40 transition-all duration-300 flex items-center justify-center
                      ${
                        isMatched
                          ? "scale-90 ring-4 ring-green-300/50"
                          : "hover:scale-125 hover:ring-8 ring-white/50 animate-pulse-slow"
                      }
                    `}
                  >
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: Words */}
          <div className="flex justify-around items-start mt-10 md:mt-20">
            {shuffledWords.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col-reverse items-center group w-1/5 px-1"
                >
                  <div
                    className={`
                      mt-4 px-3 py-3 md:px-6 md:py-5 bg-white rounded-[2rem] border-4 transition-all duration-300 text-center w-full shadow-xl
                      ${
                        isMatched
                          ? "border-green-500 bg-green-100 text-green-600 scale-95"
                          : "border-white hover:border-orange-300 hover:scale-105 hover:shadow-2xl"
                      }
                    `}
                    onClick={() => !isMatched && alert(item.word)}
                  >
                    <span className="text-xl md:text-4xl font-black tracking-wider">
                      {item.word}
                    </span>
                  </div>

                  <div
                    ref={(el) => (wordRefs.current[item.id] = el)}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      handleEnd(item);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      handleEnd(item);
                    }}
                    className={`
                      w-12 h-12 md:w-16 md:h-16 rounded-full border-[6px] border-white shadow-[0_8px_15px_rgba(0,0,0,0.3)] cursor-pointer -mb-6 z-40 transition-all duration-300 flex items-center justify-center bg-gray-200
                      ${
                        isMatched
                          ? "!bg-green-500 scale-90 ring-4 ring-green-300/50"
                          : "hover:scale-125 hover:bg-orange-300 hover:ring-8 ring-white/50"
                      }
                    `}
                  >
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes bounce-in {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
        }
        @keyframes star-pop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5) rotate(20deg); }
            100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-star-pop { animation: star-pop 0.6s ease-out backwards; }
      `}</style>
    </div>
  );
}

export default MovementMatchingPage;
