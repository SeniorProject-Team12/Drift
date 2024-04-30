import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';
const axios = require('axios');



export const router = Router();

// Get all saved folder records
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from saved_folders;', function(err, data) {
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

// Get saved folders by userID
router.get('/getSavedFolders/userID/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID

        await DB.executeSQL('select * from saved_folders where userID = ' + userID, function(err, data) {
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

router.delete('/deleteSavedFolder/:folderID', async (req, res) => {
    const { folderID } = req.params;
    console.log(`CALL SP_DeleteSavedFolder(${folderID})`)
    try {
      console.log("deleting folder")
      await DB.executeSQL(`CALL SP_DeleteSavedFolder(${folderID})`, function(err: any, data: any) {
        if (err) {
          console.log("ERROR: ", err);
          res.send("Error deleting folder");
        }
      })
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).send("Error processing your request");
    }
  });

// add saved folder
router.post('/addSavedFolder', async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { userID, folderName } = req.body;

        await DB.executeSQL(
            `INSERT INTO saved_folders (userID, folderName) VALUES (${userID}, "${folderName}");`,
            async (err, results) => {
                if(err) {
                    res.status(500).send("Error adding saved folder");
                } else {
                    res.status(201).send(results);
                }
            }
        ); 
    } catch(e) {
        console.error("Exception in adding saved folder ", e);
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