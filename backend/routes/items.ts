// routes/items.ts

import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all items
router.get('/getAllItems', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DB.executeSQL('SELECT * FROM items', function(err, data) {
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

// Get items by keyword
router.get('/getItemsByKeyWord', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = req.query.keyword; // Get the keyword from the query string

    // Check if a keyword is provided, and construct the SQL query accordingly
    let sqlQuery = 'SELECT * FROM items WHERE';
    const sqlParams: any[] = [];

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
    const result = await DB.executeSQL(sqlQuery, sqlParams);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

// Add a new item
router.post('/addNewItem', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quality, brand, color, hashtags, category, sellerID, photoURL, size } = req.body;

    const sp = "SP_InsertItem"; // Adjust the stored procedure name

    await DB.executeStoredProcedure(sp, { name, description, price, quality, brand, color, hashtags, category, sellerID, photoURL, size }, function(err, data) {
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
    const { name, description, price, quality, brand, color, hashtags, category, sellerID, photoURL, size } = req.body;

    const sp = "SP_UpdateItem";

    await DB.executeStoredProcedure(sp, { itemID, name, description, price, quality, brand, color, hashtags, category, sellerID, photoURL, size }, function(err, data) {
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