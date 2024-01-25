import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all orders
router.get('/',async (req:Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from order;', function(err, data) {
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

// Get order by ID
router.get('/id/:id',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const orderID = req.params.id;
        
        await DB.executeSQL('select * from order where orderID=' + orderID.toString() + ';', function(err, data) {
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

// Insert new order
router.post('/insertOrder',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {  } = req.body;

        const sp = "SP_InsertOrder";

        await DB.executeStoredProcedure(sp, { }, function(err, data) {
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

// Update order
router.post('/id/:id',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const orderID = req.params.id;
        const {  } = req.body;

        const sp = "SP_UpdateOrder";

        await DB.executeStoredProcedure(sp, {  }, function(err, data) {
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

// Delete order
router.delete('/id/:id',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const orderID = req.params.id;
        const sp = "SP_DeleteOrder";

        await DB.executeStoredProcedure(sp, { orderID }, function(err, data) {
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