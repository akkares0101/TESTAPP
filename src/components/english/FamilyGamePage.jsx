import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/gamefambg.png";

// ⭐ Import รูปภาพ (ใช้ชุดเดียวกับหน้าเรียนรู้)
import imgFather from "../../assets/images/family/father.png";
import imgMother from "../../assets/images/family/mother.png";
import imgSister from "../../assets/images/family/sister.png";
import imgGrandpa from "../../assets/images/family/grandpa.png";
import imgGrandma from "../../assets/images/family/grandma.png";

// Import เสียง
const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

// ปรับระดับเสียง
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function FamilyGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลคู่ศัพท์ (ซ้าย-ขวา)
  const [items] = useState([
    {
      id: "father",
      word: "Father",
      thai: "คุณพ่อ",
      image: imgFather,
      color: "#3B82F6",
    }, // เส้นสีฟ้า
    {
      id: "mother",
      word: "Mother",
      thai: "คุณแม่",
      image: imgMother,
      color: "#EC4899",
    }, // เส้นสีชมพู
    {
      id: "sister",
      word: "Sister",
      thai: "พี่สาว/น้องสาว",
      image: imgSister,
      color: "#F59E0B",
    }, // เส้นสีส้ม
    {
      id: "grandpa",
      word: "Grandfather",
      thai: "ปู่ / ตา",
      image: imgGrandpa,
      color: "#10B981",
    }, // เส้นสีเขียว
    {
      id: "grandma",
      word: "Grandmother",
      thai: "ย่า / ยาย",
      image: imgGrandma,
      color: "#8B5CF6",
    }, // เส้นสีม่วง
  ]);

  // สลับลำดับฝั่งขวา (คำศัพท์) ให้ไม่ตรงกับรูป
  const [rightSideItems, setRightSideItems] = useState([]);

  useEffect(() => {
    setRightSideItems([...items].sort(() => Math.random() - 0.5));
  }, [items]);

  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);

  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});

  // เล่นเสียง
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

  // เริ่มลากจากฝั่งซ้าย (รูปภาพ)
  const handleStart = (item, e) => {
    if (matchedIds.includes(item.id)) return;
    playSound(clickSound);

    const rect = leftRefs.current[item.id].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // จุดเริ่มอยู่ที่ดาวฝั่งซ้าย
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

  // ปล่อยที่ฝั่งขวา (คำศัพท์)
  const handleEnd = (targetItem) => {
    if (!currentLine) return;

    if (currentLine.startId === targetItem.id) {
      // ✅ ถูกต้อง
      playSound(correctSound);
      speakWord(targetItem.word); // อ่านคำศัพท์เมื่อจับคู่ถูก

      const rect = rightRefs.current[targetItem.id].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // จุดจบอยู่ที่ดาวฝั่งขวา
      const endX = rect.left + rect.width / 2 - containerRect.left;
      const endY = rect.top + rect.height / 2 - containerRect.top;

      setLines([...lines, { ...currentLine, endX, endY }]);
      setMatchedIds([...matchedIds, targetItem.id]);
      setScore((prev) => prev + 1);
    } else {
      // ❌ ผิด
      playSound(wrongSound);
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
    setRightSideItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-4 select-none overflow-hidden"
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
      {/* --- Header --- */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center z-20 mb-6">
        <button
          onClick={() => navigate("/family")}
          className="bg-white px-4 py-2 rounded-full border-4 border-white shadow-md hover:scale-105 transition-all text-orange-500 font-black text-xl flex items-center gap-2"
        >
          <span></span> Back
        </button>

        <div className="bg-yellow-400 px-8 py-3 rounded-full border-4 border-white shadow-lg animate-bounce-slow">
          <h1 className="text-3xl font-black text-white tracking-wide drop-shadow-md">
            Family Matching 
          </h1>
        </div>

        <div className="bg-green-500 px-6 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-xl">
          Score: {score}/{items.length}
        </div>
      </div>

      {/* --- Game Area --- */}
      <div
        className="relative w-full max-w-5xl px-4 flex-1 flex items-center justify-center"
        ref={containerRef}
      >
        {/* SVG Layer สำหรับเส้น (อยู่ด้านหลังปุ่ม) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{
            overflow: "visible",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
          }}
        >
          {lines.map((line, i) => (
            <g key={i}>
              {/* เส้นขอบสีขาว */}
              <line
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* เส้นสีจริง */}
              <line
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke={line.color}
                strokeWidth="8"
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
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="15,10"
              className="opacity-80"
            />
          )}
        </svg>

        <div className="flex justify-between w-full h-full items-center z-20">
          {/* --- ฝั่งซ้าย: รูปภาพ (Images) --- */}
          <div className="flex flex-col gap-6 md:gap-8">
            {items.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div key={item.id} className="relative flex items-center">
                  {/* รูปภาพวงกลม */}
                  <div
                    className={`
                      w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border-4 shadow-lg p-2 flex items-center justify-center transition-all
                      ${
                        isMatched
                          ? "border-green-400 grayscale opacity-70"
                          : "border-white hover:scale-110"
                      }
                  `}
                  >
                    <img
                      src={item.image}
                      alt={item.word}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  {/* ดาว ⭐ (จุดเชื่อมต่อ) */}
                  <div
                    ref={(el) => (leftRefs.current[item.id] = el)}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleStart(item, e);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleStart(item, e);
                    }}
                    className={`
                      absolute -right-6 md:-right-8 w-10 h-10 md:w-12 md:h-12 
                      cursor-pointer transition-transform hover:scale-125
                      flex items-center justify-center text-3xl md:text-4xl drop-shadow-md
                      ${isMatched ? "opacity-50" : "animate-pulse"}
                    `}
                  >
                    ⭐
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- ฝั่งขวา: คำศัพท์ (Words) --- */}
          <div className="flex flex-col gap-6 md:gap-8">
            {rightSideItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="relative flex items-center justify-end"
                >
                  {/* ดาว ⭐ (จุดรับเส้น) */}
                  <div
                    ref={(el) => (rightRefs.current[item.id] = el)}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      handleEnd(item);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      handleEnd(item);
                    }}
                    className={`
                      absolute -left-6 md:-left-8 w-10 h-10 md:w-12 md:h-12
                      cursor-pointer transition-transform hover:scale-125
                      flex items-center justify-center text-3xl md:text-4xl drop-shadow-md
                      ${isMatched ? "opacity-50" : "animate-bounce-slow"}
                    `}
                  >
                    ⭐
                  </div>

                  {/* ป้ายคำศัพท์ (สีเหลืองตามแบบ) */}
                  <div
                    onClick={() => !isMatched && speakWord(item.word)}
                    className={`
                      w-40 md:w-64 py-3 md:py-4 bg-yellow-400 rounded-full border-4 border-white shadow-lg text-center transition-all cursor-pointer
                      ${
                        isMatched
                          ? "bg-green-400 scale-95 opacity-80"
                          : "hover:bg-yellow-300 hover:scale-105"
                      }
                    `}
                  >
                    <h2 className="text-xl md:text-2xl font-black text-gray-800">
                      {item.word}
                    </h2>
                    <p className="text-sm md:text-lg text-white font-bold drop-shadow-sm">
                      {item.thai}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Victory Modal --- */}
      {score === items.length && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-2xl animate-bounce-in">
            <h2 className="text-5xl font-black text-orange-500 mb-4">
              Well Done! 🎉
            </h2>
            <div className="flex justify-center gap-2 mb-6 text-6xl">
              ⭐ ⭐ ⭐
            </div>
            <p className="text-2xl text-gray-600 font-bold mb-8">
              จับคู่ครบทุกข้อแล้ว!
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white text-xl font-black py-3 rounded-full shadow-lg hover:scale-105"
              >
                🔄 เล่นอีกครั้ง
              </button>
              <button
                onClick={() => navigate("/family")}
                className="bg-white text-orange-500 text-xl font-black py-3 rounded-full border-4 border-orange-200"
              >
                กลับเมนูหลัก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .animate-bounce-slow { animation: bounce 2s infinite; }
        @keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default FamilyGamePage;
