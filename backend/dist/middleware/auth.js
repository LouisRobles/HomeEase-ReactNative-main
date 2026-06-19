"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("@utils/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'No token provided',
            });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map