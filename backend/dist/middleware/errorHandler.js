"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorResponse_1 = require("@utils/errorResponse");
const isProduction = process.env.NODE_ENV === 'production';
const errorHandler = (error, _req, res, _next) => {
    console.error('Error:', error);
    if (error instanceof errorResponse_1.ApiError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: error.message,
        });
        return;
    }
    const message = isProduction ? 'Internal server error' : error.message;
    res.status(500).json({
        success: false,
        message,
        error: message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map