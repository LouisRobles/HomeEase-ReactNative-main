import { Router } from 'express';
import {
  signup,
  login,
  sendPasswordResetEmail,
  resetPassword,
} from '@controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);

export default router;