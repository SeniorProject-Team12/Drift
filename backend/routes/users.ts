import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';
import { sendEmail } from './modules/email';

export const router = Router();

const { createHash } = require('crypto');

// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from users;', function(err, data) {
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

// Get user by userID
router.get('/getUser/userID/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID
        

        await DB.executeSQL(`SELECT * FROM users WHERE userID = ` + userID, function(err, data) {
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

// Get user by username and password
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const parsedUsername = (username.split(";"))[0];

        console.log("IN API login w/ ", username, password);

        const query = 'select * from users where username = \'' + parsedUsername + '\'';

        const hashedPass = createHash('sha256').update(password).digest('hex');
        // await DB.executeStoredProcedure("SP_Login", { parsedUsername }, async function(err: any, data: any) {
        //     console.log("Hashed pass - ", hashedPass);
        //     console.log("Data res - ", data);

        //     console.log("PASS - ", data[0][0].password);
        //     if(err) {
        //         console.log("ERROR: ", err);
        //         res.send("Error logging in!");
        //     }
        //     else if(!data || Object.keys(data).length == 0){
        //         res.send("Error logging in!");
        //     }
        //     else if(hashedPass != data[0][0].password) {
        //         res.send("Wrong password found in API!");
        //     } 
        //     else {
                
        //         console.log(data, data[0][0].password);
        //         if(data.length > 0){
        //             res.send(data[0]);
        //         } else {
        //             res.send(null);
        //         }
        //     }
        // });

        await DB.executeSQL(query, async function(err: any, data: any) {
            console.log("Hashed pass - ", hashedPass);
            console.log("Data res - ", data);
            if(err) {
                console.log("ERROR: ", err);
                res.send("Error logging in!");
            }
            else if(!data || Object.keys(data).length == 0){
                res.send("Error logging in!");
            }
            else if(hashedPass != data[0].password) {
                res.send("Wrong password found in API!");
            } 
            else {
                
                console.log(data, data[0].password);
                if(data.length > 0){
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

// Increase user's report count
router.post('/reportUser/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const sp = "SP_IncreaseUserReportCount";

        await DB.executeStoredProcedure(sp, { userID }, function(err: any, data: any) {
            if(err) {
                console.log("ERROR reporting in API: ", err);
            } else {
                res.send(data);
            }
        });
    } catch(e) {    
        next(e);
    }
});

// Reset password
router.post('/resetPassword', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailAddress } = req.body;
        const query = 'SELECT * FROM users WHERE emailAddress = \'' + emailAddress + '\';';

        await DB.executeSQL(query, async function(err, data) {
            if(err) {
                console.error(err);
            } else if(!data) {
                res.send("Error occurred while trying to reset password.");
            } else {
                const resetCode = await generateCode(5);
                const resetCodeExpiration = Date.now() + 3600000;

                // update user row with resetCode and resetCodeExpiration vars
                DB.executeSQL('UPDATE users SET resetCode = \'' + resetCode + '\', resetCodeExpiration = \'' + resetCodeExpiration + '\' WHERE emailAddress = \'' + emailAddress + '\';', async (err, data) => { if(err) {console.error(err) }});

                // send email
                await sendEmail(emailAddress, `Here is your requested reset token ${resetCode}\n\nIf you did not request this reset please ignore this email.`);

                res.send("Email sent successfully.");
            }   
        });
    } catch(e) {
        next(e);
    }
});

// Confirm code and password reset process
router.post('/resetPasswordConfimation', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailAddress, newPassword, verificationCode } = req.body;
        const query = 'SELECT * FROM users WHERE emailAddress = \'' + emailAddress + '\';';
        // console.log(query);

        await DB.executeSQL(query, async function(err, data) {
            console.log("Reset code => ", data[0].resetCode);

            if(err) {
                console.error(err);
            } else if (!data[0] || data[0].resetCode != verificationCode) {
                res.send("Verification code does not match.");
            } else if (data[0].resetCodeExpiration < new Date()) {
                res.send("Verification code has expired.");
            } else {
                const encryptedPassword = createHash('sha256').update(newPassword).digest('hex');

                // update user row with encrypted password and set code and expiration to empty values
                DB.executeSQL('UPDATE users SET resetCode = null, resetCodeExpiration = null, password = \'' + encryptedPassword + '\' WHERE emailAddress = \'' + emailAddress + '\';', async (err, data) => { if(err) {console.error(err) }});

                res.send("Password reset was successful.");
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

// helper functions
async function generateCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default router;