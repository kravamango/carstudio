import { Router } from 'express';
import { upload, uploadPhoto } from '../controllers/upload.controller';

const router = Router();

router.post('/', upload.single('photo'), uploadPhoto);

export default router;
