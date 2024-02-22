//Routes for cryptocurrency listings and conversions
import express from 'express'; 
import { convertPrice } from '../controllers/cryptoController.js';

const router = express.Router();
router.post('/convert', convertPrice); 

export default router;
