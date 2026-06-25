import { Router } from 'express';
import {
  searchWorkers,
  getWorkerDetail,
  getWorkerReviews,
  updateAvailability,
  updateWorkerProfile,
  addServiceTypes,
  getWorkerCapacity,
} from '../controllers/workerController';
import { authMiddleware } from '../middleware/auth';
import { restrictTo } from '../middleware/role';
import {
  validateUpdateAvailability,
  validateUpdateWorkerProfile,
  validateAddServiceTypes,
} from '../middleware/validation';

const router = Router();

// Public routes (no auth required)
router.get('/', searchWorkers);
router.get('/:workerId', getWorkerDetail);
router.get('/:workerId/reviews', getWorkerReviews);

// Protected routes (auth + worker only)
router.patch(
  '/me/availability',
  authMiddleware,
  restrictTo('WORKER'),
  validateUpdateAvailability,
  updateAvailability
);

router.patch(
  '/me/profile',
  authMiddleware,
  restrictTo('WORKER'),
  validateUpdateWorkerProfile,
  updateWorkerProfile
);

router.post(
  '/me/service-types',
  authMiddleware,
  restrictTo('WORKER'),
  validateAddServiceTypes,
  addServiceTypes
);

router.get(
  '/me/capacity',
  authMiddleware,
  restrictTo('WORKER'),
  getWorkerCapacity
);

export default router;
