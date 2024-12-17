import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Failed to load products:', error));
  }, []);


  // const submitEdit = async (productData) => {
  //   const response = await fetch(`http://localhost:5000/api/products/${productData.product_id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(productData)
  //   });
  //   const updatedProduct = await response.json();
  //   if (response.success == true) {
  //     setProducts(products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product));
  //     setShowModal(false);
  //   } else {
  //     console.error('Failed to update product', updatedProduct);
  //   }
  // };

  const handleEdit = (product) => {
    const editProduct = {
      ...product
    };
    setEditingProduct(editProduct);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    console.log(productId)
    const payload = { product_id: productId }
    fetch(`http://localhost:5000/api/products`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setProducts(products.filter(product => product.product_id !== productId));
      })
      .catch(error => console.error('Failed to delete product:', error));
  };

  const ProductEditModal = () => {
    const [localEditingProduct, setLocalEditingProduct] = useState(editingProduct);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalEditingProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = async (event) => {
      const updatedProductData = {
        product_description: localEditingProduct.product_description,
        product_price: parseFloat(localEditingProduct.product_price),
        discount_id: parseInt(localEditingProduct.discount_id)
      };
      console.log('payload', updatedProductData)
      const response = await fetch(`http://localhost:5000/api/products/${localEditingProduct.product_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData)
      });

      if (response.ok) { // Sửa ở đây
        const updatedProduct = await response.json();
        setProducts(products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product));
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to update product', errorData);
      }
    };

    return (
      <div style={{
        display: showModal ? "block" : "none",
        position: "fixed",
        left: "20%",
        top: "10%",
        backgroundColor: "#C7E2F2",
        padding: "20px",
        zIndex: 100,
        width: "60%",
        maxHeight: "80%",
        overflowY: "auto",
        border: "2px solid black"
      }}>
        <h2>Edit Product: {localEditingProduct?.product_name}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: 'Price', type: 'text', field: 'product_price' },
              { label: 'Discount', type: 'text', field: 'discount_id' },
              { label: 'Description', type: 'textarea', field: 'product_description' },
            ].map(input => (
              <label key={input.field}>
                {input.label}:
                {input.type === 'textarea' ? (
                  <textarea
                    name={input.field}
                    value={localEditingProduct[input.field]}
                    onChange={handleInputChange}
                    style={{ width: "100%", height: "100px" }}
                  />
                ) : (
                  <input
                    type={input.type}
                    name={input.field}
                    value={localEditingProduct[input.field]}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                )}
              </label>
            ))}
          </div>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  };


  return (
    <div className="products">
      <Sidebar />
      <div className="productsContainer">
        <h1>Quản lý sản phẩm</h1>
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Loại</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Giá sau giảm</th>
              <th>Ảnh sản phẩm</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>

            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.category.category_name}</td>
                <td>{product.product_name}</td>
                <td>{product.product_price}</td>
                <td>{(product.product_price - (product.product_price * product.discount_id / 100)).toString()}đ</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>Đang bán</td>

                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && <ProductEditModal />}
      </div>
    </div>
  );
}

export default Products;
