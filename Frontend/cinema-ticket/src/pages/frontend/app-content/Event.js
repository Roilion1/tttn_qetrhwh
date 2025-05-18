import React from "react";

const events = [
  {
    title: "Fanclub, Cầu hôn, Sinh nhật",
    description: "Chúng tôi kỳ vọng sẽ đứng đằng sau làm sân khấu để tôn vinh câu chuyện của doanh nghiệp bạn.",
    contact: "0966252325",
    image: "/images/SK1.png",
    reverse: false
  },
  {
    title: "Hội thảo, Ra mắt sản phẩm",
    description: "Chúng tôi cung cấp không gian sang trọng, hiện đại để tổ chức hội thảo và ra mắt sản phẩm.",
    contact: "0966252326",
    image: "/images/SK3.png",
    reverse: true
  },
  {
    title: "Tiệc công ty, Gala Dinner",
    description: "Không gian lý tưởng để tổ chức tiệc công ty và các buổi gala dinner sang trọng.",
    contact: "0966252327",
    image: "/images/SK2.png",
    reverse: false
  }
];

const Event = () => {
  return (
    <div className="bg-[#0B0E1E] text-white py-16 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">THUÊ SỰ KIỆN</h2>
        <p className="text-lg mb-6">Lên kế hoạch cho một sự kiện?</p>
        <p className="mb-6">Chúng tôi có nhiều lựa chọn để giúp sự kiện của bạn trở nên khó quên.</p>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        {events.map((event, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center ${event.reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
              <p className="mb-4">{event.description}</p>
              <p className="mb-6">Để biết thêm thông tin về việc thuê, vui lòng gọi: <strong>{event.contact}</strong></p>
              <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg">LIÊN HỆ NGAY</button>
            </div>
            <div className="md:w-1/2 p-6">
              <img 
                src={event.image} 
                alt={event.title} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
