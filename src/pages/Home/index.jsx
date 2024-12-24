import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import axios from "axios";
import { DataContexts } from "../../AppContexts/Contexts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { TbTruckDelivery } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineAutorenew, MdOutlineShoppingCartCheckout } from "react-icons/md";

import ItemSwiper from "../../components/RecommentItem/ItemSwiper";
import BrandSelector from "./BrandSelector";
import InfoBox from "./InfoBox";
const Home = () => {
  const { banners, products } = useContext(DataContexts);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="py-5 w-11/12 mx-auto">
        <div className="w-2/3">
          <Breadcrumb />
        </div>
      </div>

      <div className="w-full mt-5 mb-10 rounded-sm border border-stroke shadow-default">
        <div className="w-full flex justify-center">
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <img src={banner.banner_img} className="w-full h-[600px] object-cover" alt={`Banner ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-11/12 flex flex-col mx-auto">
        <h2 className="text-center text-2xl font-bold mb-5">Thông tin dịch vụ</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
          <InfoBox
            icon={TbTruckDelivery}
            title="Vận chuyển toàn quốc"
            content="Nhanh và thân thiện"
          />
          <InfoBox
            icon={FiCheckCircle}
            title="Bảo đảm chất lượng"
            content="Sản phẩm chính hãng"
          />
          <InfoBox
            icon={MdOutlineAutorenew}
            title="Đổi sản phẩm mới"
            content="Nếu sản phẩm lỗi"
          />
          <InfoBox
            icon={MdOutlineShoppingCartCheckout}
            title="Đa dạng thanh toán"
            content="Nhiều phương thức"
          />
        </div>

        <div className="py-5 flex flex-col w-full">
          <h2 className="uppercase font-bold text-xl">Sản phẩm mới</h2>
          <ItemSwiper items={products} className="flex justify-center items-center" />
        </div>

        <div className="py-5 flex flex-col w-full">
          <BrandSelector />
        </div>
      </div>
    </div>
  );
};

export default Home;
