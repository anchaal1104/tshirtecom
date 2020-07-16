require('dotenv').config();

const mongoose = require ("mongoose");
const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//myroutes
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes = require("./routes/product.js")
const orderRoutes = require("./routes/order.js")
const stripeRoutes = require("./routes/stripepayment");

//dbcon
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB CONNECTED")
});
//middlewarres
app.use(bodyParser.json());       
app.use(cookieParser());      
app.use(cors());                
//routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api", stripeRoutes);



 //port
const port = process.env.PORT || 9000;
 //server strt
app.listen(port,() => {
    console.log(`app is running at ${port}`);
})