// routes/items.ts

import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();
// var cors = require('cors');
// var corsOptions = { origin: "http://localhost:3000/", methods: ["POST, GET, DELETE"], credentials: true };
// Get all items
router.get('/getAllItems', async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting all items")
  req.setTimeout(30000)
//   var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "sqluser",
//   password: "Sqlrocks01!"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });
 
  // try{
   
  //   const configConn = {
  //     host: "localhost",
  //     database: "drift",
  //     user: "sqluser",
  //     password: "Sqlrocks01!"
  //   }
  //   await DB.makeConnection().then(() => res.send("testing"))
  //   } catch (e) {
  //   console.log(e)
  // }
  try {
    await DB.executeSQL('SELECT * FROM items', function(err: any, data: any) {
      if (err) {
        console.log("ERROR: ", err);
        res.send("Error getting all items");
      } else {
        res.send(data);
      }
    });
  } catch (e) {
    next(e);
  }
});
router.get('/test', (req, res) => {
console.log('hi') 
res.send('Test route')});


// Get items by keyword
router.get('/getItemsByKeyWord', async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting items by keyword")
  req.setTimeout(10000)
  try {
    const keyword = req.query.keyword; // Get the keyword from the query string

    // Check if a keyword is provided, and construct the SQL query accordingly
    let sqlQuery = 'SELECT * FROM items WHERE ';
    const sqlParams: any[] = [];

    if (keyword) {
      const columnsToSearch = ['name', 'description', 'brand', 'color'];
      const conditions = columnsToSearch.map(column => `${column} LIKE '%${keyword}%'`).join(' OR ');
      
      sqlQuery += conditions;
    }

    // Execute the SQL query with parameters
      await DB.executeSQL(sqlQuery, function(err: any, data: any){
        if (err) {
          console.log("ERROR: ", err);
          res.send("Error getting items by keyword");
        } else {
          res.send(data)
        }
      });
    } catch (e) {
      next(e);
    }
});

// Add a new item
router.post('/addNewItem', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quality, brand, color, hashtags, category, userID, photoURL, size } = req.body;

    const sp = "SP_InsertItem"; // Adjust the stored procedure name

    await DB.executeStoredProcedure(sp, { name, description, price, quality, brand, color, hashtags, category, userID, photoURL, size }, function(err, data) {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res.send(data);
      }
    });
  } catch (e) {
    next(e);
  }
});


// Update existing item
router.post('/updateItem/id/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemID = req.params.id;
    const { name, description, price, quality, brand, color, hashtags, category, userID, photoURL, size } = req.body;

    const sp = "SP_UpdateItem";

    await DB.executeStoredProcedure(sp, { itemID, name, description, price, quality, brand, color, hashtags, category, userID, photoURL, size }, function(err, data) {
      if(err) {
          console.log("ERROR: ", err);
      } else {
          res.send(data);
      }
    });
  } catch(e) {
    next(e);
  }
});

// Delete item
router.delete('/deleteItem/id/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemIDtoDelete = req.params.id;
    
    const sp = "SP_DeleteItem";

    await DB.executeStoredProcedure(sp, { itemIDtoDelete }, function(err, data) {
      if(err) {
        console.log("Error: ", err);
      } else {
        res.send(data);
      }
    });
  } catch(e) {
    next(e);
  }
});