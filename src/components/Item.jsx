import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Item = ({ value }) => {
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự đặc biệt
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() =>
          navigate(`/san-pham/${generateSlug(value.product_name)}-${value.product_id}`)
        }
        className={`w-full border border-gray-400 bg-white rounded-lg p-4 group duration-200 cursor-pointer`}
      >
        <div className="relative w-full flex items-center justify-center rounded-lg mb-5 p-5 ">
          <img
            src={value.product_image}
            alt={value.product_name}
            className=" rounded-md h-[120px] md:h-[120px] lg:h-[140px] w-[150px] lg:w-[170px] scale group-hover:scale-125 scale-100 duration-300"
          />
        </div>
        <div className="w-full">
          <p className="capitalize text-lg  group-hover:text-blue-600 text-left font-bold truncate">
            {value.product_name}
          </p>
          <div className="flex pt-5 flex-row items-center justify-between">
            {value.discount_id == 0 ? (
              <p className=" text-[#3e3e3e] text-base font-medium group-hover:text-blue-500 ">
                {formatNumber(value.product_price)}đ
              </p>
            ) : (
              <div className="flex flex-row items-end gap-1 justify-between w-3/4">
                <p className=" text-[#3e3e3e] text-base font-medium group-hover:text-blue-500 ">
                  {formatNumber(
                    value.product_price - (value.product_price * value.discount_id) / 100
                  )}
                  đ
                </p>
                <p className=" text-[#8d8a8a] line-through text-base font-medium group-hover:text-blue-500 " style={{ fontSize: '14px' }}>
                  {formatNumber(value.product_price)}đ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
