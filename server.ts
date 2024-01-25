import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
import mysql from 'mysql';
// import Database from "./routes/modules/database";

import { router as userRouter } from './routes/users';
import { router as itemRouter } from './routes/items';
import { router as indexRouter } from './routes/index';

const app = express();

const PORT = process.env.PORT || 3000;
var corsOptions = { origin: "http://localhost:3000/", methods: ["POST, GET, DELETE"], credentials: true };

app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json());

// use routes
app.use('/', indexRouter);
app.use("/user", userRouter);
app.use("/items", itemRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});