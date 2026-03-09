import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const imgRun = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/movement/run.png";
const imgJump = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/movement/jump.png";
const imgWalk = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/movement/walk.png";
const imgSpin = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/movement/spin.png";
const imgClap = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/movement/clap.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");
const correctSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/correct.mp3");
const wrongSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/wrong.mp3");

// ปรับเสียง
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.3;

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

  // ระยะดูดแม่เหล็ก (pixels) - ยิ่งเยอะยิ่งลากง่าย
  const SNAP_DISTANCE = 80;

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

  // --- Start Dragging ---
  const handleStart = (item, e) => {
    if (matchedIds.includes(item.id)) return;
    
    // ป้องกันการ Scroll ขณะลากบนมือถือ
    // e.preventDefault(); (ใช้ touch-action: none ใน css แทนดีกว่า)
    
    playSound(clickSound);

    const rect = imgRefs.current[item.id].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // หาจุดกึ่งกลางของปุ่มเริ่ม
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

  // --- Moving ---
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

  // --- End Dragging (Logic "Magnetic Snap" อยู่ตรงนี้) ---
  const handleEnd = (e) => {
    if (!currentLine) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // หาตำแหน่งเมาส์/นิ้ว ตอนปล่อย
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const mouseX = clientX - containerRect.left;
    const mouseY = clientY - containerRect.top;

    let matched = false;

    // วนลูปเช็คว่าใกล้เป้าหมายไหนบ้าง
    for (const wordItem of shuffledWords) {
      // ข้ามอันที่ถูกจับคู่ไปแล้ว
      if (matchedIds.includes(wordItem.id)) continue;

      const targetEl = wordRefs.current[wordItem.id];
      if (!targetEl) continue;

      const rect = targetEl.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2 - containerRect.left;
      const targetY = rect.top + rect.height / 2 - containerRect.top;

      // คำนวณระยะห่าง (Pythagoras)
      const distance = Math.sqrt(
        Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2)
      );

      // ✅ ถ้าอยู่ในระยะดูดแม่เหล็ก (SNAP_DISTANCE)
      if (distance < SNAP_DISTANCE) {
        if (currentLine.startId === wordItem.id) {
          // ถูกต้อง!
          playSound(correctSound);
          setLines([
            ...lines,
            { ...currentLine, endX: targetX, endY: targetY },
          ]);
          setMatchedIds([...matchedIds, wordItem.id]);
          setScore((prev) => prev + 1);
          matched = true;
        } else {
          // ผิดคู่
          playSound(wrongSound);
        }
        break; // เจอเป้าหมายแล้ว หยุดวนลูป
      }
    }

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
      className="min-h-screen w-full flex flex-col items-center py-4 md:py-6 select-none overflow-hidden touch-none" // touch-none คือคีย์สำคัญห้าม scroll
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      // Event Listener ติดไว้ที่ Container ใหญ่สุด เพื่อให้จับการลากได้ทั่วจอ
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
    >
      {/* --- POPUP Victory --- */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center border-[8px] border-yellow-400 shadow-2xl relative overflow-hidden animate-bounce-in">
            <h2 className="text-4xl md:text-6xl font-black text-orange-500 mb-2">Excellent! 🎉</h2>
            <p className="text-gray-500 font-bold text-xl mb-6">จับคู่เก่งมาก!</p>
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map((i) => (
                <span key={i} className="text-6xl animate-star-pop" style={{ animationDelay: `${i * 0.2}s` }}>⭐</span>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={resetGame} className="bg-green-500 text-white text-2xl font-black py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
                🔄 เล่นอีกครั้ง
              </button>
              <button onClick={() => navigate("/feeling")} className="bg-gray-200 text-gray-600 text-xl font-bold py-3 rounded-full hover:bg-gray-300">
                กลับหน้าเมนู
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Header --- */}
      <div className="w-full max-w-[90rem] px-4 flex justify-between items-center z-40 mb-2">
        <button onClick={() => navigate("/feeling")} className="bg-white/90 px-4 py-2 rounded-full border-4 border-white shadow-md text-orange-500 font-black text-lg hover:scale-105 transition-transform">
          ⬅ Back
        </button>
        <div className="bg-yellow-400 px-6 py-2 rounded-full border-4 border-white shadow-md">
          <span className="text-2xl font-black text-white tracking-widest">{score}/{items.length}</span>
        </div>
        <button onClick={resetGame} className="bg-sky-400 px-4 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-lg hover:scale-105 transition-transform">
          Reset
        </button>
      </div>

      {/* --- Game Area --- */}
      <div className="relative w-full max-w-[95rem] px-2 flex-1 flex flex-col justify-center" ref={containerRef}>
        
        {/* SVG Layer (อยู่ล่างสุด) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: "visible", filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))" }}>
          {lines.map((line, i) => (
            <line key={i} x1={line.startX} y1={line.startY} x2={line.endX} y2={line.endY} stroke={line.color} strokeWidth="12" strokeLinecap="round" />
          ))}
          {currentLine && (
            <line x1={currentLine.startX} y1={currentLine.startY} x2={currentLine.endX} y2={currentLine.endY} stroke={currentLine.color} strokeWidth="12" strokeLinecap="round" strokeDasharray="15,15" className="opacity-80" />
          )}
        </svg>

        <div className="relative z-30 flex flex-col justify-between min-h-[60vh] py-4">
          
          {/* แถวบน: รูปภาพ (ต้นทาง) */}
          <div className="flex justify-around items-end">
            {items.map((item, index) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div key={item.id} className="flex flex-col items-center relative w-1/5">
                  <div className={`transition-all duration-300 ${isMatched ? "scale-90 opacity-60 grayscale" : "hover:scale-110 animate-float"}`} style={{ animationDelay: `${index * 0.5}s` }}>
                    <img src={item.image} alt={item.word} className="w-24 h-24 md:w-48 md:h-48 object-contain drop-shadow-lg" />
                  </div>
                  
                  {/* จุดเชื่อมต่อ (ต้นทาง) - ขยาย Hit Area ให้กดง่าย */}
                  <div
                    ref={(el) => (imgRefs.current[item.id] = el)}
                    onMouseDown={(e) => { e.stopPropagation(); handleStart(item, e); }}
                    onTouchStart={(e) => { e.stopPropagation(); handleStart(item, e); }}
                    style={{ backgroundColor: item.color }}
                    className={`
                      w-10 h-10 md:w-14 md:h-14 rounded-full border-[5px] border-white shadow-lg cursor-pointer -mt-2 z-40 transition-all 
                      flex items-center justify-center relative
                      ${isMatched ? "scale-90 ring-4 ring-green-300" : "hover:scale-125 hover:ring-8 ring-white/50 active:scale-90"}
                    `}
                  >
                    {/* Invisible Hit Area (พื้นที่กดที่ใหญ่กว่าปุ่มจริง) */}
                    <div className="absolute -inset-6 rounded-full bg-transparent z-50"></div>
                    <div className="w-3 h-3 md:w-5 md:h-5 bg-white rounded-full pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* แถวล่าง: คำศัพท์ (ปลายทาง) */}
          <div className="flex justify-around items-start mt-12 md:mt-24">
            {shuffledWords.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              return (
                <div key={item.id} className="flex flex-col-reverse items-center w-1/5">
                  <div className={`
                      mt-3 px-2 py-2 md:px-6 md:py-4 bg-white rounded-[1.5rem] border-4 w-full text-center shadow-lg transition-all
                      ${isMatched ? "border-green-500 bg-green-100 text-green-600 scale-95" : "border-white text-gray-700"}
                    `}
                  >
                    <span className="text-lg md:text-3xl font-black">{item.word}</span>
                  </div>

                  {/* จุดเชื่อมต่อ (ปลายทาง) */}
                  <div
                    ref={(el) => (wordRefs.current[item.id] = el)}
                    className={`
                      w-10 h-10 md:w-14 md:h-14 rounded-full border-[5px] border-white shadow-lg -mb-4 z-40 transition-all flex items-center justify-center bg-gray-200 relative
                      ${isMatched ? "!bg-green-500 scale-90 ring-4 ring-green-300" : ""}
                    `}
                  >
                     {/* วงแหวนเรืองแสงเมื่อลากมาใกล้ (Visual Feedback) */}
                     {currentLine && !isMatched && (
                        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-gray-300 animate-spin-slow opacity-50 pointer-events-none"></div>
                     )}
                    <div className="w-3 h-3 md:w-5 md:h-5 bg-white rounded-full pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .touch-none { touch-action: none; } /* สำคัญมาก: ป้องกันจอเลื่อนเวลาลาก */
      `}</style>
    </div>
  );
}

export default MovementMatchingPage;