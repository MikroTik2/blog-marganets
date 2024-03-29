const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config({ path: "./config/conf.env" });

const port = process.env.PORT || process.env.PORT_NODE;

const app = express();
const server = http.createServer(app);

const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogRoute.js");

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors({
     origin: "https://marganets-school.vercel.app",
     credentials: true,
}));


const dbConnect = () => {
     try {

          const conn = mongoose.connect("mongodb+srv://sdfsdgweg2sdgf:OL1WCD74oiOgDJfX@cluster0.dreg8j0.mongodb.net/app");
          console.log("connecting.")

     } catch (err) {
          console.log("error.");
     };
};

dbConnect()

app.get("/", (req, res) => {
     res.send("Hello world");
});

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});
     
app.use("/api/v2", userRoute);
app.use("/api/v2", blogRoute);

// function onError(error) {
//      switch (error.code) {
//           case 'EACCES':
//                console.log('Port ' + error.port + ' requires elevated privileges');
//                process.exit(1);
//                break;

//           case 'EADDRINUSE':
//                console.log('Port ' + error.port + ' is already in use');
//                process.exit(1);
//                break;

//           default:
//                console.log('An error occurred: ' + error.code);
//                process.exit(1);
//      };
// };
               
// function onListening() {
//      console.log('HTTP server listening on port ' + port);
// };

server.listen(port, () => {
     console.log(`Server working on the ${port}`);
});