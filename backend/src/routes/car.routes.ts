import { Router } from 'express';
import { createCar, getCars, getCar, getUserCars, deleteCar } from '../controllers/car.controller';
import { authenticate } from '../middleware/auth.middleware';
import { updateCar } from "../controllers/car.controller";

const router = Router();

router.post('/', authenticate, createCar);
router.get('/', getCars);
router.get('/my', authenticate, getUserCars);
router.get('/:id', getCar);
router.delete('/:id', authenticate, deleteCar);
router.put('/:id', authenticate, updateCar);

export default router;
