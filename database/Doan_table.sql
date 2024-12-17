
-- Bảng users
CREATE TABLE users (
    user_id SERIAL,
    user_login_name VARCHAR(100),
    user_password VARCHAR(100),
    user_name VARCHAR(100),
    user_birth DATE,
    user_sex VARCHAR(10) CHECK (user_sex IN ('Nữ', 'Nam')),
    user_email VARCHAR(100),
    user_phone CHAR(10),
    user_address VARCHAR(255),
    user_register_date DATE DEFAULT CURRENT_DATE,
    status INT CHECK (status IN (0,1)) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng admins
CREATE TABLE admins (
    admin_id SERIAL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT
);

-- Bảng customers
CREATE TABLE customers (
    customer_id SERIAL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT
);

-- Bảng suppliers
CREATE TABLE suppliers (
    supplier_id SERIAL,
    supplier_name VARCHAR(100),
    supplier_logo VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng categories
CREATE TABLE categories (
    category_id SERIAL,
    category_name VARCHAR(100),
    category_img VARCHAR(100),
    category_type VARCHAR(50),
    category_added_date DATE DEFAULT CURRENT_DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng products
CREATE TABLE products (
    product_id SERIAL,
    product_code INT NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    product_name VARCHAR(100),
    product_rate FLOAT,
    product_description TEXT,
    product_price FLOAT,
    product_price_sale FLOAT,
    product_image VARCHAR(300),
    status INT CHECK (status IN (-1, 0, 1, 2)),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT,
    supplier_id INT,
	discount_id INT
);


-- Bảng product_details
CREATE TABLE product_details (
    detail_id SERIAL,                 
    product_id INT,                      
    key_name VARCHAR(100) ,              
    key_value VARCHAR(255),             
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng paying_methods
CREATE TABLE paying_methods (
    paying_method_id SERIAL,
    paying_method_name VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng carts
CREATE TABLE carts (
    customer_id INT,
    product_id INT,
    cart_quantity INT,
	cart_total DECIMAL(10, 2),
    cart_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng orders
CREATE TABLE orders (
    order_id SERIAL,
    order_name VARCHAR(100),
    order_phone VARCHAR(10),
    order_date DATE DEFAULT CURRENT_DATE,
    order_delivery_date DATE,
    order_delivery_address VARCHAR(100),
    order_total INT DEFAULT 0,
    order_paying_date DATE,
    order_is_paid BOOLEAN,
    order_status VARCHAR(50) DEFAULT 'Chờ thanh toán' CHECK (order_status IN ('Chờ thanh toán', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id INT,
    paying_method_id INT
);

-- Bảng order_details
CREATE TABLE order_details (
    order_id INT,
    product_id INT,
    order_detail_quantity INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng feedbacks
CREATE TABLE feedbacks (
    feedback_id SERIAL,
    feedback_date DATE DEFAULT CURRENT_DATE,
    feedback_rate INT DEFAULT 5,
    feedback_content TEXT DEFAULT 'Bạn chưa để lại lời nhận xét nào',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_id INT,
    customer_id INT,
    order_id INT
);

-- Bảng discounts
CREATE TABLE discounts (
    discount_id SERIAL,
    discount_name VARCHAR(100),
    discount_description TEXT,
    discount_start_date DATE DEFAULT CURRENT_DATE,
    discount_end_date DATE DEFAULT CURRENT_DATE,
    discount_amount FLOAT,
    discount_img VARCHAR(300),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bảng banner
CREATE TABLE banners (
    banner_id SERIAL,
    banner_name VARCHAR(100),
    banner_description TEXT,
    banner_img VARCHAR(300)
);


-- Bảng blog
CREATE TABLE blogs (
    blog_id SERIAL,
    blog_name VARCHAR(100),
    blog_description TEXT,
    blog_img VARCHAR(300),
	blog_date DATE DEFAULT CURRENT_DATE,
	blog_author VARCHAR(100)
);


-- Bảng forgetpassword
CREATE TABLE forgetpassword (
  forgetPasswordId SERIAL,
  email varchar(100) NOT NULL,
  code varchar(100) NOT NULL
) 

-- Bảng productotherimage
CREATE TABLE productotherimage (
  productOtherImageId SERIAL,
  productId int NOT NULL,
  link varchar(300) NOT NULL
)


-- Constraint
ALTER TABLE users
ADD CONSTRAINT PK_users PRIMARY KEY (user_id);

ALTER TABLE admins
ADD CONSTRAINT PK_admins PRIMARY KEY (admin_id);

ALTER TABLE admins
ADD CONSTRAINT FK_admins_users FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE customers
ADD CONSTRAINT PK_customers PRIMARY KEY (customer_id);

ALTER TABLE customers
ADD CONSTRAINT FK_customers_users FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE suppliers
ADD CONSTRAINT PK_suppliers PRIMARY KEY (supplier_id);

ALTER TABLE categories
ADD CONSTRAINT PK_categories PRIMARY KEY (category_id);

ALTER TABLE products
ADD CONSTRAINT PK_products PRIMARY KEY (product_id);

ALTER TABLE products
ADD CONSTRAINT FK_products_categories FOREIGN KEY (category_id) REFERENCES categories(category_id);

ALTER TABLE products
ADD CONSTRAINT FK_products_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);

ALTER TABLE products
ADD CONSTRAINT FK_products_discounts FOREIGN KEY (discount_id) REFERENCES discounts(discount_id);

ALTER TABLE product_details
ADD CONSTRAINT PK_product_detail PRIMARY KEY (detail_id);

ALTER TABLE product_details
ADD CONSTRAINT FK_product_details_products FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE paying_methods
ADD CONSTRAINT PK_paying_methods PRIMARY KEY (paying_method_id);

ALTER TABLE carts
ADD CONSTRAINT PK_carts PRIMARY KEY (customer_id, product_id);

ALTER TABLE carts
ADD CONSTRAINT FK_carts_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

ALTER TABLE carts
ADD CONSTRAINT FK_carts_products FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE orders
ADD CONSTRAINT PK_orders PRIMARY KEY (order_id);

ALTER TABLE orders
ADD CONSTRAINT FK_orders_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

ALTER TABLE orders
ADD CONSTRAINT FK_orders_paying_methods FOREIGN KEY (paying_method_id) REFERENCES paying_methods(paying_method_id);

ALTER TABLE order_details
ADD CONSTRAINT PK_order_details PRIMARY KEY (order_id, product_id);

ALTER TABLE order_details
ADD CONSTRAINT FK_order_details_orders FOREIGN KEY (order_id) REFERENCES orders(order_id);

ALTER TABLE order_details
ADD CONSTRAINT FK_order_details_products FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE feedbacks
ADD CONSTRAINT PK_feedbacks PRIMARY KEY (feedback_id);

ALTER TABLE feedbacks
ADD CONSTRAINT FK_feedbacks_products FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE feedbacks
ADD CONSTRAINT FK_feedbacks_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

ALTER TABLE feedbacks
ADD CONSTRAINT FK_feedbacks_orders FOREIGN KEY (order_id) REFERENCES orders(order_id);

ALTER TABLE discounts
ADD CONSTRAINT PK_discounts PRIMARY KEY (discount_id);

ALTER TABLE banners
ADD CONSTRAINT PK_banner PRIMARY KEY (banner_id);

ALTER TABLE blogs
ADD CONSTRAINT PK_blog PRIMARY KEY (blog_id);

ALTER TABLE forgetpassword
ADD CONSTRAINT PK_forgetpassword PRIMARY KEY (forgetPasswordId);

ALTER TABLE productotherimage
ADD CONSTRAINT PK_productotherimage PRIMARY KEY (productOtherImageId);

ALTER TABLE productotherimage
ADD CONSTRAINT FK_productotherimage_product FOREIGN KEY (productId) REFERENCES products(product_id);





