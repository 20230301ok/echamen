import mongoose from "mongoose";
import { config } from "../backend/config.js";

mongoose.connect(config.db.uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected");
});

connection.on("disconnected", () => {
    console.log("DB disconnected");
});

connection.on("error", (error) => {
    console.log("Error found", error);
});