// routes/paymentRoutes.ts
const express = require('express');
import {Router, Request, Response, NextFunction} from 'express';
//import stripe and stripe developer key
const stripe = require('stripe')(
    //Secret key for creating payment intents
    'sk_test_51Oe7muAh9NlzJ6kb6VepZjgXcL2rqarP7gOqPqe0TBv53vo4juq1hnmonB5OpozpI0LHTeNsBMb1UeicdyZbxXiC004ZsBrJLs'
);

export const router = Router();

// router endpoints

router.post('/intent', async (req:Request, res:Response, next: NextFunction) => {
    try {
        //create a PaymentIntent
        console.log('hello world')
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Integer (in pennies)
            currency: 'usd',
            //billing_address_collection: 'required',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        //Return client_secret token to front end   
        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        res.status(400).json({
            error: (e as Error)
        })
    }
   
})