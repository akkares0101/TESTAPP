import React from 'react';

// Import รูปปุ่ม (ตรวจสอบ Path ให้ถูกต้องกับเครื่องคุณ)
import btnABC from '../assets/images/buttons/btn_abc.png';
import btnFamily from '../assets/images/buttons/btn_family.png';
import btnSound from '../assets/images/buttons/btn_sound.png';
import btnFeeling from '../assets/images/buttons/btn_feeling.png';
import btnColors from '../assets/images/buttons/btn_colors.png';
import btnDays from '../assets/images/buttons/btn_days.png';
import btnactivity from '../assets/images/buttons/btn_months.png'; 

function EnglishHub({ navigate, playClick }) {

  const menuItems = [
    { id: 1, image: btnABC, path: "/alphabet", title: "Alphabet" },
    { id: 2, image: btnFamily, path: "/eng-letters", title: "Family" },
    { id: 3, image: btnSound, path: "/sound", title: "Phonics" },
    { id: 4, image: btnFeeling, path: "/feeling", title: "Feelings" },
    { id: 5, image: btnColors, path: "/colors", title: "Colors" },
    { id: 6, image: btnDays, path: "/days", title: "Days" },
    { id: 7, image: btnactivity, path: "/activity", title: "Daily activity" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[40vh] py-6">
      
      {/* Container จัดกึ่งกลาง */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 p-4">
        
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => {
              playClick();
              if (item.path) navigate(item.path);
            }}
            className="
              group relative cursor-pointer
              flex items-center justify-center
              
              /* ขนาดปุ่ม: ปรับให้พอดี สวยงาม */
              w-[140px] md:w-[180px] lg:w-[200px]
              
              /* Animation: เด้งดึ๋งนุ่มนวล */
              transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
              hover:scale-110 hover:-rotate-2
              active:scale-95 active:rotate-0
            "
          >
            {/* รูปภาพปุ่ม + เงา */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="
                w-full h-auto 
                object-contain
                drop-shadow-lg 
                group-hover:drop-shadow-2xl 
                transition-all duration-300
              "
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default EnglishHub;