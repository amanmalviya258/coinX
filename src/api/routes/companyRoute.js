// src/api/routes/companyRoutes.js
import express from 'express';
const router = express.Router();
import companyController from '../controllers/companyController.js';

router.post('/holdings', companyController.getCompanyHoldings);

export default router; 
