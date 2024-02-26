"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const configs = require('./db.config.json');
class Database {
    async makeConnection() {
        console.log;
        this.con = mysql_1.default.createConnection({
            // host: "localhost",
            // database: "drift",
            // user: "sqluser",
            // password: "Sqlrocks01!"
            // host: configs.development.host,
            // database: configs.development.database,
            // user: configs.development.username,
            // password: configs.development.password
            host: 'localhost',
            user: 'root',
            password: 'Nana7forever!',
            database: 'drift',
            port: 3306, // Default MySQL port
        });
        this.con.connect(async (err) => {
            if (err)
                throw err;
            console.log("Connected to mySQL database!");
        });
    }
    executeSQL(query, callback) {
        this.makeConnection();
        (this.con).query(query, (err, result) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }
    executeStoredProcedure(sp, params, callback) {
        this.makeConnection();
        // construct sp query w/ procedure name and params
        let procedure = "CALL " + sp + "(";
        for (const key in params) {
            if (isNaN(params[key])) {
                procedure += "'" + params[key] + "'";
            }
            else if (params[key] == '') {
                procedure += "null";
            }
            else {
                procedure += params[key];
            }
            if (params[key] != params[Object.keys(params)[Object.keys(params).length - 1]]) {
                // if param is equal to the last object in params
                procedure += ", ";
            }
        }
        procedure += ")";
        console.log(procedure);
        (this.con).query(procedure, (err, result) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}
exports.default = Database;
