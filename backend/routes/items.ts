// routes/items.ts

import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

router.get('/getAllItems', async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting all items")
  req.setTimeout(30000)

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

router.get('/getItems/itemID/:itemID', async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting item by itemID")
  req.setTimeout(10000)
  try {
    const itemID = req.query.itemID;

    let sqlQuery = 'SELECT * FROM items WHERE itemID = ' + itemID;

      await DB.executeSQL(sqlQuery, function(err: any, data: any){
        if (err) {
          console.log("ERROR: ", err);
          res.send("Error getting items by itemID");
        } else {
          res.send(data)
        }
      });
    } catch (e) {
      next(e);
    }
});

router.get('/getItems/userID/:userID', async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting items by userID")
  req.setTimeout(10000)
  try {
    const userID = req.query.userID;

    let sqlQuery = 'SELECT * FROM items WHERE userID = ' + userID;

      await DB.executeSQL(sqlQuery, function(err: any, data: any){
        if (err) {
          console.log("ERROR: ", err);
          res.send("Error getting items by userID");
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

export default router;