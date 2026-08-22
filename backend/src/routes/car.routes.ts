import { Router } from 'express';
import { createCar, getCars, getCar } from '../controllers/car.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, createCar);
router.get('/', getCars);
router.get('/:id', getCar);

export default router;
