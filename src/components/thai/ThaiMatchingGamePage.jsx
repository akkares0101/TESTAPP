import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// Import รูปภาพ (ใช้ชุดเดิม)
import imgKhai from '../../assets/images/thai/kai.png';      // ก.ไก่
import imgKhai2 from '../../assets/images/thai/khai.png';    // ข.ไข่
import imgKhuad from '../../assets/images/thai/khuad.png';   // ฃ.ขวด
import imgKwai from '../../assets/images/thai/kwai.png';     // ค.ควาย
import imgKhon from '../../assets/images/thai/khon.png';     // ฅ.คน

const clickSound = new Audio('/sounds/click.mp3');
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');

// ปรับเสียง
clickSound.volume = 0.5;
correctSound.volume = 0.5;
wrongSound.volume = 0.2;

function ThaiMatchingGamePage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลจับคู่ (ซ้าย=ตัวอักษร, ขวา=รูปภาพ)
  const [items] = useState([
    { id: 'k', text: 'ก', image: imgKhai, color: '#EF4444' },     // แดง
    { id: 'kh', text: 'ข', image: imgKhai2, color: '#EAB308' },   // เหลือง
    { id: 'kh2', text: 'ฃ', image: imgKhuad, color: '#EC4899' },  // ชมพู
    { id: 'kw', text: 'ค', image: imgKwai, color: '#22C55E' },    // เขียว
    { id: 'kh3', text: 'ฅ', image: imgKhon, color: '#3B82F6' },   // ฟ้า
  ]);

  const [rightSideItems, setRightSideItems] = useState([]);
  const [lines, setLines] = useState([]); 
  const [currentLine, setCurrentLine] = useState(null); 
  const [matchedIds, setMatchedIds] = useState([]); 
  const [score, setScore] = useState(0);

  const containerRef = useRef(null); 
  const leftRefs = useRef({});
  const rightRefs = useRef({});

  useEffect(() => {
    // สลับฝั่งขวา (รูปภาพ)
    setRightSideItems([...items].sort(() => Math.random() - 0.5));
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
    
    // คำนวณตำแหน่งจุดเริ่มต้น
    const rect = leftRefs.current[item.id].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    setCurrentLine({
      startId: item.id,
      startX: rect.right - containerRect.left, // เริ่มจากขอบขวาของปุ่มซ้าย
      startY: rect.top + rect.height / 2 - containerRect.top,
      endX: rect.right - containerRect.left,
      endY: rect.top + rect.height / 2 - containerRect.top,
      color: item.color
    });
  };

  const handleMove = (e) => {
    if (!currentLine) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setCurrentLine({ ...currentLine, endX: clientX - containerRect.left, endY: clientY - containerRect.top });
  };

  const handleEnd = (targetItem) => {
    if (!currentLine) return;
    
    // ตรวจสอบว่าจับคู่ถูกไหม
    if (currentLine.startId === targetItem.id) {
      playSound(correctSound);
      const rect = rightRefs.current[targetItem.id].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setLines([...lines, { 
        ...currentLine, 
        endX: rect.left - containerRect.left, // จบที่ขอบซ้ายของปุ่มขวา
        endY: rect.top + rect.height / 2 - containerRect.top 
      }]);
      
      setMatchedIds([...matchedIds, targetItem.id]);
      setScore(prev => prev + 1);
    } else {
      playSound(wrongSound);
    }
    setCurrentLine(null);
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-4 select-none overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
      onMouseMove={handleMove} onTouchMove={handleMove} onMouseUp={() => setCurrentLine(null)} onTouchEnd={() => setCurrentLine(null)}
    >
      {/* Header */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center z-20 mb-4">
        <button onClick={() => navigate('/thai/game')} className="bg-white px-4 py-2 rounded-full border-4 border-white shadow-md font-black text-orange-500 hover:scale-105 transition-transform">◀ ย้อนกลับ</button>
        <div className="bg-orange-400 px-8 py-2 rounded-full border-4 border-white shadow-lg"><h1 className="text-2xl md:text-3xl font-black text-white">โยงเส้นจับคู่ ✏️</h1></div>
        <div className="bg-green-500 px-6 py-2 rounded-full border-4 border-white shadow-md text-white font-black text-xl">คะแนน: {score}/{items.length}</div>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-5xl px-4 flex-1 flex items-center justify-center" ref={containerRef}>
        
        {/* SVG สำหรับวาดเส้น */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ overflow: 'visible' }}>
          {lines.map((line, i) => <line key={i} x1={line.startX} y1={line.startY} x2={line.endX} y2={line.endY} stroke={line.color} strokeWidth="8" strokeLinecap="round" />)}
          {currentLine && <line x1={currentLine.startX} y1={currentLine.startY} x2={currentLine.endX} y2={currentLine.endY} stroke={currentLine.color} strokeWidth="8" strokeLinecap="round" strokeDasharray="10,10" />}
        </svg>

        <div className="flex justify-between w-full h-full items-center z-20 gap-10 md:gap-32">
          
          {/* ซ้าย: ตัวอักษร */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1 items-end">
            {items.map(item => (
              <div 
                key={item.id} 
                ref={el => leftRefs.current[item.id] = el}
                onMouseDown={(e) => { e.stopPropagation(); handleStart(item, e); }}
                onTouchStart={(e) => { e.stopPropagation(); handleStart(item, e); }}
                className={`
                  relative cursor-pointer w-[80px] h-[80px] md:w-[120px] md:h-[120px] 
                  bg-white rounded-[1.5rem] border-[6px] shadow-lg flex items-center justify-center
                  transition-transform hover:scale-105 active:scale-95
                  ${matchedIds.includes(item.id) ? 'border-gray-300 opacity-50' : 'border-orange-200'}
                `}
              >
                 <h2 className="text-4xl md:text-6xl font-black text-gray-700">{item.text}</h2>
                 {/* จุดเชื่อมต่อด้านขวา */}
                 <div className="absolute -right-3 w-4 h-4 md:w-6 md:h-6 bg-orange-400 rounded-full border-2 border-white"></div>
              </div>
            ))}
          </div>

          {/* ขวา: รูปภาพ */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1 items-start">
            {rightSideItems.map(item => (
              <div 
                key={item.id} 
                ref={el => rightRefs.current[item.id] = el}
                onMouseUp={(e) => { e.stopPropagation(); handleEnd(item); }}
                onTouchEnd={(e) => { e.stopPropagation(); handleEnd(item); }}
                className={`
                  relative cursor-pointer w-[80px] h-[80px] md:w-[120px] md:h-[120px] 
                  bg-white rounded-[1.5rem] border-[6px] shadow-lg flex items-center justify-center p-2
                  transition-transform hover:scale-105
                  ${matchedIds.includes(item.id) ? 'border-green-400 opacity-50' : 'border-blue-200'}
                `}
              >
                 <img src={item.image} alt="thai-img" className="w-full h-full object-contain" />
                 {/* จุดเชื่อมต่อด้านซ้าย */}
                 <div className="absolute -left-3 w-4 h-4 md:w-6 md:h-6 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Victory Modal */}
      {score === items.length && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="bg-white rounded-[3rem] p-10 text-center border-[8px] border-yellow-400 animate-bounce-in">
              <h2 className="text-5xl font-black text-orange-500 mb-4">เก่งมาก! 🎉</h2>
              <div className="flex flex-col gap-3 mt-6">
                 <button onClick={resetGame} className="bg-green-500 text-white text-2xl font-black py-3 px-8 rounded-full shadow-lg hover:scale-105">🔄 เล่นอีกครั้ง</button>
                 <button onClick={() => navigate('/thai/game')} className="bg-white text-orange-500 text-xl font-black py-3 rounded-full border-4 border-orange-200">เลือกเกมอื่น</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default ThaiMatchingGamePage;