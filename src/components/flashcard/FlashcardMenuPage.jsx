import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function FlashcardMenuPage({ isMuted }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const categories = [
    { id: 1, title: "อาหารหลัก 5 หมู่", image: "/images/menu/btn_food.png", type: "food5" },
    { id: 2, title: "สัตว์โลกน่ารัก", image: "/images/menu/btn_animals.png", type: "animals" },
    { id: 3, title: "ยานพาหนะ", image: "/images/menu/btn_vehicles.png", type: "vehicles" },
    { id: 4, title: "ผักและผลไม้", image: "/images/menu/btn_nature.png", type: "veg_fruit" },
    { id: 5, title: "สีและรูปร่าง", image: "/images/menu/btn_shapes.png", type: "shapes_colors" },
    { id: 6, title: "แมลง", image: "/images/menu/btn_insects.png", type: "insects" },
    { id: 7, title: "ดอกไม้", image: "/images/menu/btn_flowers.png", type: "flowers" },
    { id: 8, title: "อาชีพ", image: "/images/menu/btn_jobs.png", type: "jobs" },
  ];

  const subCategoriesData = {
    food5: [
      { title: "หมู่ 1 โปรตีน", type: "food_protein", icon: "🥩" },
      { title: "หมู่ 2 คาร์โบไฮเดรต", type: "food_carbs", icon: "🍚" },
      { title: "หมู่ 3 เกลือแร่ (ผัก)", type: "food_minerals", icon: "🥦" },
      { title: "หมู่ 4 วิตามิน (ผลไม้)", type: "food_vitamins", icon: "🍎" },
      { title: "หมู่ 5 ไขมัน", type: "food_fats", icon: "🧀" },
    ],
    animals: [
      { title: "สัตว์บก", type: "animals_land", icon: "🐘" },
      { title: "สัตว์น้ำ", type: "animals_water", icon: "🐳" },
      { title: "สัตว์ปีก", type: "animals_air", icon: "🦅" },
      { title: "ไดโนเสาร์", type: "animals_prehistoric", icon: "🦕" },
      { title: "ครึ่งบกครึ่งน้ำ", type: "animals_amphibian", icon: "🐸" },
      { title: "เลื้อยคลาน", type: "animals_reptile", icon: "🐍" },
    ],
    vehicles: [
      { title: "ทางบก", type: "vehicles_land", icon: "🚗" },
      { title: "ทางน้ำ", type: "vehicles_water", icon: "🚢" },
      { title: "ทางอากาศ", type: "vehicles_air", icon: "✈️" },
    ],
    veg_fruit: [
      { title: "ผัก", type: "vegetables", icon: "🥦" },
      { title: "ผลไม้", type: "fruits", icon: "🍎" },
    ],
    shapes_colors: [
      { title: "สีสัน", type: "colors", icon: "🎨" },
      { title: "รูปร่าง", type: "shapes", icon: "🔷" },
    ]
  };

  const handleCategoryClick = (cat) => {
    playClick();
    if (subCategoriesData[cat.type]) {
      setSelectedCategory(cat);
    } else {
      navigate('/flashcard/play', { state: { category: cat.type, title: cat.title } });
    }
  };

  const handleSubCategoryClick = (subType, subTitle) => {
    playClick();
    const fullTitle = `${selectedCategory.title} - ${subTitle}`;
    navigate('/flashcard/play', { state: { category: subType, title: fullTitle } });
    setSelectedCategory(null);
  };

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
      {/* ⭐ CSS สำหรับซ่อนสกอร์บาร์แบบเด็ดขาด */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* เนื้อหาหลัก (จัดกึ่งกลางหน้าจอ) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[100rem] px-4">
        
        {/* หัวข้อ (❌ ถอดปุ่มกลับออกแล้ว จัดกึ่งกลางกะทัดรัด) */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm px-10 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-orange-400 shadow-[0_6px_0_#f97316] mb-8 md:mb-12 animate-bounce-slow shrink-0">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-orange-600 tracking-wide">
              🎴 เลือกหมวดคำศัพท์
            </h1>
        </div>

        {/* Grid ปุ่ม 8 หมวด (จัดระเบียบใหม่ให้จบในหน้าเดียว) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-10 w-full max-w-7xl shrink-0 justify-items-center">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
              >
                <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-28 h-28 md:w-40 md:h-40 lg:w-44 lg:h-44 object-contain drop-shadow-xl group-hover:drop-shadow-2xl"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="bg-white p-4 rounded-2xl shadow-lg text-center border-4 border-dashed border-gray-300 w-28 h-28 md:w-40 md:h-40 flex items-center justify-center text-gray-400 font-bold text-xs">รูปภาพ<br/>${cat.title}</div>`;
                    }}
                />
                
                {subCategoriesData[cat.type] && (
                   <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-md animate-pulse z-10">
                      กดเลือกย่อย
                   </div>
                )}
              </button>
            ))}
        </div>
      </div>

      {/* Popup เลือกหมวดย่อย (ปรับให้เนี๊ยบขึ้น) */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-[3rem] p-6 md:p-10 w-full max-w-4xl shadow-2xl border-[10px] border-yellow-400 animate-pop-in relative max-h-[85vh] overflow-hidden flex flex-col">
              
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-all z-20"
              >
                ✕
              </button>

              <h2 className="text-2xl md:text-4xl font-black text-center text-gray-700 mb-6 flex items-center justify-center gap-4 shrink-0">
                 <img src={selectedCategory.image} className="w-14 h-14 object-contain" onError={(e)=>e.target.style.display='none'} />
                 {selectedCategory.title}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 scrollbar-hide">
                 {subCategoriesData[selectedCategory.type].map((sub, index) => (
                    <button
                       key={index}
                       onClick={() => handleSubCategoryClick(sub.type, sub.title)}
                       className="bg-blue-50 hover:bg-blue-100 border-4 border-blue-200 hover:border-blue-400 rounded-2xl p-4 md:p-6 flex flex-col items-center gap-3 transition-all transform hover:scale-105 active:scale-95"
                    >
                       <span className="text-4xl md:text-6xl drop-shadow-sm">{sub.icon}</span>
                       <span className="text-lg md:text-xl font-bold text-blue-800 text-center">{sub.title}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      <style>{` 
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce 3s infinite; } 
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default FlashcardMenuPage;