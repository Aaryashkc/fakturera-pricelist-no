import express from 'express';
import { createPriceItem, getAllPrices } from '../controller/price.controller.js';

const router= express.Router()

router.get('/', getAllPrices);
router.post('/', createPriceItem);


export default router;