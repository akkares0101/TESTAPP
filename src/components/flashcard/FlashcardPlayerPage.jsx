import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const bgImage = "https://storage.googleapis.com/mtr-system/media-app/src/assets/images/bg.png";

// --------------------------------------------------------
// 1. ข้อมูลการจัดกลุ่ม (คงเดิม)
// --------------------------------------------------------
const categoryGroups = {
  food: [
    { id: 'food_protein', label: '🥩 โปรตีน' },
    { id: 'food_carbs', label: '🍚 คาร์บ' },
    { id: 'food_minerals', label: '🥦 เกลือแร่' },
    { id: 'food_vitamins', label: '🍎 วิตามิน' },
    { id: 'food_fats', label: '🧀 ไขมัน' },
  ],
  animals: [
    { id: 'animals_land', label: '🐘 สัตว์บก' },
    { id: 'animals_water', label: '🐳 สัตว์น้ำ' },
    { id: 'animals_air', label: '🦅 สัตว์ปีก' },
    { id: 'animals_prehistoric', label: '🦕 ไดโนเสาร์' },
    { id: 'animals_amphibian', label: '🐸 ครึ่งบกครึ่งน้ำ' },
    { id: 'animals_reptile', label: '🐍 เลื้อยคลาน' },
  ],
  vehicles: [
    { id: 'vehicles_land', label: '🚗 ทางบก' },
    { id: 'vehicles_water', label: '🚢 ทางน้ำ' },
    { id: 'vehicles_air', label: '✈️ ทางอากาศ' },
  ],
  nature: [
    { id: 'vegetables', label: '🥦 ผัก' },
    { id: 'fruits', label: '🍎 ผลไม้' },
  ],
  basics: [
    { id: 'colors', label: '🎨 สีสัน' },
    { id: 'shapes', label: '🔷 รูปร่าง' },
  ],

};

const findGroupKey = (catId) => {
  for (const group in categoryGroups) {
    if (categoryGroups[group].find(c => c.id === catId)) {
      return group;
    }
  }
  return 'others';
};

// --------------------------------------------------------
// 2. ข้อมูลบัตรคำ (คงเดิม)
// --------------------------------------------------------
const flashcardData = {
  jobs: [
    { word: "Firefighter", thai: "นักดับเพลิง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/2.png" },
    { word: "Teacher", thai: "คุณครู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/3.png" },
    { word: "Soldier", thai: "ทหาร", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/4.png" },
    { word: "Chef", thai: "แม่ครัว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/5.png" },
    { word: "Astronaut", thai: "นักบินอวกาศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/6.png" },
    { word: "Judge", thai: "ผู้พิพากษา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/7.png" },
    { word: "Nurse", thai: "พยาบาล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/8.png" },
    { word: "Farmer", thai: "ชาวนา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/9.png" },
    { word: "Policeman", thai: "ตำรวจ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/10.png" },
    { word: "Doctor", thai: "หมอ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/job/11.png" },
  ],
  flowers: [
    { word: "Rose", thai: "ดอกกุหลาบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/2.png" },
    { word: "Tulip", thai: "ดอกทิวลิป", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/3.png" },
    { word: "Marigold", thai: "ดอกดาวเรือง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/4.png" },
    { word: "Lily", thai: "ดอกลิลลี่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/5.png" },
    { word: "Sunflower", thai: "ดอกทานตะวัน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/6.png" },
    { word: "Jasmine", thai: "ดอกมะลิ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/7.png" },
    { word: "Hydrangea", thai: "ดอกไฮเดรนเยีย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/8.png" },
    { word: "Orchid", thai: "ดอกกล้วยไม้", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/9.png" },
    { word: "Hibiscus", thai: "ดอกชบา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/10.png" },
    { word: "Frangipani", thai: "ดอกลีลาวดี", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/flowers/11.png" },
  ],
  insects: [
    { word: "Grasshopper", thai: "ตั๊กแตน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/13.png" },
    { word: "Mosquito", thai: "ยุง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/14.png" },
    { word: "Ladybug", thai: "เต่าทอง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/15.png" },
    { word: "Ant", thai: "มด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/16.png" },
    { word: "Beetle", thai: "ด้วง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/17.png" },
    { word: "Dragonfly", thai: "แมลงปอ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/18.png" },
    { word: "Bee", thai: "ผึ้ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/19.png" },
    { word: "Butterfly", thai: "ผีเสื้อ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/20.png" },
    { word: "Fly", thai: "แมลงวัน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/21.png" },
    { word: "Cockroach", thai: "แมลงสาบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/bug/22.png" },
  ],
  colors: [
    { word: "Red", thai: "สีแดง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/3.png" },
    { word: "Blue", thai: "สีน้ำเงิน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/4.png" },
    { word: "Yellow", thai: "สีเหลือง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/5.png" },
    { word: "Green", thai: "สีเขียว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/6.png" },
    { word: "Orange", thai: "สีส้ม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/7.png" },
    { word: "Purple", thai: "สีม่วง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/8.png" },
    { word: "Pink", thai: "สีชมพู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/9.png" },
    { word: "Black", thai: "สีดำ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/10.png" },
    { word: "Brown", thai: "สีน้ำตาล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/11.png" },
    { word: "White", thai: "สีขาว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/12.png" },
    { word: "Gray", thai: "สีเทา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/13.png" },
  ],
  shapes: [
    { word: "Heart", thai: "รูปหัวใจ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/15.png" },
    { word: "Star", thai: "รูปดาว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/16.png" },
    { word: "Circle", thai: "วงกลม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/17.png" },
    { word: "Semicircle", thai: "ครึ่งวงกลม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/18.png" },
    { word: "Triangle", thai: "สามเหลี่ยม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/19.png" },
    { word: "Ellipse", thai: "วงรี", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/20.png" },
    { word: "Rhombus", thai: "สี่เหลี่ยมขนมเปียกปูน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/21.png" },
    { word: "Parallelogram", thai: "สี่เหลี่ยมด้านขนาน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/22.png" },
    { word: "Trapezium", thai: "สี่เหลี่ยมคางหมู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/23.png" },
    { word: "Rectangle", thai: "สี่เหลี่ยมผืนผ้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/24.png" },
    { word: "Square", thai: "สี่เหลี่ยมจัตุรัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/25.png" },
    { word: "Hexagon", thai: "หกเหลี่ยม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/26.png" },
    { word: "Octagon", thai: "แปดเหลี่ยม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/27.png" },
    { word: "Hemisphere", thai: "ครึ่งทรงกลม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/28.png" },
    { word: "Sphere", thai: "ทรงกลม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/29.png" },
    { word: "Cylinder", thai: "ทรงกระบอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/30.png" },
    { word: "Cube", thai: "ลูกบาศก์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/31.png" },
    { word: "Cuboid", thai: "ทรงสี่เหลี่ยมมุมฉาก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/32.png" },
    { word: "Prism", thai: "ปริซึม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/33.png" },
    { word: "Pyramid", thai: "พีระมิด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/34.png" },
    { word: "Cone", thai: "ทรงกรวย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/35.png" },
    { word: "Cylinder", thai: "ทรงกระบอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/36.png" },
    { word: "Pentagonal", thai: "ปริซึมห้าเหลี่ยม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/37.png" },
    { word: "Hexagonal", thai: "ปริซึมหกเหลี่ยม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/basic/38.png" },
  ],
  vehicles_land: [
    { word: "Car", thai: "รถยนต์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/2.png" },
    { word: "Train", thai: "รถไฟ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/3.png" },
    { word: "Electric Train", thai: "รถไฟฟ้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/4.png" },
    { word: "Bus", thai: "รถบัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/5.png" },
    { word: "Ambulance", thai: "รถพยาบาล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/6.png" },
    { word: "Fire Truck", thai: "รถดับเพลิง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/7.png" },
    { word: "Police Car", thai: "รถตำรวจ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/8.png" },
    { word: "Taxi", thai: "รถแท็กซี่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/9.png" },
    { word: "Garbage Truck", thai: "รถเก็บขยะ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/10.png" },
    { word: "Tractor", thai: "รถแทรกเตอร์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/11.png" },
    { word: "Bulldozer", thai: "รถเกลี่ยดิน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/12.png" },
    { word: "Concrete Mixer", thai: "รถโม่ปูน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/13.png" },
    { word: "Crane Truck", thai: "รถเครน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/14.png" },
    { word: "Excavator", thai: "รถแม็คโคร", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/15.png" },
    { word: "Road Roller", thai: "รถบดถนน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/16.png" },
    { word: "Truck", thai: "รถบรรทุก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/17.png" },
    { word: "Van", thai: "รถตู้", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/18.png" },
    { word: "Motorcycle", thai: "รถจักรยานยนต์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/19.png" },
    { word: "ATV", thai: "รถ ATV", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/20.png" },
    { word: "Tuk-Tuk", thai: "รถตุ๊กตุ๊ก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/21.png" },
    { word: "Bicycle", thai: "จักรยาน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/22.png" },
    { word: "Scooter", thai: "สกู๊ตเตอร์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/23.png" },
  ],
  vehicles_water: [
    { word: "Ship", thai: "เรือขนส่งสินค้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/24.png" },
    { word: "Sailboat", thai: "เรือใบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/25.png" },
    { word: "Rowboat", thai: "เรือพาย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/26.png" },
    { word: "Rubber Boat", thai: "เรือยาง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/27.png" },
    { word: "Yacht", thai: "เรือยอทช์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/28.png" },
    { word: "Fishing Boat", thai: "เรือประมง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/29.png" },
    { word: "Warship", thai: "เรือรบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/30.png" },
  ],
  vehicles_air: [
    { word: "Airplane", thai: "เครื่องบิน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/31.png" },
    { word: "Helicopter", thai: "เฮลิคอปเตอร์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/32.png" },
    { word: "Spaceship", thai: "ยานอวกาศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/33.png" },
    { word: "Drone", thai: "โดรน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/34.png" },
    { word: "Hot Air Balloon", thai: "บอลลูน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/35.png" },
    { word: "Jet", thai: "เครื่องบินเจ็ท", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/vehicle/36.png" },
  ],
  food_protein: [
    { word: "Chicken", thai: "เนื้อไก่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/4.png" },
    { word: "Pork", thai: "เนื้อหมู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/5.png" },
    { word: "Beef", thai: "เนื้อวัว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/6.png" },
    { word: "Crab Meat", thai: "เนื้อปู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/7.png" },
    { word: "Egg", thai: "ไข่ไก่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/8.png" },
    { word: "Milk", thai: "นม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/9.png" },
    { word: "Shrimp", thai: "กุ้ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/10.png" },
    { word: "Salmon", thai: "ปลาแซลมอน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/11.png" },
    { word: "Squid", thai: "ปลาหมึก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/12.png" },
    { word: "Peanuts", thai: "ถั่วลิสง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/13.png" },
  ],
  food_carbs: [
    { word: "Rice", thai: "ข้าวสวย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/15.png" },
    { word: "Bread", thai: "ขนมปัง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/16.png" },
    { word: "Taro", thai: "เผือก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/17.png" },
    { word: "Sticky Rice", thai: "ข้าวเหนียว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/18.png" },
    { word: "Sugar", thai: "น้ำตาล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/19.png" },
    { word: "Noodles", thai: "ก๋วยเตี๋ยว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/20.png" },
    { word: "Corn", thai: "ข้าวโพด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/21.png" },
    { word: "Sweet Potato", thai: "มันเทศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/22.png" },
    { word: "Pasta", thai: "พาสต้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/23.png" },
    { word: "Oats", thai: "ข้าวโอ๊ต", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/24.png" },
  ],
  food_minerals: [
    { word: "Carrot", thai: "แครอท", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/26.png" },
    { word: "Tomato", thai: "มะเขือเทศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/27.png" },
    { word: "Morning Glory", thai: "ผักบุ้ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/28.png" },
    { word: "Pumpkin", thai: "ฟักทอง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/29.png" },
    { word: "Mushrooms", thai: "เห็ด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/30.png" },
    { word: "Broccoli", thai: "บล็อกโคลี่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/31.png" },
    { word: "Cucumber", thai: "แตงกวา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/32.png" },
    { word: "Cauliflower", thai: "กะหล่ำดอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/33.png" },
    { word: "Cabbage", thai: "กะหล่ำปลี", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/34.png" },
  ],
  food_vitamins: [
    { word: "Banana", thai: "กล้วย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/36.png" },
    { word: "Apple", thai: "แอปเปิ้ล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/37.png" },
    { word: "Orange", thai: "ส้ม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/38.png" },
    { word: "Watermelon", thai: "แตงโม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/39.png" },
    { word: "Mango", thai: "มะม่วง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/40.png" },
    { word: "Grapes", thai: "องุ่น", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/41.png" },
    { word: "Pineapple", thai: "สับปะรด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/42.png" },
    { word: "Papaya", thai: "มะละกอ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/43.png" },
    { word: "Guava", thai: "ฝรั่ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/44.png" },
    { word: "Durian", thai: "ทุเรียน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/45.png" },
  ],
  food_fats: [
    { word: "Vegetable Oil", thai: "น้ำมันพืช", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/47.png" },
    { word: "Olive Oil", thai: "น้ำมันมะกอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/48.png" },
    { word: "Coconut Oil", thai: "น้ำมันมะพร้าว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/49.png" },
    { word: "Butter", thai: "เนย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/50.png" },
    { word: "Cheese", thai: "ชีส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/51.png" },
    { word: "Coconut Milk", thai: "กะทิ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/52.png" },
    { word: "Avocado", thai: "อะโวคาโด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/53.png" },
    { word: "Almonds", thai: "อัลมอนด์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/54.png" },
    { word: "Sesame Seeds", thai: "งา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/55.png" },
    { word: "Sunflower Seeds", thai: "เมล็ดทานตะวัน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/food/56.png" },
  ],
  vegetables: [
    { word: "Chili", thai: "พริก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/2.png" },
    { word: "Onion", thai: "หอมหัวใหญ่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/3.png" },
    { word: "Lettuce", thai: "ผักกาดหอม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/4.png" },
    { word: "Eggplant", thai: "มะเขือยาว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/5.png" },
    { word: "Tomato", thai: "มะเขือเทศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/6.png" },
    { word: "Broccoli", thai: "บรอกโคลี", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/7.png" },
    { word: "Cauliflower", thai: "กะหล่ำดอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/8.png" },
    { word: "Chinese Kale", thai: "คะน้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/9.png" },
    { word: "Garlic", thai: "กระเทียม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/10.png" },
    { word: "Pumpkin", thai: "ฟักทอง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/11.png" },
    { word: "Carrot", thai: "แครอท", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/12.png" },
    { word: "Mushroom", thai: "เห็ด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/13.png" },
  ],
  fruits: [
    { word: "Coconut", thai: "มะพร้าว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/14.png" },
    { word: "Apple", thai: "แอปเปิล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/15.png" },
    { word: "Banana", thai: "กล้วย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/16.png" },
    { word: "Rose Apple", thai: "ชมพู่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/17.png" },
    { word: "Watermelon", thai: "แตงโม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/18.png" },
    { word: "Mangosteen", thai: "มังคุด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/19.png" },
    { word: "Dragon Fruit", thai: "แก้วมังกร", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/20.png" },
    { word: "Pineapple", thai: "สับปะรด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/21.png" },
    { word: "Durian", thai: "ทุเรียน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/22.png" },
    { word: "Longan", thai: "ลำไย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/23.png" },
    { word: "Mango", thai: "มะม่วง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/24.png" },
    { word: "Grape", thai: "องุ่น", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/nature/25.png" },
  ],
  animals_land: [
    { word: "Dog", thai: "สุนัข", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/dog.jpg" },
    { word: "Rabbit", thai: "กระต่าย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/rabbit.jpg" },
    { word: "Zebra", thai: "ม้าลาย", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/zebra.jpg" },
    { word: "Bear", thai: "หมี", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/bear.jpg" },
    { word: "Monkey", thai: "ลิง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/monkey.jpg" },
    { word: "Deer", thai: "กวาง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/deer.jpg" },
    { word: "Rhinoceros", thai: "แรด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/rhino.jpg" },
    { word: "Squirrel", thai: "กระรอก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/squi.jpg" },
    { word: "Elephant", thai: "ช้าง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/elephant.jpg" },
    { word: "Lion", thai: "สิงโต", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/lion.jpg" },
    { word: "Tiger", thai: "เสือ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/land/tiger.jpg" },
  ],
  animals_water: [
    { word: "Squid", thai: "ปลาหมึก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/Squid.png" },
    { word: "Whale", thai: "วาฬ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/whale.jpg" },
    { word: "Clownfish", thai: "ปลาการ์ตูน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/Clownfish.png" },
    { word: "Crab", thai: "ปู", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/Crab.png" },
    { word: "Dolphin", thai: "โลมา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/dolphin.jpg" },
    { word: "Shark", thai: "ฉลาม", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/shark.jpg" },
    { word: "Shrimp", thai: "กุ้ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/shrimp.png" },
    { word: "Sea Turtle", thai: "เต่าทะเล", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/sea turtle.png" },
    { word: "Starfish", thai: "ปลาดาว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/starfish.png" },
    { word: "Pufferfish", thai: "ปลาปักเป้า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sea/pufferfish.png" },
  ],
  animals_air: [
    { word: "Owl", thai: "นกฮูก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/owl.jpg" },
    { word: "Peacock", thai: "นกยูง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/Peacock.png" },
    { word: "Parrot", thai: "นกแก้ว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/parrot.jpg" },
    { word: "Flamingo", thai: "นกฟลามิงโก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/flamingo.png" },
    { word: "Ostrich", thai: "นกกระจอกเทศ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/ostrich.png" },
    { word: "Pigeon", thai: "นกพิราบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/pigeon.png" },
    { word: "Chicken", thai: "ไก่", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/chicken.png" },
    { word: "Crow", thai: "อีกา", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/crow.png" },
    { word: "Hornbill", thai: "นกเงือก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/hornbill.png" },
    { word: "Penguin", thai: "เพนกวิน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/sky/penguin.png" },
  ],
  animals_prehistoric: [
    { word: "Pteranodon", thai: "เทอราโนดอน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/36.jpg" },
    { word: "Parasaurolophus", thai: "พาราซอโรลอฟัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/37.jpg" },
    { word: "T-Rex", thai: "ที-เร็กซ์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/t_rex.jpg" },
    { word: "Woolly Mammoth", thai: "แมมมอธ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/39.jpg" },
    { word: "Triceratops", thai: "ไทรเซอราทอปส์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/40.jpg" },
    { word: "Plesiosaurus", thai: "เพลสิโอซอรัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/41.jpg" },
    { word: "Spinosaurus", thai: "สไปโนซอรัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/42.jpg" },
    { word: "Saber-toothed Tiger", thai: "เสือเขี้ยวดาบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/43.jpg" },
    { word: "Ankylosaurus", thai: "แองไคโลซอรัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/44.jpg" },
    { word: "Brontosaurus", thai: "บรอนโตซอรัส", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/dino/45.jpg" },
  ],
  animals_amphibian: [
    { word: "Frog", thai: "กบ", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/58.jpg" },
    { word: "Toad", thai: "คางคก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/59.jpg" },
    { word: "Tree Frog", thai: "กบต้นไม้", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/60.jpg" },
    { word: "Bullfrog", thai: "อึ่งอ่าง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/61.jpg" },
    { word: "Tadpole", thai: "ลูกอ๊อด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/62.jpg" },
    { word: "Salamander", thai: "ซาลาแมนเดอร์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/63.jpg" },
    { word: "Newt", thai: "นิวท์", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/amphi/64.jpg" },
  ],
  animals_reptile: [
    { word: "Iguana", thai: "อีกัวน่า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/47.jpg" },
    { word: "Rattlesnake", thai: "งูหางกระดิ่ง", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/48.jpg" },
    { word: "Cobra", thai: "งูเห่า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/49.jpg" },
    { word: "Skink", thai: "จิ้งเหลน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/50.jpg" },
    { word: "Chameleon", thai: "กิ้งก่าคาเมเลี่ยน", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/51.jpg" },
    { word: "Crocodile", thai: "จระเข้", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/52.jpg" },
    { word: "Turtle", thai: "เต่า", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/53.jpg" },
    { word: "Lizard", thai: "จิ้งจก", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/54.jpg" },
    { word: "Leopard Gecko", thai: "ตุ๊กแกเสือดาว", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/55.jpg" },
    { word: "Komodo Dragon", thai: "มังกรโคโมโด", image: "https://storage.googleapis.com/mtr-system/media-app/public/images/flashcards/reptile/56.jpg" },
  ],
};

// --- Single Flashcard ---
function SingleFlashcard({ card, id }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div id={id} className="h-screen w-full flex-shrink-0 snap-start flex flex-col items-center justify-center relative p-4 pb-48 pt-32"> 
      
      {/* ✅ ปรับขนาดบัตรคำหลักให้เล็กลง (max-w-3xl) */}
      <div className="w-full max-w-3xl aspect-video relative group flex items-center justify-center">
          {!hasError ? (
            <img 
                src={card.image}
                alt={card.word}
                className="h-full w-full object-contain drop-shadow-2xl transition-transform hover:scale-105"
                onError={() => setHasError(true)}
            />
          ) : (
            <div className="text-center text-gray-400">
              <span className="text-6xl">🖼️</span><br/>Image Not Found
            </div>
          )}
      </div>

      {/* บอกให้เลื่อนลง */}
      <div className="absolute bottom-44 animate-bounce pointer-events-none flex flex-col items-center opacity-80 scale-75">
         <span className="text-white font-bold text-lg drop-shadow-md bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm mb-1">
            ถัดไป
         </span>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-8 h-8 drop-shadow-md">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
         </svg>
      </div>

    </div>
  );
}

// --- Main Page ---
function FlashcardPlayerPage({ isMuted }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentCategory, setCurrentCategory] = useState(location.state?.category || 'food_protein');
  
  const groupKey = findGroupKey(currentCategory);
  const siblingCategories = categoryGroups[groupKey] || [];

  const cards = flashcardData[currentCategory] || [];
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); 
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentCategory]);

  const scrollToCard = (index) => {
    setIsGridOpen(false);
    const element = document.getElementById(`card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIndex && index < cards.length) {
      setActiveIndex(index);
    }
  };

  const handleChangeCategory = (catId) => {
    setCurrentCategory(catId);
  };

  return (
    <div 
      className="h-screen w-full relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* Buttons (Top Right) */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-3">
         <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-200 hover:bg-red-50 text-red-500 transition-transform active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            onClick={() => setIsGridOpen(true)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200 hover:bg-blue-50 text-blue-500 transition-transform active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
      </div>

      {/* Tab Menu - ปรับขนาดให้เล็กลง */}
      <div className="absolute top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-3xl px-4 flex justify-center pointer-events-none">
         <div className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-full border border-white/50 p-1 flex gap-1 shadow-md overflow-x-auto no-scrollbar max-w-full">
            {siblingCategories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => handleChangeCategory(cat.id)}
                    className={`
                        px-3 py-1.5 rounded-full whitespace-nowrap text-xs md:text-sm font-bold transition-all duration-300
                        ${currentCategory === cat.id 
                            ? 'bg-yellow-400 text-black shadow-sm scale-105' 
                            : 'bg-transparent text-gray-500 hover:bg-white hover:text-gray-700'
                        }
                    `}
                >
                    {cat.label}
                </button>
            ))}
         </div>
      </div>

      {/* Grid Modal (คงเดิม) */}
      {isGridOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col animate-fade-in">
           <div className="flex justify-between items-center p-6 text-white">
              <h2 className="text-xl font-bold">เลือกการ์ดที่ต้องการ</h2>
              <button onClick={() => setIsGridOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center">✕</button>
           </div>
           <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
                 {cards.map((card, index) => (
                    <button 
                       key={index}
                       onClick={() => scrollToCard(index)}
                       className="group bg-white rounded-lg overflow-hidden aspect-video shadow-md hover:ring-2 ring-yellow-400 transition-all transform hover:scale-105"
                    >
                       <div className="w-full h-full bg-white flex flex-col items-center justify-center p-1">
                          <img src={card.image} alt={card.word} className="h-full w-full object-contain" />
                       </div>
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* ✅ Thumbnail Bar - ปรับให้เล็กลง (h-14) และชิดขอบล่าง (bottom-10) */}
      {cards.length > 0 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-14 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 z-40 flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar">
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`
                  flex-shrink-0 h-10 aspect-video rounded-md overflow-hidden border-[1.5px] transition-all duration-300 relative
                  ${index === activeIndex ? 'border-yellow-400 scale-110 shadow-md ring-1 ring-white' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}
                `}
              >
                <div className="w-full h-full bg-white flex items-center justify-center">
                   <img src={card.image} className="h-full w-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[7px] px-1 py-0.2 rounded-tl-sm font-bold">
                    {index + 1}
                </div>
              </button>
            ))}
        </div>
      )}

      {/* Main Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {cards.length > 0 ? (
            cards.map((card, index) => (
              <SingleFlashcard key={`${currentCategory}-${index}`} id={`card-${index}`} card={card} />
            ))
        ) : (
            <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-black/50">
                <h2 className="text-xl font-bold">ไม่พบข้อมูลในหมวดนี้</h2>
                <button onClick={() => navigate(-1)} className="mt-4 bg-white text-black px-4 py-2 rounded-lg">ย้อนกลับ</button>
            </div>
        )}
        
        {/* End Screen */}
        {cards.length > 0 && (
            <div className="h-screen w-full flex-shrink-0 snap-start flex flex-col items-center justify-center text-white bg-black/60 backdrop-blur-md pb-24">
                <h2 className="text-2xl font-black mb-4">จบหมวดนี้แล้ว! 🎉</h2>
                <div className="flex gap-4 scale-90">
                  <button 
                      onClick={() => scrollToCard(0)}
                      className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-bold text-base hover:bg-gray-100 shadow-md"
                  >
                      ↺ เล่นอีกรอบ
                  </button>
                  <button 
                      onClick={() => navigate(-1)}
                      className="bg-yellow-400 text-black px-8 py-2.5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-md border-2 border-white"
                  >
                      เลือกหมวดอื่น
                  </button>
                </div>
            </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default FlashcardPlayerPage;