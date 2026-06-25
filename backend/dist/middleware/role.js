"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const errorResponse_1 = require("../utils/errorResponse");
/**
 * Restrict endpoint access to specific roles.
 * Usage: router.patch('/me/availability', restrictTo('WORKER'), updateAvailability);
 */
const restrictTo = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json((0, errorResponse_1.errorResponse)(401, 'Not authenticated'));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json((0, errorResponse_1.errorResponse)(403, `Only ${allowedRoles.join(' or ')} users can access this resource`));
        }
        return next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=role.js.map