import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

const { createHash } = require('crypto');

// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from user;', function(err, data) {
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

// Get user by username and password
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        console.log("IN API login w/ ", username, password);

        const query = 'select * from user where username = \'' + username + '\''; // and password = \'' + encryptedPassword + '\'';
        console.log(query);

        const hashedPass = createHash('sha256').update(password).digest('hex');

        await DB.executeSQL(query, async function(err: any, data: any) {
            console.log("Hashed pass - ", hashedPass);

            if(err) {
                // req.setEncoding({err: err});
                console.log("ERROR: ", err);
                res.send("Error logging in!");
            }
            else if(!data){
                res.send("Error logging in!");
            }
            else if(hashedPass != data[0].password) {
                res.send("Wrong password found in API!");
            } 
            else {
                 
                console.log(data, data[0].password);
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
                } else {
                    res.send(null);
                }
            }                 
        });
    } catch(e) {
        next(e);
    }
});

// Add a new user (aka user sign up)
router.post('/signUp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, username, emailAddress, phoneNum, password } = req.body;
        const sp = "SP_InsertUser";

        const encryptedPassword = createHash('sha256').update(password).digest('hex');

        await DB.executeStoredProcedure(sp, { firstName, lastName, username, emailAddress, phoneNum, encryptedPassword }, function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
                res.send("ERROR: please enter correct sign up details.");
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
router.delete('/deleteUser/id/:id', async (req: Request, res: Response, next: NextFunction) => {
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