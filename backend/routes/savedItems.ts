import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';
const axios = require('axios');



export const router = Router();

// Get saved items from saverFolderID
router.get('/getSavedItems/savedFolderID/:savedFolderID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedFolderID = req.params.savedFolderID;

        await DB.executeSQL('select itemID from saved_items where savedFolderID = ' + savedFolderID, function(err, data) {
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