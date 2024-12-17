// // server.js

const express = require('express');
const cors = require('cors');



const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes'); // Import các tuyến API
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes')
const discountRoutes = require('./routes/discountRoutes')
const bannerRoutes = require('./routes/bannerRoutes')
const searchProductRoutes = require('./routes/searchProductRoutes');
const searchOrderRoutes = require('./routes/searchOrderRoutes');
const loginRoutes = require('./routes/loginRoutes');
const forgotPassRoutes = require('./routes/forgotPassRoutes');
const confirmPassRoutes = require('./routes/confirmPassRoutes');
const momoRoutes = require('./routes/momoRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);
app.use('/api', customerRoutes);
app.use('/api', adminRoutes);
app.use('/api', supplierRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes); // Tất cả các route sẽ bắt đầu với /api
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', discountRoutes);
app.use('/api', bannerRoutes);
app.use('/api', searchProductRoutes);
app.use('/api', searchOrderRoutes);
app.use('/api', loginRoutes);
app.use('/api', forgotPassRoutes)
app.use('/api', confirmPassRoutes)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', momoRoutes);





const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
