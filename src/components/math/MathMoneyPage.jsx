import React from 'react';
import { useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// ⭐ Import รูปเงิน (ถ้ายังไม่มีรูป ใช้รูปอะไรแทนไปก่อนก็ได้ครับ หรือคอมเมนต์ออกแล้วใช้สีแทน)
// แนะนำให้หาภาพจริงมาใส่จะสวยมากครับ
const imgCoin1 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/coin_1.png";
const imgCoin2 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/coin_2.png";
const imgCoin5 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/coin_5.png";
const imgCoin10 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/coin_10.png";
const imgNote20 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/note_20.png";
const imgNote50 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/note_50.png";
const imgNote100 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/note_100.png";
const imgNote500 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/note_500.png";
const imgNote1000 = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/math/money/note_1000.png";
const clickSound = new Audio("https://storage.googleapis.com/mtr-system/media-app/public/sounds/click.mp3");

function MathMoneyPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 💰 ข้อมูลเงินไทย (รวมเหรียญและแบงก์ไว้ใน Playlist เดียวกันเลย)
  const moneyLessons = [
    // --- โซนเหรียญ ---
    { id: 1, type: "coin", num: "1", title: "เหรียญ 1 บาท", image: imgCoin1, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/coin_1.mp4", bgColor: "bg-gray-200" },
    { id: 2, type: "coin", num: "2", title: "เหรียญ 2 บาท", image: imgCoin2, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/coin_2.mp4", bgColor: "bg-yellow-100" },
    { id: 3, type: "coin", num: "5", title: "เหรียญ 5 บาท", image: imgCoin5, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/coin_5.mp4", bgColor: "bg-gray-300" },
    { id: 4, type: "coin", num: "10", title: "เหรียญ 10 บาท", image: imgCoin10, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/coin_10.mp4", bgColor: "bg-yellow-600/50" },
    // --- โซนธนบัตร ---
    { id: 5, type: "note", num: "20", title: "แบงก์ 20 บาท", image: imgNote20, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/note_20.mp4", bgColor: "bg-green-500" },
    { id: 6, type: "note", num: "50", title: "แบงก์ 50 บาท", image: imgNote50, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/note_50.mp4", bgColor: "bg-blue-500" },
    { id: 7, type: "note", num: "100", title: "แบงก์ 100 บาท", image: imgNote100, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/note_100.mp4", bgColor: "bg-red-500" },
    { id: 8, type: "note", num: "500", title: "แบงก์ 500 บาท", image: imgNote500, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/note_500.mp4", bgColor: "bg-purple-500" },
    { id: 9, type: "note", num: "1000", title: "แบงก์ 1000 บาท", image: imgNote1000, video: "https://storage.googleapis.com/mtr-system/media-app/public/videos/math/note_1000.mp4", bgColor: "bg-neutral-400" },
  ];

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
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-4 md:pt-10 overflow-y-auto pb-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-blue-400 shadow-[0_4px_0_#60a5fa] mb-8 mt-16 md:mt-0 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-blue-500 tracking-wide">
              💰 ค่าของเงิน (บาทไทย)
            </h1>
        </div>

        {/* ---------------- โซนเหรียญ (Coins) ---------------- */}
        <div className="w-full max-w-6xl mb-8 flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-black text-white drop-shadow-md mb-6 flex items-center gap-2">
                🪙 เงินเหรียญ (Coins)
            </h2>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
                {moneyLessons.filter(m => m.type === 'coin').map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            playClick();
                            navigate('/lesson', { state: { playlist: moneyLessons, initialIndex: moneyLessons.findIndex(x => x.id === item.id) } });
                        }}
                        className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                        {/* วงกลมเหรียญ */}
                        <div className={`
                            w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl
                            flex items-center justify-center overflow-hidden bg-white
                            ${item.bgColor}
                        `}>
                            {/* ถ้ามีรูปใช้รูป ถ้าไม่มีใช้วงกลมสี */}
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" 
                                 onError={(e) => {e.target.style.display='none'}} // ซ่อนรูปถ้าหาไม่เจอแล้วโชว์เลขแทน
                            />
                            {/* Backup ตัวเลข (จะโชว์ถ้าไม่มีรูป) */}
                            <span className="absolute text-3xl font-bold text-gray-700 opacity-50">{item.num}</span>
                        </div>
                        <span className="bg-white/90 px-3 py-0.5 rounded-full text-sm md:text-lg font-bold text-gray-700 shadow-sm">
                            {item.num} บาท
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* ---------------- โซนธนบัตร (Banknotes) ---------------- */}
        <div className="w-full max-w-6xl flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-black text-white drop-shadow-md mb-6 flex items-center gap-2">
                💵 ธนบัตร (Banknotes)
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
                {moneyLessons.filter(m => m.type === 'note').map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            playClick();
                            navigate('/lesson', { state: { playlist: moneyLessons, initialIndex: moneyLessons.findIndex(x => x.id === item.id) } });
                        }}
                        className="group flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300"
                    >
                        {/* กรอบสี่เหลี่ยมแบงก์ */}
                        <div className={`
                            w-32 h-16 md:w-52 md:h-28 rounded-xl border-4 border-white shadow-xl
                            flex items-center justify-center overflow-hidden relative
                            ${item.bgColor}
                        `}>
                             {/* ถ้ามีรูปใช้รูป */}
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" 
                                  onError={(e) => {e.target.style.display='none'}} 
                             />
                             {/* Backup ตัวเลข */}
                             <span className="absolute text-3xl font-black text-white/50">{item.num}</span>
                        </div>
                        <span className="bg-white/90 px-3 py-0.5 rounded-full text-sm md:text-lg font-bold text-gray-700 shadow-sm">
                            {item.num} บาท
                        </span>
                    </button>
                ))}
            </div>
        </div>

      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}

export default MathMoneyPage;