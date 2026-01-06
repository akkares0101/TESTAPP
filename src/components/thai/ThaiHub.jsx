import React from 'react';

// Import รูปปุ่มไทย
import btnThai1 from '../../assets/images/thai.png';    
import btnThai2 from '../../assets/images/eng.png';     
import btnThai3 from '../../assets/images/math.png';    
import btnThai4 from '../../assets/images/sci.png';     
import btnThai5 from '../../assets/images/cont.png';    
import btnThai6 from '../../assets/images/draw.png';    

function ThaiHub({ navigate, playClick }) {
  
  // ข้อมูลเมนูไทย 6 ปุ่ม
  const menuItems = [
    { id: 1, image: btnThai1, path: "/thai-alphabet/learn", title: "ก-ฮ" },
    { id: 2, image: btnThai2, path: "/thai-vowels", title: "สระ" },
    { id: 3, image: btnThai3, path: "/thai-tones", title: "วรรณยุกต์" },
    { id: 4, image: btnThai4, path: "/thai-spelling", title: "ตัวสะกด" },
    { id: 5, image: btnThai5, path: "/thai-numbers", title: "เลขไทย" },
    { id: 6, image: btnThai6, path: "/thai-reading", title: "ฝึกอ่าน" },
  ];

  // ⭐ แยกชุดข้อมูล: แถวบน 4 ปุ่ม / แถวล่าง 2 ปุ่ม
  const topRow = menuItems.slice(0, 4);    // ปุ่มที่ 1-4
  const bottomRow = menuItems.slice(4, 6); // ปุ่มที่ 5-6

  // ฟังก์ชันสร้างปุ่ม (ใช้สไตล์เดียวกับ EnglishHub เป๊ะ)
  const renderButton = (item) => (
    <div 
      key={item.id}
      onClick={() => {
        playClick();
        if (item.path) navigate(item.path);
      }}
      className="
        group relative cursor-pointer
        flex items-center justify-center
        
        /* ขนาดปุ่ม: เท่ากับหน้าภาษาอังกฤษ */
        w-[140px] md:w-[190px] lg:w-[210px]

        /* Animation: เด้งดึ๋ง */
        transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        hover:scale-110 hover:-rotate-2
        active:scale-95 active:rotate-0
      "
    >
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
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] py-8">
      
      {/* Container หลัก */}
      <div className="flex flex-col items-center gap-6 md:gap-10 w-full px-4">
        
        {/* แถวบน: 4 ปุ่ม */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {topRow.map(renderButton)}
        </div>

        {/* แถวล่าง: 2 ปุ่ม (จัดกึ่งกลางอัตโนมัติ) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {bottomRow.map(renderButton)}
        </div>

      </div>
    </div>
  );
}

export default ThaiHub;