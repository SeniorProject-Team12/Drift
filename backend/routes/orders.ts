import { Router, Request, Response, NextFunction } from 'express';
import { DB } from './modules/db';

export const router = Router();

// Get all orders
router.get('/', async (req:Request, res: Response, next: NextFunction) => {
    try {
        await DB.executeSQL('select * from orders;', function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else {
                console.log(data);   
                res.send(data);
            }
        });     
    } catch(e) {
        next(e);
    } 
});

// Get order by ID
router.get('/getOrderByID/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.id;
        
        await DB.executeSQL('select * from orders where userID = ' + userID + ';', function(err, data) {
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

// Get order by ID
router.get('/getOrderBySellerID/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const sellerID = req.params.id;
        
        await DB.executeSQL('select * from orders where sellerID = ' + sellerID + ';', function(err, data) {
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

router.post('/insertOrder', async (req:Request, res: Response, next: NextFunction) => {
    try {

        const { userID, customerName, billingAddress, shippingAddress, itemCount, items, orderStatus, totalPrice, sellerID /*salesTax/*, totalShippingPrice, trackingNumber*/  } = req.body;
        const sp = "SP_InsertOrder";

        await DB.executeStoredProcedure(sp, { userID, customerName, billingAddress, shippingAddress, itemCount, items, orderStatus, totalPrice, sellerID /*salesTax/*, totalShippingPrice, trackingNumber*/ }, function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
            } else {
                 console.log(data);   
                res.send(data);
            }
        });
    } catch(e) {
        next(e);
    } 

 });

// Update order
router.post('/updateOrder/id/:id', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const orderID = req.params.id;
        const { userID, customerName, billingAddress, shippingAddress, itemCount, items, orderStatus, totalPrice, sellerID } = req.body;

        const sp = "SP_UpdateOrder";

        await DB.executeStoredProcedure(sp, { orderID, userID, customerName, billingAddress, shippingAddress, itemCount, items, orderStatus, totalPrice, sellerID }, function(err, data) {
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

//Update order status
router.post('/updateOrderStatus/id/:id', async (req, res, next) => {
    try {
        const orderID = req.params.id;
        const { orderStatus } = req.body; // Only extracting orderStatus from req.body

        const sp = "SP_UpdateOrderStatus";

        await DB.executeStoredProcedure(sp, { order_ID: orderID, orderStatus: orderStatus }, function(err, data) {
            if(err) {
                console.log("ERROR: ", err);
                res.status(500).send("Error updating order status");
            } else {
                res.send(data);
            }
        });
    } catch(e) {
        next(e);
    } 
});

// Delete order
router.delete('/deleteOrder/id/:id', async (req:Request, res: Response, next: NextFunction) => {
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