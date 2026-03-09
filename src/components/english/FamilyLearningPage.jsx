import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";
const imgFather = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/father.png";
const imgMother = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/mother.png";
const imgSon = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/son.png";
const imgDaughter = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/daughter.png";
const imgBrother = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/brother.png";
const imgSister = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/sister.png";
const imgGrandpa = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/grandpa.png";
const imgGrandma = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/grandma.png";
const imgUncle = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/uncle.png";
const imgAunt = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/family/aunt.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function FamilyLearningPage({ isMuted, onVideoStateChange }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 📂 ข้อมูลสมาชิก
  const familyMembers = [
    { id: 1, word: "Father", thai: "พ่อ", image: imgFather, color: "bg-blue-100 border-blue-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/father.mp4" },
    { id: 2, word: "Mother", thai: "แม่", image: imgMother, color: "bg-pink-100 border-pink-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/mother.mp4" },
    { id: 3, word: "Son", thai: "ลูกชาย", image: imgSon, color: "bg-cyan-100 border-cyan-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/son.mp4" },
    { id: 4, word: "Daughter", thai: "ลูกสาว", image: imgDaughter, color: "bg-rose-100 border-rose-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/daughter.mp4" },
    { id: 5, word: "Brother", thai: "พี่ชาย / น้องชาย", image: imgBrother, color: "bg-green-100 border-green-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/brother.mp4" },
    { id: 6, word: "Sister", thai: "พี่สาว / น้องสาว", image: imgSister, color: "bg-yellow-100 border-yellow-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/sister.mp4" },
    { id: 7, word: "Grandfather", thai: "ปู่ / ตา", image: imgGrandpa, color: "bg-gray-100 border-gray-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/grandpa.mp4" },
    { id: 8, word: "Grandmother", thai: "ย่า / ยาย", image: imgGrandma, color: "bg-purple-100 border-purple-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/grandma.mp4" },
    { id: 9, word: "Uncle", thai: "ลุง / น้า / อา", image: imgUncle, color: "bg-indigo-100 border-indigo-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/uncle.mp4" },
    { id: 10, word: "Aunt", thai: "ป้า / น้า / อา", image: imgAunt, color: "bg-orange-100 border-orange-400", video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/family/aunt.mp4" },
  ];

  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);

  // ตัดเสียง BGM
  useEffect(() => {
    if (onVideoStateChange) {
      onVideoStateChange(true);
    }
    return () => {
      if (onVideoStateChange) {
        onVideoStateChange(false);
      }
    };
  }, [onVideoStateChange]);

  // เล่นวิดีโอใหม่เมื่อเปลี่ยนคน
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Auto-play prevented:", e));
      }
    }
  }, [selectedMember]);

  const handleCardClick = (member) => {
    if (!isMuted) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
    setSelectedMember(member);
  };

  return (
    <div 
      className="h-screen w-full flex flex-col items-center overflow-hidden font-sans"
      style={{ 
       backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* --- Header --- */}
      <div className="pt-4 pb-2 z-10 shrink-0">
         <div className="bg-white/90 backdrop-blur-sm px-8 py-2 rounded-full border-[4px] border-orange-300 shadow-md transform hover:scale-105 transition-transform">
            <h1 className="text-2xl md:text-3xl font-black text-orange-600 tracking-wide flex items-center gap-2">
               🏡 My Family: <span className="text-gray-800">{selectedMember.word}</span>
            </h1>
         </div>
      </div>

      {/* --- Main Content (Video Player) --- */}
      <div className="flex-1 w-full max-w-5xl px-4 flex flex-col items-center justify-center min-h-0 pb-2">
        <div className={`
            w-full h-full max-h-[55vh] md:max-h-[60vh] aspect-video bg-black rounded-[2rem] 
            border-[8px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.4)] 
            overflow-hidden relative
        `}>
            <video 
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted={isMuted}
                poster={selectedMember.image}
            >
                <source src={selectedMember.video} type="video/mp4" />
            </video>
        </div>
        
        {/* คำแปลภาษาไทย */}
        <div className="mt-3 bg-white/90 px-6 py-1.5 rounded-xl shadow-sm border-2 border-white/50">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">{selectedMember.thai}</h2>
        </div>
      </div>

      {/* --- Bottom Bar: Member Selection (เล็กลง) --- */}
      <div className="w-full h-auto py-3 z-20 shrink-0 bg-white/30 backdrop-blur-md rounded-t-[2.5rem] border-t border-white/40">
        <div className="flex justify-center">
            <div className="flex justify-start md:justify-center gap-3 overflow-x-auto px-6 pb-2 pt-2 no-scrollbar snap-x snap-mandatory w-full max-w-6xl">
                {familyMembers.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className={`
                           snap-center shrink-0
                           group relative
                           /* ✅ ปรับขนาดตรงนี้ให้เล็กลงครับ */
                           w-16 h-20 md:w-20 md:h-26
                           rounded-2xl border-[3px] shadow-md
                           flex flex-col items-center justify-center p-1
                           transition-all duration-300
                           ${selectedMember.id === item.id 
                                ? 'bg-white border-orange-400 scale-110 -translate-y-2 ring-4 ring-orange-200 z-10' 
                                : `${item.color} hover:scale-105 hover:-translate-y-1 opacity-90 hover:opacity-100`
                           }
                        `}
                    >
                        <img 
                            src={item.image} 
                            alt={item.word}
                            className="w-full h-full object-contain drop-shadow-sm"
                        />
                        
                        {/* ป้ายชื่อเล็กๆ */}
                        <div className={`
                            absolute -bottom-3 px-1.5 py-0.5 rounded-md text-[9px] font-bold shadow-sm whitespace-nowrap
                            ${selectedMember.id === item.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}
                        `}>
                            {item.word}
                        </div>
                    </button>
                ))}
            </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default FamilyLearningPage;