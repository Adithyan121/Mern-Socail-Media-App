import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import dbConnect from './config/dbconfig.js';
import { storage } from "./middleware/storage.js";



/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));





const upload = multer({ storage });
// const upload = multer({storage: storage});


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
const PORT = process.env.PORT || 5000; // Use the environment variable or port 5000 as default



// Listen to the server
app.listen(PORT, () => {
  console.log(`Server connected at port:${PORT}`);


  // ADD random DATAs (ONE TIME ONLY) 
    // User.insertMany(users)
    //     .then(() => {
    //         console.log('Initial user data inserted successfully');
    //     })
    //     .catch((error) => {
    //         console.error('Error inserting initial user data:', error);
    //     });
    // Post.insertMany(posts)
    //     .then(() => {
    //         console.log('Initial posts data inserted successfully');
    //     })
    //     .catch((error) => {
    //         console.error('Error inserting initial posts data:', error);
        
    //     });
  //   users.forEach(user => {
  //     user.password = bcrypt.hashSync("$2a$12$CTnMjf2DQzZ/07Uc7z7WAeV3FyRUl2MGsUUi1JZDWtgtUWUmTd4Um", 12);
  // });



});

// Root route
app.post('/', (req, res) => {
  res.send('connected');
});

  
