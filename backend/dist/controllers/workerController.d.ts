import { Request, Response } from 'express';
import type { JwtPayload } from '@/types/index';
interface AuthRequest extends Request {
    user?: JwtPayload;
}
/**
 * GET /api/workers
 * Search/list workers with filters
 * Query params: category, minRating, maxPrice, page, limit
 */
export declare const searchWorkers: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/workers/:workerId
 * Get detailed worker profile including ResumeParseResult fields
 */
export declare const getWorkerDetail: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/workers/:workerId/reviews
 * Get paginated reviews for a worker
 */
export declare const getWorkerReviews: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/workers/me/availability
 * Toggle isAvailable and set availableDays (worker only)
 */
export declare const updateAvailability: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/workers/me/profile
 * Update worker profile fields (worker only)
 */
export declare const updateWorkerProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/workers/me/service-types
 * Attach ServiceType(s) to worker (worker only)
 */
export declare const addServiceTypes: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/workers/me/capacity
 * Get worker capacity info (worker only)
 */
export declare const getWorkerCapacity: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=workerController.d.ts.map