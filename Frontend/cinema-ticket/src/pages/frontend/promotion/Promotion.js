import React from "react";

const promotions = [
  {
    title: "GIẢM 50% CHO HỌC SINH SINH VIÊN",
    description: "Đồng giá cho HSSV/GV/U22 cả tuần tại mọi cụm rạp",
    conditions: [
      "HSSV xuất trình thẻ HSSV hoặc CCCD từ dưới 22 tuổi.",
      "Giảng viên/giáo viên xuất trình thẻ giảng viên."
    ],
    notes: [
      "Mỗi thẻ mua được một vé.",
      "Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim."
    ],
    image: "/images/KM3.jpg",
    reverse: false,
  },
  {
    title: "THỨ 6 VỚI VOUCHER",
    description: "THỨ 6 XI-NÊ! QUÀ TẶNG CỰC MÊ: 100% trúng quà khi đặt vé xem phim trực tiếp trên MoMo vào mỗi thứ 6 hàng tuần!.",
    conditions: [
      "Áp dụng cho tất cả các suất chiếu vào thứ 6 hàng tuần.",
      "Vé miễn phí có giá trị tương đương hoặc thấp hơn vé mua."
    ],
    notes: [
      "Không áp dụng chung với các chương trình khuyến mãi khác.",
      "Số lượng vé có hạn, chương trình có thể kết thúc sớm."
    ],
    image: "/images/KM4.png",
    reverse: true,
  }
];

const Promotion = () => {
  return (
    <div className="bg-gradient-to-b from-[#101432] to-[#171b3a] text-white py-16 px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {promotions.map((promo, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center ${promo.reverse ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="md:w-1/2 p-6">
              <h2 className="text-xl font-bold text-yellow-400 uppercase">{promo.title}</h2>
              <p className="mt-2 text-lg">{promo.description}</p>
              
              <h3 className="mt-4 text-lg font-semibold">Điều kiện</h3>
              <ul className="list-disc list-inside text-gray-300">
                {promo.conditions.map((condition, idx) => (
                  <li key={idx}>{condition}</li>
                ))}
              </ul>
              
              <h3 className="mt-4 text-lg font-semibold">Lưu ý</h3>
              <ul className="list-disc list-inside text-gray-300">
                {promo.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
              
              <button className="mt-6 bg-yellow-400 text-black font-bold px-6 py-3 rounded text-lg shadow-md hover:bg-yellow-500">
                ĐẶT VÉ NGAY
              </button>
            </div>
            
            <div className="md:w-1/2 p-6">
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
