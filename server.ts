import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
// import Database from "./routes/modules/database";

import { router as userRouter } from './routes/users';
import { router as indexRouter } from './routes/index';

const app = express();

const PORT = process.env.PORT || 3000;
var corsOptions = { origin: "http://localhost:3000/" };


app.use(cors(corsOptions));
app.use(bodyParser.json());

// use routes
app.use('/', indexRouter);
app.use("/user", userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});