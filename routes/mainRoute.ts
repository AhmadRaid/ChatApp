import express, { Router } from 'express';
import authRoutes from './v1/auth';
import userRoutes from './v1/user';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;