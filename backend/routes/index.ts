import { Router } from 'express';
export const router = Router();

router.get("/", (req, res) => {
    res.json({message: "Welcome to Drift's API"});
});