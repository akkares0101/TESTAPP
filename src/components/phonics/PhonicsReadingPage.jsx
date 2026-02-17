import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsReadingPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 📖 ข้อมูลประโยคฝึกอ่าน (Simple Sentences)
  const lessons = [
    { id: 1, sentence: "I see a cat.", th: "ฉันเห็นแมวหนึ่งตัว", color: "bg-red-500", video: "/videos/phonics/read_1.mp4" },
    { id: 2, sentence: "The dog is big.", th: "หมาตัวนั้นใหญ่", color: "bg-blue-500", video: "/videos/phonics/read_2.mp4" },
    { id: 3, sentence: "It is a red pen.", th: "มันคือปากกาสีแดง", color: "bg-green-500", video: "/videos/phonics/read_3.mp4" },
    { id: 4, sentence: "I like to run.", th: "ฉันชอบวิ่ง", color: "bg-yellow-500", video: "/videos/phonics/read_4.mp4" },
    { id: 5, sentence: "She has a hat.", th: "เธอมีหมวกใบหนึ่ง", color: "bg-pink-500", video: "/videos/phonics/read_5.mp4" },
    { id: 6, sentence: "He is my dad.", th: "เขาคือพ่อของฉัน", color: "bg-purple-500", video: "/videos/phonics/read_6.mp4" },
    { id: 7, sentence: "The sun is hot.", th: "พระอาทิตย์ร้อน", color: "bg-orange-500", video: "/videos/phonics/read_7.mp4" },
    { id: 8, sentence: "I can jump.", th: "ฉันกระโดดได้", color: "bg-teal-500", video: "/videos/phonics/read_8.mp4" },
  ];

  // แปลงข้อมูลสำหรับ Playlist (✅ แก้เพิ่ม index ตรงนี้ให้แล้วครับ)
  const playlistItems = lessons.map((item, index) => ({
    ...item,
    num: index + 1,      // โชว์เลขข้อ
    title: `ฝึกอ่าน: ${item.sentence}`
  }));

  return (
    <div 
      className="h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-16 md:pt-14 overflow-y-auto pb-10">
        
        {/* หัวข้อ (เล็กลง) */}
        <div className="relative z-10 bg-white px-6 py-1.5 md:px-10 md:py-2 rounded-full border-[3px] md:border-[5px] border-purple-500 shadow-[0_3px_0_#a855f7] mb-6 animate-bounce-slow text-center scale-90 md:scale-100">
            <h1 className="text-2xl md:text-4xl font-black text-purple-600 tracking-wide">
              📖 ฝึกอ่านประโยค (Reading)
            </h1>
        </div>

        {/* 3. Grid ประโยค (เล็กลง) */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 max-w-7xl w-full">
            {playlistItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: playlistItems, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center p-2 md:p-3
                  /* ⭐ ปรับลดขนาดความสูงตรงนี้ ⭐ */
                  w-full md:w-[45%] lg:w-[30%] h-[90px] md:h-[120px]
                  rounded-[1.5rem] md:rounded-3xl
                  bg-white border-l-[6px] md:border-l-[8px] ${item.color.replace('bg-', 'border-')}
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                  hover:scale-105 hover:-translate-x-1
                  text-left
                `}
              >
                {/* ประโยคภาษาอังกฤษ (เล็กลง) */}
                <div className="w-full text-center mt-1 md:mt-0">
                    <span className={`text-xl md:text-3xl font-black ${item.color.replace('bg-', 'text-')} drop-shadow-sm`}>
                    {item.sentence}
                    </span>
                </div>
                
                {/* คำแปลภาษาไทย (เล็กลง) */}
                <div className="mt-1 md:mt-2 w-full text-center">
                    <span className="text-sm md:text-lg font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">
                        {item.th}
                    </span>
                </div>

                {/* เลขข้อ (เล็กลง) */}
                <div className={`absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-xs md:text-sm`}>
                    {index + 1}
                </div>
              </button>
            ))}
        </div>

      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default PhonicsReadingPage;