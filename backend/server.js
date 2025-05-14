import express from "express";
import 'dotenv/config';


import authRoutes from "./routes/authroutes.js";
import {connectDB} from "./lib/db.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoutes);

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);

    connectDB();
})