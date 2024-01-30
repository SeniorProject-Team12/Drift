import bodyParser from "body-parser";
import express from 'express';
import mysql from 'mysql';
// import Database from "./routes/modules/database";

import { router as userRouter } from './routes/users';
import { router as itemRouter } from './routes/items';
import { router as indexRouter } from './routes/index';
import { router as orderRouter } from './routes/orders';
import { router as savedItemRouter } from './routes/savedItems';
import { router as paymentRouter } from './routes/payment';

const app = express();

const PORT = process.env.PORT || 3000;

// var corsOptions = { origin: "http://localhost:3000/", methods: ["POST, GET, DELETE"], credentials: true };

var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// use routes
app.use('/', indexRouter);
app.use("/user", userRouter);
app.use("/items", itemRouter);
app.use("/order", orderRouter);
app.use("/savedItem", savedItemRouter);
app.use("/payments", paymentRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});