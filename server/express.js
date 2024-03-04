const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const log = require("./models/log.js");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const http = require("http");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config({ path: "config/conf.env" });

const port = process.env.PORT || process.env.PORT_NODE;

const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogRoute.js");

const app = express();
const server = http.createServer(app);

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

mongoose.connect(process.env.MONGO_URL).then(() => {
     
     log.info("Successfully connected to the database");
     server.listen(port);
 
     server.on('error', onError);
     server.on('listening', onListening);

}).catch(err => {
     log.error("An error occurred while connecting to the database: " + err);
     process.exit(1);
});

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v2", userRoute);
app.use("/api/v2", blogRoute);

// Handle errors for both servers
function onError(error) {
     switch (error.code) {
          case 'EACCES':
               log.error('Port ' + error.port + ' requires elevated privileges');
               process.exit(1);
               break;

          case 'EADDRINUSE':
               log.error('Port ' + error.port + ' is already in use');
               process.exit(1);
               break;
               
          default:
               log.error('An error occurred: ' + error.code);
               process.exit(1);
     };
};

// Log listening events for both servers
function onListening() {
     log.info('HTTP server listening on port ' + port);
}