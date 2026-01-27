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

  // แปลงข้อมูลสำหรับ Playlist
  const playlistItems = lessons.map(item => ({
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
      {/* 1. ปุ่มย้อนกลับ */}
      <div className="absolute top-8 left-4 z-50 md:top-16 md:left-10">
         <button 
          onClick={() => navigate('/phonics')} 
          className="
             group flex items-center gap-3 bg-white text-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border-4 border-white hover:border-purple-200 hover:scale-105 active:scale-95 transition-all
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="font-black text-lg md:text-xl">กลับเมนู</span>
        </button>
      </div>

      {/* 2. เนื้อหาหลัก */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-24 md:pt-20 overflow-y-auto pb-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-8 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-purple-600 tracking-wide">
              📖 ฝึกอ่านประโยค (Reading)
            </h1>
        </div>

        {/* 3. Grid ประโยค */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 max-w-7xl w-full">
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
                  flex flex-col items-center justify-center p-4
                  w-full md:w-[45%] lg:w-[30%] h-[120px] md:h-[160px]
                  rounded-3xl
                  bg-white border-l-[10px] ${item.color.replace('bg-', 'border-')}
                  shadow-md hover:shadow-xl
                  transition-all duration-200
                  hover:scale-105 hover:-translate-x-2
                  text-left
                `}
              >
                {/* ประโยคภาษาอังกฤษ */}
                <div className="w-full text-center">
                    <span className={`text-2xl md:text-4xl font-black ${item.color.replace('bg-', 'text-')} drop-shadow-sm`}>
                    {item.sentence}
                    </span>
                </div>
                
                {/* คำแปลภาษาไทย */}
                <div className="mt-2 w-full text-center">
                    <span className="text-lg md:text-xl font-bold text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
                        {item.th}
                    </span>
                </div>

                {/* เลขข้อ */}
                <div className={`absolute top-2 right-2 w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-sm`}>
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