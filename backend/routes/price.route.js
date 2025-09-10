import express from 'express';
import { createPrice, getAllPrices } from '../controller/price.controller.js';

const router= express.Router()

router.get('/', getAllPrices);
router.post('/', createPrice);


export default router;