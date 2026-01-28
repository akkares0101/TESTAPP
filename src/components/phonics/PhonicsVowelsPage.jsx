import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

const clickSound = new Audio('/sounds/click.mp3');

function PhonicsVowelsPage({ isMuted }) {
  const navigate = useNavigate();

  const playClick = () => {
    if (!isMuted) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  // 🔤 ข้อมูลสระ 5 ตัว (A, E, I, O, U)
  const lessons = [
    { 
      id: 1, 
      num: "A", 
      title: "สระ A (แอะ / เอ)", 
      desc: "Short: แอะ (Ant) / Long: เอ (Cake)",
      color: "bg-red-500", 
      border: "border-red-700",
      video: "/videos/phonics/vowel_a.mp4" 
    },
    { 
      id: 2, 
      num: "E", 
      title: "สระ E (เอะ / อี)", 
      desc: "Short: เอะ (Egg) / Long: อี (Bee)",
      color: "bg-yellow-400", 
      border: "border-yellow-600",
      video: "/videos/phonics/vowel_e.mp4" 
    },
    { 
      id: 3, 
      num: "I", 
      title: "สระ I (อิ / ไอ)", 
      desc: "Short: อิ (Igloo) / Long: ไอ (Ice)",
      color: "bg-green-500", 
      border: "border-green-700",
      video: "/videos/phonics/vowel_i.mp4" 
    },
    { 
      id: 4, 
      num: "O", 
      title: "สระ O (เอาะ / โอ)", 
      desc: "Short: เอาะ (Ox) / Long: โอ (Bone)",
      color: "bg-blue-500", 
      border: "border-blue-700",
      video: "/videos/phonics/vowel_o.mp4" 
    },
    { 
      id: 5, 
      num: "U", 
      title: "สระ U (อะ / อู)", 
      desc: "Short: อะ (Up) / Long: อู (Cube)",
      color: "bg-purple-500", 
      border: "border-purple-700",
      video: "/videos/phonics/vowel_u.mp4" 
    },
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
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[100rem] px-4 pt-24 md:pt-20 overflow-y-auto pb-10">
        
        {/* หัวข้อ */}
        <div className="relative z-10 bg-white px-8 py-2 md:px-12 md:py-3 rounded-full border-[4px] md:border-[6px] border-purple-500 shadow-[0_4px_0_#a855f7] mb-10 animate-bounce-slow text-center">
            <h1 className="text-3xl md:text-5xl font-black text-purple-600 tracking-wide">
              🅰️ สระภาษาอังกฤษ (Vowels)
            </h1>
        </div>

        {/* 3. Grid สระ 5 ตัว */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-7xl">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  navigate('/lesson', { 
                    state: { 
                        playlist: lessons, 
                        initialIndex: index 
                    } 
                  });
                }}
                className={`
                  group relative
                  flex flex-col items-center justify-center
                  /* ปุ่มใหญ่พิเศษ */
                  w-[140px] h-[140px] md:w-[220px] md:h-[220px]
                  rounded-full /* เป็นวงกลม */
                  ${item.color} ${item.border} border-[8px]
                  shadow-[0_10px_20px_rgba(0,0,0,0.2)]
                  transition-all duration-300
                  hover:scale-110 hover:-rotate-3 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]
                  active:scale-95 active:translate-y-2
                `}
              >
                {/* ตัวอักษร */}
                <span className="text-6xl md:text-9xl font-black text-white drop-shadow-lg mb-2">
                  {item.num}
                </span>
                
                {/* คำอธิบายสั้นๆ (เช่น แอะ/เอ) */}
                <div className="absolute -bottom-4 bg-white px-4 py-1 rounded-full shadow-md border-2 border-gray-100 min-w-[100px]">
                    <span className={`text-sm md:text-lg font-bold ${item.color.replace('bg-', 'text-')}`}>
                         {item.title.split('(')[1].replace(')', '')}
                    </span>
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

export default PhonicsVowelsPage;