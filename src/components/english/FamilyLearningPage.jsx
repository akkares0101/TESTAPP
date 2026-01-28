import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

// ⭐ Import รูปสมาชิกครอบครัว (เตรียมรูปให้พร้อมนะครับ)
// แนะนำให้ใช้รูปการ์ตูนน่ารักๆ
import imgFather from '../../assets/images/family/father.png';
import imgMother from '../../assets/images/family/mother.png';
import imgBrother from '../../assets/images/family/brother.png';
import imgSister from '../../assets/images/family/sister.png';
import imgGrandpa from '../../assets/images/family/grandpa.png';
import imgGrandma from '../../assets/images/family/grandma.png';

const clickSound = new Audio('/sounds/click.mp3');

function FamilyLearningPage({ isMuted }) {
  const navigate = useNavigate();

  // ข้อมูลคำศัพท์
  const familyMembers = [
    { id: 1, word: "Father", thai: "คุณพ่อ", image: imgFather, color: "bg-blue-100 border-blue-400" },
    { id: 2, word: "Mother", thai: "คุณแม่", image: imgMother, color: "bg-pink-100 border-pink-400" },
    { id: 3, word: "Brother", thai: "พี่ชาย/น้องชาย", image: imgBrother, color: "bg-green-100 border-green-400" },
    { id: 4, word: "Sister", thai: "พี่สาว/น้องสาว", image: imgSister, color: "bg-yellow-100 border-yellow-400" },
    { id: 5, word: "Grandfather", thai: "คุณปู่/คุณตา", image: imgGrandpa, color: "bg-gray-100 border-gray-400" },
    { id: 6, word: "Grandmother", thai: "คุณย่า/คุณยาย", image: imgGrandma, color: "bg-purple-100 border-purple-400" },
  ];

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // ฟังก์ชันอ่านออกเสียง (Text-to-Speech)
  const speakWord = (text) => {
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // สำเนียงอังกฤษ
      utterance.rate = 0.8; // พูดช้าลงนิดนึงให้ฟังชัด
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = (item) => {
    playClick();
    speakWord(item.word); // กดแล้วอ่านเสียงทันที
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center py-6 select-none"
      style={{ 
       backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4 py-8">
        
        {/* Grid การ์ดคำศัพท์ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full justify-items-center">
            {familyMembers.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`
                   group relative cursor-pointer
                   w-[160px] h-[220px] md:w-[280px] md:h-[340px]
                   rounded-[2.5rem] border-[8px] shadow-xl
                   flex flex-col items-center justify-between p-4
                   transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
                   ${item.color}
                `}
              >
                {/* ไอคอนลำโพง (บอกว่ากดฟังเสียงได้) */}
                <div className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    🔊
                </div>

                {/* รูปภาพ (ขยายใหญ่ตอน Hover) */}
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.word} 
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" 
                    />
                </div>

                {/* กล่องข้อความ */}
                <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl text-center w-full shadow-sm mt-4 border-2 border-white/50">
                    <h2 className="text-xl md:text-3xl font-black text-gray-800">{item.word}</h2>
                    <p className="text-sm md:text-lg text-gray-500 font-bold">{item.thai}</p>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default FamilyLearningPage;