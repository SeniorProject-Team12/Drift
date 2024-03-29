import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all saved folder records
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from saved_folders;', function(err, data) {
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

// Get saved folders by userID
router.get('/getSavedFolder/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedFolderID = req.params.id;

        await DB.executeSQL('select * from saved_folders where savedFolderID = ' + savedFolderID, function(err, data) {
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

// Insert saved folder
router.post('/insertSavedFolder', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, folderName, photoURL, items } = req.body;

        const sp = "SP_InsertSavedFolder";

        await DB.executeStoredProcedure(sp, { userID, folderName, photoURL, items }, function(err, data) {
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

// Update saved folder
router.post('/updateSavedFolder/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedFolderID = req.params.id;
        const { userID, folderName, photoURL, items } = req.body;

        const sp = "SP_UpdateSavedFolder";

        await DB.executeStoredProcedure(sp, { savedFolderID, userID, folderName, photoURL, items }, function(err, data) {
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

// Delete saved folder
router.delete('/deleteSavedFolder/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedFolderID = req.params.id;
        const sp = "SP_DeleteSavedFolder";

        await DB.executeStoredProcedure(sp, { savedFolderID }, function(err, data) {
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