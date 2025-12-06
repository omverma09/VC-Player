import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";  

import { createServer } from "node:http";  // for socket server
import { Server } from "node:http";
import { connect } from "node:http2";

import {connectToSocket} from "./controllers/socketManager.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true }));

//Apis likh rhai hai.
app.use("/api/v1/users", userRoutes);



const start = async () => {
    const connectDB = mongoose.connect("mongodb+srv://omver9644_db_user:rgHWEuuETiI05RLy@videocallapp.nftz9nf.mongodb.net/?retryWrites=true&w=majority&appName=VideocallApp");
    
    server.listen(app.get("port"), () => {
        console.log("App is listening in port 8000..")
    });
    console.log(`connecte to host : ${(await connectDB).connection.host}`);
}

start();