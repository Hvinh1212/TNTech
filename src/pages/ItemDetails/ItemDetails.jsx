import { useState, useEffect, useContext } from "react";
import QuantitySelection from "../../components/QuantitySelection";
import { useParams, Link, useNavigate } from "react-router-dom";
import RecommentItem from "../../components/RecommentItem/RecommentItem";
import axios from "axios";
import { DataContexts } from "../../AppContexts/Contexts";
import SizeSelect from "./SizeSelect";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { notification } from "antd";

const ItemDetails = () => {
  const { slugId } = useParams();
  const { products, fetchCartData, customerId } = useContext(DataContexts)
  const lastDashIndex = slugId.lastIndexOf("-");
  const productId = slugId.slice(lastDashIndex + 1);
  const userId = localStorage.getItem('id');
  const [items, setItems] = useState([])

  const [quantity, setQuantity] = useState(1);

  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState({});
  const [brandName, setBrandName] = useState({});
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [des, setDes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});

  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/products/` + productId
      )
      .then((res) => {
        console.log(res.data)
        const allImages = [res.data.product_image, ...res.data.otherimages];
        setImages(allImages); // Cập nhật danh sách ảnh
        setActiveImage(allImages[0]);
        setProductName(res.data.product_name);
        setCategoryName(res.data.category);
        setBrandName(res.data.supplier);
        setImages(allImages);
        setSizes(res.data.productdetail);
        setDes(res.data.product_description);
        setDiscount(res.data.discount_id);
        setPrice(parseInt(res.data.product_price));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);


  const handleAddCartClick = () => {
    if (!customerId) {
      notification.warning({
        key: "cart-warning",
        message: <span style={{ color: "#ff9900", fontWeight: "bold" }}>Thông báo</span>,
        description: "Vui lòng đăng nhập để thêm vào giỏ!",
      });
    } else {
      console.log('so luong', customerId, productId, quantity);
      axios.post("http://localhost:5000/api/carts", {
        customer_id: customerId,
        product_id: productId,
        cart_quantity: quantity
      })
        .then((res) => {
          if (res.data.success == false) {
            notification.error({
              message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
              description: 'Thêm vào giỏ hàng thất bại!',
              showProgress: true,
            });
          }
          else {
            notification.success({
              message: <span style={{ color: 'green', fontWeight: 'bold' }}>Thành công</span>,
              description: 'Thêm vào giỏ hàng thành công!',
              showProgress: true,
            });
            fetchCartData(userId)

          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const handleOrderClick = async () => {
    if (!customerId) {
      notification.warning({
        key: "cart-warning",
        message: <span style={{ color: "#ff9900", fontWeight: "bold" }}>Thông báo</span>,
        description: "Vui lòng đăng nhập để đặt hàng!",
      });
    } else {
      const payload = {
        productId: productId,
        name: productName,
        price: Number(price),
        quantity: Number(quantity),
        image: images[0],
        discount: discount
      };
      console.log('data', payload);
      navigate('/payment', { state: payload });
    }
  };



  const [activeImg, setActiveImage] = useState(images[0]);

  useEffect(() => {
    if (!activeImg && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [activeImg, images]);

  useEffect(() => {
    if (productName) {
      const temps = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Sản phẩm', href: '/san-pham' },
        { name: productName }
      ]
      setItems(temps);
    }
  }, [activeImg, images, productName]);
  const [expandText, setExpandText] = useState(false);

  function handleExpandButton() {
    setExpandText(!expandText);
  }
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const handleImageClick = () => {
    setIsHoverEnabled(false);

    setTimeout(() => {
      setIsHoverEnabled(true);
    }, 1000);
  };


  const refProducts = products.filter(
    (product) =>
      product.supplier.supplier_name === brandName.supplier_name ||
      product.category.category_name === categoryName.category_name
  );

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const recProducts = shuffle(refProducts).slice(0, 10);

  return (
    <>
      <Breadcrumb items={items} />
      <div className="w-11/12 h-auto flex flex-col py-5 mb-20  items-center place-self-center">

        <div className="w-11/12 px-24 flex ">
          <div className="w-full flex flex-row justify-between gap-0">
            <div className="flex flex-col max-h-[500px] gap-2 items-center"> {/* Căn giữa các phần tử */}
              <div className="flex justify-center mb-2 w-full"> {/* Căn giữa ảnh chính và đảm bảo chiều rộng đầy đủ */}
                <img
                  src={activeImg}
                  alt="mainImage"
                  className="w-full h-auto max-w-[600px] max-h-[400px] object-cover border-b-2 rounded-lg" // Sử dụng max-width và max-height để đảm bảo responsive
                />
              </div>
              <div className="flex flex-wrap gap-2 overflow-x-auto"> {/* Thay đổi để cho phép cuộn ngang */}
                {images.slice(1).map((image, index) => ( // Sử dụng slice để bỏ qua ảnh chính
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`rounded-lg transition-opacity duration-200 w-[99px] h-[66px] object-cover cursor-pointer`} // Đặt kích thước đồng nhất cho ảnh chi tiết
                    onMouseOver={() => {
                      setActiveImage(image); // Cập nhật ảnh chính khi hover
                    }}
                    onClick={() => {
                      setActiveImage(image);
                      handleImageClick();
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="basis-5/12 ">
              <div className="w-full pb-5 mb-5 border-b-2 border-gray-500">
                <p className="text-4xl font-bold mt-2 mb-1">{productName}</p>
                <p className="pt-5 text-lg font-bold flex flex-row items-center">
                  Hãng công nghệ:
                  <div className="group ml-1 hover:bg-slate-700  px-2 py-1 rounded-lg">
                    <Link
                      to={`/san-pham?brand=${brandName.supplier_name}`}
                      className="capitalize font-bold text-sky-600 group-hover:text-white">
                      {brandName.supplier_name}
                    </Link>
                  </div>
                </p>
                <p className="text-lg font-bold flex flex-row items-center">
                  Thể loại:
                  <div className=" flex flex-row group ml-1 hover:bg-slate-700  px-2 py-1 rounded-lg">
                    <Link
                      to={`/san-pham?categories=${categoryName.category_id}`}
                      className="font-bold text-sky-600 group-hover:text-white">
                      {categoryName.category_name}
                    </Link>
                  </div>
                </p>
              </div>
              <div className="w-full border-b-2 border-gray-500 mb-5 pb-5">

                {discount != 0 ? (
                  <div className="w-full flex flex-row items-end gap-3">
                    <p className="font-bold text-4xl">
                      {formatNumber(price - (price * discount) / 100)}đ
                    </p>

                    <p className="text-4xl font-medium text-gray-500 line-through">
                      {formatNumber(price)}đ
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-row items-end gap-3">
                    <p className="font-bold text-4xl">
                      {formatNumber(price)}đ
                    </p>

                  </div>
                )}

              </div>
              <div className="w-full">
                <p className="text-lg font-bold text-left my-2">
                  Mô tả sản phẩm:{" "}
                </p>
                <p className=" text-left whitespace-pre-wrap break-words">
                  {expandText ? des : des.slice(0, 150) + "..."}
                </p>
                <p
                  className="italic text-gray-600 hover:text-cyan-800 hover:font-bold hover:cursor-pointer"
                  onClick={handleExpandButton}
                >
                  {expandText ? "Thu gọn" : "Xem thêm"}{" "}
                </p>
              </div>
              <p className="font-bold text-lg">Thông số kỹ thuật</p>
              <div className="w-full">
                {sizes.map((size, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{size.key_name}:</span>
                    <span>{size.key_value}</span>
                  </div>
                ))}
              </div>
              <p className="font-bold text-lg">Chọn màu</p>
              <SizeSelect
                sizes={sizes}
                selectedSize={selectedSize}
                updateSelectedSize={setSelectedSize}
              />
              <div className="w-full mt-3">
                <QuantitySelection
                  quantity={quantity}
                  updateQuantity={setQuantity}
                  limit={parseInt(selectedSize.quantity)}
                />
              </div>
              <div className="flex flex-row mt-5 gap-3">
                <button className="group overflow-hidden w-1/3 h-[60px] flex items-center justify-start border hover:bg-slate-700 border-[#3e3e3e] rounded-xl cursor-pointer group hover:border-none ">
                  <p
                    onClick={handleOrderClick}
                    className="text-lg w-full text-black group-hover:text-white font-bold "
                  >
                    Mua ngay
                  </p>
                </button>
                <button
                  onClick={handleAddCartClick}
                  className="group overflow-hidden w-1/3 h-[60px] flex items-center justify-start  border hover:bg-slate-700 border-[#3e3e3e] rounded-xl cursor-pointer group hover:border-none "
                >
                  <p className="text-lg w-full text-black group-hover:text-white font-bold">
                    Thêm vào giỏ
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-20">
          <RecommentItem items={recProducts} className="flex justify-center items-center" />
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
