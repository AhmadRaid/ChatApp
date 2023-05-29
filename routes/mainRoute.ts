import express, { Router } from 'express';
import authRoutes from './v1/auth';
import userRoutes from './v1/user';
import chatRoutes from './v1/message';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

export default router;