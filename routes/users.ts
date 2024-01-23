import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from user', function(err, data) {
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

// Get user by userID
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        
        await DB.executeSQL('select * from user where userID=' + userID.toString() + ';', function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else if(!data) {
                res.send("No user with specified userID exists!");
            } 
            else {
                res.send(data);
            }
        });
    } catch(e) {
        next(e);
    }
});

// Add a new user (aka user sign up)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, username, emailAddress, phoneNum, password } = req.body;

        const sp = "SP_InsertUser";

        await DB.executeStoredProcedure(sp, { firstName, lastName, username, emailAddress, phoneNum, password }, function(err, data) {
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

// Update a specific user record
router.post('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const { firstName, lastName, username, emailAddress, phoneNum, password } = req.body;

        const sp = "SP_UpdateUser";

        await DB.executeStoredProcedure(sp, { userID, firstName, lastName, username, emailAddress, phoneNum, password }, function(err, data) {
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

// Delete a user (aka delete account indefinitely)
router.delete('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const sp = "SP_DeleteUser";

        await DB.executeStoredProcedure(sp, { userID }, function(err, data) {
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