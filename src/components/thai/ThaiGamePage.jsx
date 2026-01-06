import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg.png';

function ThaiGamePage({ globalVolume, isMuted }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%' }}>
      <button onClick={() => navigate('/thai-alphabet')} className="absolute top-4 left-4 bg-white px-6 py-2 rounded-full font-bold shadow-md border-4 border-white text-orange-500">◀ กลับ</button>
      <div className="bg-white/90 p-10 rounded-[2rem] text-center shadow-xl border-4 border-orange-200">
        <h1 className="text-4xl font-black text-orange-500 mb-4">🎮 เกมทาย ก-ฮ</h1>
        <p className="text-gray-500 text-xl">กำลังสร้างจ้า...</p>
      </div>
    </div>
  );
}
export default ThaiGamePage;