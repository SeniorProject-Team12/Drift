import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

import * as CryptoJS from 'crypto-js';
const key = "Dr!ft3ncryptk3y2024";

function encryptString(text: string, key: string): string {
    return CryptoJS.AES.encrypt(text, key).toString();
}

function decryptString(ciphertext: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Get saved payment by userID
router.get('/getSavedPaymentByuserID/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        console.log("HERE");
        const userID = req.params.id;
        
        await DB.executeSQL('select * from saved_payment_methods where userID = ' + userID + ';', function(err, data) {
            console.log("Data", data);
            if(data.length != 0) {
                console.log(data[0].cardNumber);
                const decryptedCardNum = decryptString(data[0].cardNumber, key);
    
                console.log(decryptedCardNum);
                data[0].cardNumber = decryptedCardNum;
            }
            
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
        console.log("In insert saved payment");

        const encryptedCardNum = encryptString(cardNum, key);
        const encryptedSecCode = encryptString(secCode, key);
        
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

// Update save payment
router.post('/updateSavedPayment/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        const { nameOnCard, cardNum, secCode, expiration } = req.body;
        const sp = "SP_UpdateSavedPayment";
        console.log(nameOnCard, cardNum);

        const encryptedCardNum = encryptString(cardNum, key);
        const encryptedSecCode = encryptString(secCode, key);
        
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