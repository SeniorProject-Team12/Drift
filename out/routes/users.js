"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const db_1 = require("./modules/db");
exports.router = (0, express_1.Router)();
// Get all users
exports.router.get('/', async (req, res, next) => {
    try {
        await db_1.DB.executeSQL('select * from user', function (err, data) {
            if (err) {
                console.log("ERROR: ", err);
            }
            else {
                // console.log(data);   
                res.send(data);
            }
        });
    }
    catch (e) {
        next(e);
    }
});
// Get user by userID
exports.router.get("/id/:id", async (req, res, next) => {
    try {
        const userID = req.params.id;
        await db_1.DB.executeSQL('select * from ', function (err, data) {
            if (err) {
                console.log("ERROR: ", err);
            }
            else if (!data) {
                res.send("No user with specified userID exists!");
            }
            else {
                res.send(data);
            }
        });
    }
    catch (e) {
        next(e);
    }
});
// Add a new user (aka user sign up)
exports.router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, username, emailAddress, phoneNum, password } = req.body;
        const sp = "SP_InsertUser";
        await db_1.DB.executeStoredProcedure(sp, { firstName, lastName, username, emailAddress, phoneNum, password }, function (err, data) {
            if (err) {
                console.log("ERROR: ", err);
            }
            else {
                // console.log(data);   
                res.send(data);
            }
        });
    }
    catch (e) {
        next(e);
    }
});
// Update a specific user record
exports.router.post('/id/:id', async (req, res, next) => {
    try {
        const userID = req.params.id;
        const { firstName, lastName, username, emailAddress, phoneNum, password } = req.body;
        const sp = "SP_UpdateUser";
        await db_1.DB.executeStoredProcedure(sp, { userID, firstName, lastName, username, emailAddress, phoneNum, password }, function (err, data) {
            if (err) {
                console.log("ERROR: ", err);
            }
            else {
                res.send(data);
            }
        });
    }
    catch (e) {
        next(e);
    }
});
// Delete a user (aka delete account indefinitely)
exports.router.delete('/id/:id', async (req, res, next) => {
    try {
        const userID = req.params.id;
    }
    catch (e) {
        next(e);
    }
});
