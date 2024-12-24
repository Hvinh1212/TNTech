import React, { useState, useContext, useEffect } from "react";
import ItemSwiper from "../../components/RecommentItem/ItemSwiper";
import { DataContexts } from "../../AppContexts/Contexts";
import { Link, useNavigate } from "react-router-dom";
const BrandSelector = () => {
  const { products, manufacturers } = useContext(DataContexts);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      const filtered = products.filter(
        (product) => product.supplier.supplier_id === selectedBrand.supplier_id
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedBrand, products]);


  useEffect(() => {
    if (manufacturers.length > 0) {
      setSelectedBrand(manufacturers[0]);
    }
  }, [manufacturers]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/san-pham')
  }

  return (
    <div className="p-5">

      <div className="flex flex-wrap justify-center gap-4 mb-5 w-full sm:w-3/4 place-self-centerlex justify-center gap-4 mb-5 w-full sm:w-3/4 place-self-center">
        {manufacturers.map((brand) => (
          <button
            key={brand.supplier_id}
            onClick={() => setSelectedBrand(brand)}
            className={`py-3 px-4 sm:py-4 sm:px-6 md:py-6 md:w-[130px] lg:w-[130px] rounded-lg capitalize text-base sm:text-lg md:text-xl font-semibold 
        ${selectedBrand?.supplier_id === brand.supplier_id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
              }`}
          >
            {brand.supplier_name}
          </button>
        ))}
      </div>



      {filteredProducts.length > 0 ? (
        <ItemSwiper items={filteredProducts} />

      ) : (
        <p className="text-gray-600">Không có sản phẩm nào cho hãng này.</p>
      )}
      <div className="w-full text-right mt-4">
        <button className="text-white hover:text-blue-500 hover:bg-slate-500 text-lg italic bg-[#3e3e3e] py-3 px-3 rounded-xl" onClick={handleClick}>Xem thêm</button>
      </div>

    </div>
  );
};

export default BrandSelector;
