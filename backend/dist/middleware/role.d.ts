import { Request, Response, NextFunction } from 'express';
/**
 * Restrict endpoint access to specific roles.
 * Usage: router.patch('/me/availability', restrictTo('WORKER'), updateAvailability);
 */
export declare const restrictTo: (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=role.d.ts.map