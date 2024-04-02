"use strict";
// routes/items.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const db_1 = require("./modules/db");
exports.router = (0, express_1.Router)();
// Get all items
exports.router.get('/getAllItems', async (req, res, next) => {
    try {
        await db_1.DB.executeSQL('SELECT * FROM items', function (err, data) {
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
exports.router.get('/getItemsByKeyWord', async (req, res, next) => {
    try {
        const keyword = req.query.keyword; // Get the keyword from the query string
        // Check if a keyword is provided, and construct the SQL query accordingly
        let sqlQuery = 'SELECT * FROM items WHERE';
        const sqlParams = [];
        if (keyword) {
            // Create conditions for each column to search for the keyword
            const columnsToSearch = ['name', 'description', 'brand', 'color'];
            const conditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
            sqlQuery += ` (${conditions})`;
            const keywordPattern = `%${keyword}%`; // Add wildcards to search for the keyword within the text
            for (const _ of columnsToSearch) {
                sqlParams.push(keywordPattern);
            }
        }
        // Execute the SQL query with parameters
        const result = await db_1.DB.executeSQL(sqlQuery, sqlParams);
        res.send(result);
    }
    catch (e) {
        next(e);
    }
});
// Add a new item
exports.router.post('/addNewItem', async (req, res, next) => {
    try {
        const { name, description, price, quality, brand, color, hashtags, category, sellerId, photoURL, size } = req.body;
        const sp = "SP_InsertItem"; // Adjust the stored procedure name
        await db_1.DB.executeStoredProcedure(sp, { name, description, price, quality, brand, color, hashtags, category, sellerId, photoURL, size }, function (err, data) {
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
