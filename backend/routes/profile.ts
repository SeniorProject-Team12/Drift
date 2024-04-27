import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';
const axios = require('axios');

export const router = Router();

// Get profile by userID
router.get('/getProfile/userID/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID

        await DB.executeSQL('select * from profile where userID = ' + userID, function(err, data) {
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

// Update profile bio
router.post('/updateBio', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userID, bio } = req.body;

        await DB.executeSQL(
            `UPDATE Profile SET bio = "${bio}" WHERE userID = ${userID};`,
            async (err, results) => {
                if(err) {
                    res.status(500).send("Error updating profile bio");
                } else {
                    res.status(201).send(results);
                }
            }
        );
    } catch(e) {
        next(e);
    }
});

// Update photo
router.post('/updatePhoto/userID/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID;
        const {photo} = req.body;

        await DB.executeSQL(
            `UPDATE Profile SET photo = "${photo}" WHERE userID = ${userID};`,
            async (err, results) => {
                if(err) {
                    res.status(500).send("Error updating profile photo");
                } else {
                    res.status(201).send(results);
                }
            }
        );
    } catch(e) {
        next(e);
    }
});