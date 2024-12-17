import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const DataContexts = createContext({});

export const AppProvider = ({ children }) => {
  // const[email, setEmail] = useState("")

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [carts, setCarts] = useState([]);
  // const [shop, setShop] = useState([]);
  const [banners, setBanners] = useState([]);
  // const [userCart, setUserCart] = useState([]);

  const id = localStorage.getItem("id")

  const [customerId, setCustomerId] = useState(null);
  const [cartData, setCartData] = useState([]);

  const [customerIdMain, setCustomerIdMain] = useState(null);
  const [userInfo, setUserInfo] = useState([]);


  const fetchCustomerId = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers`);
      const data = await response.json();
      const customerData = data.find(customer => customer.user_id === parseInt(id));

      if (customerData) {
        setCustomerIdMain(customerData.customer_id);
      } else {
        console.log("Customer not found for the given user ID.");
      }
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  };

  const fetchUserInfo = (id) => {
    if (!id) {
      console.log("Không có user");
      return;
    }

    axios.get(`http://localhost:5000/api/users/` + id)
      .then((res) => {
        setUserInfo(res.data[0]);
        console.log(res.data);
        return
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchCartData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers`);
      const data = await response.json();
      const customerData = data.find(customer => customer.user_id === parseInt(id));

      if (customerData) {
        setCustomerId(customerData.customer_id);
        // Fetch cart data for the customer
        const cartResponse = await fetch(`http://localhost:5000/api/carts/${customerData.customer_id}`);
        const cartData = await cartResponse.json();

        const productPromises = cartData.map(async (cart) => {
          const productResponse = await fetch(`http://localhost:5000/api/products/${cart.product_id}`);
          const productData = await productResponse.json();
          const productInfo = productData;

          return {
            productId: cart.product_id,
            name: productInfo.product_name,
            price: Number(productInfo.product_price),
            quantity: Number(cart.cart_quantity),
            image: productInfo.product_image,
          };
        });

        const completeCartData = await Promise.all(productPromises);
        setCartData(completeCartData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };



  // const fetchCartUser = (id) => {
  //   if (!id) {
  //     console.log("Không có user");
  //     return;
  //   }

  //   axios.get(`http://localhost:5000/api/carts/` + id)
  //     .then((res) => {
  //       setUserCart(res.data);
  //       console.log(res.data);
  //       return
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchManufacturers = () => {
    axios
      .get("http://localhost:5000/api/suppliers")
      .then((res) => {
        setManufacturers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCarts = () => {
    axios
      .get("http://localhost:5000/api/carts/")
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const fetchShop = () => {
  //   axios
  //     .get("http://localhost/be-shopbangiay/api/shop.php")
  //     .then((res) => {
  //       setShop(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const fetchBanners = () => {
    axios
      .get("http://localhost:5000/api/banners")
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchOrders();
    fetchManufacturers();
    fetchCarts();
    // fetchShop();
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!id) {
      console.log("User is not logged in. Redirecting to login.");
      return;
    }
    fetchCustomerId()
    fetchCartData();
    fetchUserInfo(id)
  }, [id]);

  return (
    <DataContexts.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        categories,
        setCategories,
        fetchCategories,
        users,
        setUsers,
        fetchUsers,
        orders,
        setOrders,
        fetchOrders,
        manufacturers,
        setManufacturers,
        fetchManufacturers,
        carts,
        setCarts,
        fetchCarts,
        banners,
        setBanners,
        fetchBanners,
        cartData,
        fetchCartData,
        customerId,
        fetchCustomerId,
        userInfo,
        setUserInfo,
        fetchUserInfo
      }}
    >
      {children}
    </DataContexts.Provider>
  );
};
