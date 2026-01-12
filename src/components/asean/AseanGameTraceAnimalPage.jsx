import React, { useRef, useEffect } from "react";

function AseanGameTraceAnimalPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // สั่งให้ Focus ที่ iframe ทันทีที่เข้ามาหน้านี้
    // เพื่อให้กดคีย์บอร์ดหรือคลิกในเกมได้เลยโดยไม่ต้องกดที่จอก่อน
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, []);

  return (
    // Container: เต็มหน้าจอ, ตัดส่วนเกิน, พื้นหลังสีดำ
    <div className="w-screen h-screen overflow-hidden bg-black m-0 p-0 fixed inset-0 z-50">
      <iframe
        ref={iframeRef}
        title="Asean Godot Game"
        // ⭐ Path ของไฟล์เกม (Public เริ่มนับที่ /)
        // ถ้าไฟล์ชื่อ index.html อยู่ในโฟลเดอร์ Testgameasean
        src="/game/asean-trace/index.html"
        // หมายเหตุ: ถ้าไฟล์ html ของคุณชื่ออื่น (เช่น Testgameasean.html)
        // ให้แก้เป็น src="/game/Testgameasean/Testgameasean.html"

        className="w-full h-full border-none block"
        allowFullScreen
      />
    </div>
  );
}

export default AseanGameTraceAnimalPage;
