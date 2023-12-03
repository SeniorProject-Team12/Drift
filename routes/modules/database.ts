import mysql from'mysql';
const configs = require('./db.config.json');

class Database {
    con: any;
    output: any;

    async makeConnection() {
        console.log
        this.con = mysql.createConnection({
            host: "localhost",
            database: "drift",
            user: "sqluser",
            password: "Sqlrocks01!"
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

        for(const key in params) {
            if(params[key] == params[Object.keys(params)[Object.keys(params).length - 1]]) {
                // if param is equal to the last object in params
                procedure += "'" + params[key] + "')";
            } else {
                procedure += "'" + params[key] + "',";
            }
        }

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