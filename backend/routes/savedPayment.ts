import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

const { createHash } = require('crypto');

// Get saved payment by userID
router.get('/getSavedPaymentByuserID/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        
        await DB.executeSQL('select * from saved_payment_methods where userID = ' + userID + ';', function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else if(!data) { 
                res.send("No order with specified orderID exists!");
            } 
            else {
                res.send(data);
            }
        });
    } catch(e) {
        next(e);
    } 
});

// Insert saved payment
router.post('/insertSavedPayment', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const { userID, nameOnCard, cardNum, secCode, expiration } = req.body;
        const sp = "SP_InsertSavedPayment";

        
        await DB.executeStoredProcedure(sp, { userID, nameOnCard, cardNum, secCode, expiration }, function(err, data) {
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

// Update save payment
router.post('/updateSavedPayment/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const { nameOnCard, cardNum, secCode, expiration } = req.body;
        const sp = "SP_UpdateSavedPayment";

        const encryptedCardNum = createHash('sha256').update(cardNum).digest('hex');
        const encryptedSecCode = createHash('sha256').update(secCode).digest('hex');
        
        await DB.executeStoredProcedure(sp, { userID, nameOnCard, encryptedCardNum, encryptedSecCode, expiration }, function(err, data) {
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

// Delete saved payment method
router.delete('/deleteSavedPayment/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const sp = "SP_DeleteSavedPayment";
        
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