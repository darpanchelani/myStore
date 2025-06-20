import express from 'express';
import {getProductById, updateProductPrice} from '../controllers/productController.js';

const router = express.Router();

router.get('/:id', getProductById);
router.put('/:id', updateProductPrice);

export default router;
