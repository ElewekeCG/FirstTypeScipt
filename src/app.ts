import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {connectToDatabase } from "./db/connect";

// import jwt from "jsonwebtoken";

// console.log(token);
const app = express();

// import swagger ui
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "tsoa.json";

// serve swagger ui
app.use(
    ["/openapi", "/docs", "/swagger", "/swagger/v1/swagger.json"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
);

// serve swagger JSON
app.get("/swagger.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(__dirname + "/tsoa/tsoa.json");
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if(!mongoUri) {
            throw new Error("MONGO_URI is missing in .env file");
        }
        console.log("connecting to database...");
        await connectToDatabase(mongoUri);
        console.log("connected to database");
        console.log("starting srver...");
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
