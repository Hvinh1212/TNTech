import React from "react";

// Hàm tạo số lượng ngẫu nhiên
const getRandomQuantity = () => Math.floor(Math.random() * 10) + 1;

const colors = [
  { key_name: "Trắng", key_value: "Trắng", quantity: getRandomQuantity(), bgColor: "bg-white" },
  { key_name: "Đen", key_value: "Đen", quantity: getRandomQuantity(), bgColor: "bg-black text-white" },
  { key_name: "Xanh", key_value: "Xanh", quantity: getRandomQuantity(), bgColor: "bg-blue-500 text-white" },
  { key_name: "Hồng", key_value: "Hồng", quantity: getRandomQuantity(), bgColor: "bg-pink-500 text-white" },
];

const SizeSelect = ({ selectedSize, updateSelectedSize }) => {
  return (
    <div className="flex gap-3 mt-3">
      {colors.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            updateSelectedSize(item);
          }}
          className={`px-4 py-2 rounded-lg font-bold cursor-default ${selectedSize?.key_name === item.key_name ? item.bgColor : "bg-gray-200"
            } hover:opacity-80`}
        >
          {item.key_value} ({item.quantity})
        </button>
      ))}
    </div>
  );
};

export default SizeSelect;