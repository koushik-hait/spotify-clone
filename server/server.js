const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors')
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/users");
const songRoutes = require("./routes/songs");
const playListRoutes = require("./routes/playlist");


//connecting to database 
connectDB();

const app = express();

//Enable All CORS Requests
app.use(cors({
  origin: ['http://localhost:3000/', 'http://localhost:3000'],
  methods: ["GET,PUT,POST,DELETE"],
  credentials: true
}));


//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookies and file middleware
app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

//All routes included
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/songs/", songRoutes);
app.use("/api/v1/playlists/", playListRoutes);


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  
  app.use(errorHandler);
  
  app.listen(port, () => console.log(`Server started on port ${port}`));