import e from 'cors';
import mysql from'mysql';
const configs = require('./db.config.json');

class Database {
    con: any;
    output: any;

    async makeConnection() {
        console.log
        this.con = mysql.createConnection({
            host: configs.development.host,
            database: configs.development.database,
            user: configs.development.username,
            password: configs.development.password
        });

        this.con.connect(async(err) => {
            if(err) throw err;
            console.log("Connected to mySQL database!");
        });
    }

    executeSQL(query, callback) {
        
        this.makeConnection();
        (this.con).query(query, (err, result) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);                
            }

        });
    }

    executeStoredProcedure(sp, params, callback) {
        this.makeConnection();

        // construct sp query w/ procedure name and params
        let procedure = "CALL " + sp + "(";
        let i = 0;
        for(const key in params) {
            // console.log(params[key]);
            if(isNaN(params[key])) {
                procedure += "'" + params[key] + "'";
            } else if(params[key] == '') {
                procedure += "null";
            } else {
                procedure += params[key];
            }
            i++;

            if(i != Object.keys(params).length){
                // if param is equal to the last object in params
                procedure += ", ";
            }
        }
        i = 0;
        procedure += ")";

        console.log(procedure);
        (this.con).query(procedure, (err, result) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);                
            }
        });
    }
}

export default Database;