const express = require("express");
const connectDB= require('./src/config/db');
require("dotenv").config();
const cors = require("cors");
const redis = require("redis");
const faqRoutes = require("./src/routes/faqRoutes");
const { connectRedis } = require("./src/config/redis");
//const { createFAQ, getFAQs } = require("./src/controllers/faqController");

const app = express();
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


 connectRedis();
app.use("/api/faqs", faqRoutes);

// Start the server
app.listen(process.env.PORT, ()=>{
  console.log(`server is running on port ${process.env.PORT}`);
})