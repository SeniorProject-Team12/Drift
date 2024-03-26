import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';
const axios = require('axios');



export const router = Router();

// Get saved items from saverFolderID
router.get('/getSavedItems/savedFolderID/:savedFolderID', async (req: Request, res: Response, next: NextFunction) => {
    console.log("savedItems")
    try {
        const savedFolderID = req.params.savedFolderID;
        console.log("savedFolderID", savedFolderID)
        await DB.executeSQL('SELECT itemID FROM saved_items WHERE savedFolderID = '+ savedFolderID, async function(err, itemIDs) {
            if(err) {
                console.log("ERROR: ", err);
                res.send("Error fetching itemIDs");
            } else {
                const ids = itemIDs.map(row => row.itemID);
                
                if(ids.length === 0) {
                    res.send([]); 
                    return;
                }

                const placeholders = ids.map(() => ids).join(', '); 
                const itemsQuery = `SELECT * FROM items WHERE itemID IN (${placeholders})`;

                await DB.executeSQL(itemsQuery, function(err, items) {
                    if(err) {
                        console.log("ERROR: ", err);
                        res.send("Error fetching items");
                    } else {
                        res.send(items);
                    }
                });
            }
        }); 
    } catch(e) {
        next(e);
    }
});
