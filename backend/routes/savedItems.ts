import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get saved items from saverFolderID
router.get('/getSavedItems/savedFolderID/:savedFolderID', async (req: Request, res: Response, next: NextFunction) => {
    console.log("route getSavedItems")
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


//add saved items
router.post('/addSavedItem', async (req, res, next) => {
    console.log("Adding saved item");
    try {
        const { itemID, savedFolderIDs } = req.body;
        await DB.executeSQL(
            `CALL saveItemToFolders(${itemID}, "${savedFolderIDs}");`,
            async (err, results) => {
                if(err) {
                    console.log("ERROR: ", err);
                    res.status(500).send("Error adding saved item");
                } else {
                    res.status(201).send(results);
                }
            }
        ); 
    } catch(e) {
        console.error("Exception in adding saved items: ", e);
        next(e);
    }
});

//add saved items
router.post('/deleteSavedItem', async (req, res, next) => {
    console.log("deleting saved item");
    try {
        const { userID, savedFolderIDs, itemID } = req.body;
        await DB.executeSQL(
            `CALL deleteSavedItem(${userID}, ${savedFolderIDs}, ${itemID});`,
            async (err, results) => {
                if(err) {
                    console.log("ERROR: ", err);
                    res.status(500).send("Error deleting saved item");
                } else {
                    res.status(201).send(results);
                }
            }
        ); 
    } catch(e) {
        console.error("Exception in deleting saved items: ", e);
        next(e);
    }
});

//check if item is saved
router.get('/isSaved/userID/:userID/itemID/:itemID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID
        const itemID = req.params.itemID

        await DB.executeSQL(`CALL isSaved(${userID}, ${itemID});`, function(err, data) {
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

