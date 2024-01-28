import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all saved item records
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from saved_items;', function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else {
                // console.log(data);   
                res.send(data);
            }
        }); 
    } catch(e) {
        next(e);
    }
});

// Get saved items by userID
router.get('/getSavedItem/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedItemID = req.params.id;

        await DB.executeSQL('select * from saved_items where savedItemID = ' + savedItemID, function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else {
                // console.log(data);   
                res.send(data);
            }
        }); 
    } catch(e) {
        next(e);
    }
});

// Insert saved item
router.post('/insertSavedItem', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, itemID, userID } = req.body;

        const sp = "SP_InsertSavedItem";

        await DB.executeStoredProcedure(sp, { name, itemID, userID }, function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else {
                // console.log(data);   
                res.send(data);
            }
        });
    } catch(e) {
        next(e);
    }
});

// Update saved item -- is this needed??
router.post('/updateSavedItem/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedItemID = req.params.id;
        const { name, itemID, userID } = req.body;

        const sp = "SP_UpdateSavedItem";

        await DB.executeStoredProcedure(sp, { savedItemID, name, itemID, userID }, function(err, data) {
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

// Delete saved item
router.delete('/deleteSavedItem/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedItemID = req.params.id;
        const sp = "SP_DeleteSavedItem";

        await DB.executeStoredProcedure(sp, { savedItemID }, function(err, data) {
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