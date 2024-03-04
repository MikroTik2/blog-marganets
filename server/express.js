const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config({ path: "config/conf.env" });

const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogRoute.js");

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors({
     origin: "http://localhost:5173", 
     credentials: true, 
}));

app.use("/api/v2", userRoute);
app.use("/api/v2", blogRoute);

module.exports = app;