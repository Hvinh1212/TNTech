import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './add_product.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [memory, setMemory] = useState("");
  const [RAM, setRam] = useState("");
  const [chip, setChip] = useState("");
  const [display_size, setDisplaySize] = useState("");
  const [display_technology, setDisplayTechnology] = useState("");
  const [battery, setBattery] = useState("");
  const [front_facing_camera, setFrontCamera] = useState("");
  const [rear_facing_camera, setRearCamera] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [product_image, setProductImage] = useState("");
  const [description, setDescription] = useState("");
  const [qty_in_stock, setQtyInStock] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('product_name', name);
    formData.append('category_id', convertCate(category));
    formData.append('product_price', price);
    formData.append('discount_id', discount);
    formData.append('product_description', description);
    formData.append('product_image', product_image); // Đảm bảo đây là tệp
    formData.append('color', color);
    formData.append('supplier_id', convertBrand(rear_facing_camera));
    formData.append('qty_in_stock', qty_in_stock);

    // Thêm các chi tiết vào FormData
    if (memory) formData.append('details', JSON.stringify({ key_name: 'memory', key_value: memory }));
    if (chip) formData.append('details', JSON.stringify({ key_name: 'chip', key_value: chip }));
    if (RAM) formData.append('details', JSON.stringify({ key_name: 'RAM', key_value: RAM }));
    if (display_size) formData.append('details', JSON.stringify({ key_name: 'display_size', key_value: display_size }));
    if (display_technology) formData.append('details', JSON.stringify({ key_name: 'display_technology', key_value: display_technology }));
    if (battery) formData.append('details', JSON.stringify({ key_name: 'battery', key_value: battery }));
    if (front_facing_camera) formData.append('details', JSON.stringify({ key_name: 'front_facing_camera', key_value: front_facing_camera }));

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast('Thêm sản phẩm thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error('Failed to add product to cart');
      }
    } catch (error) {
      console.log(formData.get('details'));
      alert('Thêm sản phẩm không thành công!', error.message);
    }
  }

  const convertCate = (category) => {
    if (category.toLowerCase() === 'laptop') return 1;
    if (category.toLowerCase() === 'điện thoại') return 2;
    if (category.toLowerCase() === 'máy tính bảng') return 3;
    if (category.toLowerCase() === 'phụ kiện') return 4;
  }

  const convertBrand = (brand) => {
    if (brand.toLowerCase() === 'apple') return 1;
    if (brand.toLowerCase() === 'samsung') return 2;
    if (brand.toLowerCase() === 'hp') return 3;
    if (brand.toLowerCase() === 'dell') return 4;
    if (brand.toLowerCase() === 'asus') return 5;
    if (brand.toLowerCase() === 'sony') return 6;
    if (brand.toLowerCase() === 'acer') return 7;
  }

  return (
    <div className="products">
      <Sidebar />
      <div className="productsContainer">
        <h1>Add New Product</h1>
        <form>
          <label htmlFor="name">Tên:</label>
          <input type="text" placeholder="Tên" onChange={(e) => setName(e.target.value)} />

          <label htmlFor="category">Danh mục:</label>
          <input type="text" placeholder="Laptop, Điện thoại, Máy tình bảng, Phụ kiện" onChange={(e) => setCategory(e.target.value)} />

          <label htmlFor="rear_facing_camera">Hãng:</label>
          <input type="text" placeholder="Apple, Samsung, HP, Dell, Asus, Sony, Acer" onChange={(e) => setRearCamera(e.target.value)} />

          <label htmlFor="color">Màu sắc:</label>
          <input type="text" placeholder="Color" onChange={(e) => setColor(e.target.value)} />

          <label htmlFor="memory">Bộ nhớ:</label>
          <input type="text" placeholder="Memory" onChange={(e) => setMemory(e.target.value)} />

          <label htmlFor="RAM">RAM:</label>
          <input type="text" placeholder="RAM" onChange={(e) => setRam(e.target.value)} />

          <label htmlFor="chip">Chip xử lý:</label>
          <input type="text" placeholder="Chip" onChange={(e) => setChip(e.target.value)} />

          <label htmlFor="display_size">Màn hình:</label>
          <input type="text" placeholder="Màn hình" onChange={(e) => setDisplaySize(e.target.value)} />

          <label htmlFor="display_technology">Trọng lượng:</label>
          <input type="text" placeholder="Trọng lượng" onChange={(e) => setDisplayTechnology(e.target.value)} />

          <label htmlFor="battery">Pin:</label>
          <input type="text" placeholder="Pin" onChange={(e) => setBattery(e.target.value)} />

          <label htmlFor="front_facing_camera">Camera:</label>
          <input type="text" placeholder="Độ phân giải" onChange={(e) => setFrontCamera(e.target.value)} />

          <label htmlFor="price">Giá:</label>
          <input type="text" placeholder="Giá" onChange={(e) => setPrice(e.target.value)} />

          <label htmlFor="discount">Khuyến mãi:</label>
          <input type="text" placeholder="Khuyến mãi" onChange={(e) => setDiscount(e.target.value)} />

          <label htmlFor="product_image">Ảnh:</label>
          <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />

          <label htmlFor="description">Mô tả:</label>
          <textarea type="text" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />

          <label htmlFor="qty_in_stock">Số lượng trong kho:</label>
          <input type="text" placeholder="Số lượng" onChange={(e) => setQtyInStock(e.target.value)} />

          <button onClick={handleSubmit}>Add Product</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Products;