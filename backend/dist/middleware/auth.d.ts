import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from '../types';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map