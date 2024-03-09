"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import Database from "./routes/modules/database";
const users_1 = require("./routes/users");
const items_1 = require("./routes/items");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
var corsOptions = { origin: "http://localhost:3000/" };
app.use((0, cors_1.default)(corsOptions));
// var cors = require('cors');
// app.use(cors());
app.use(body_parser_1.default.json());
// use routes
app.use('/', index_1.router);
app.use("/user", users_1.router);
app.use("/items", items_1.router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
