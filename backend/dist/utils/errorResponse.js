"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
const errorResponse = (statusCode, message) => {
    return {
        success: false,
        statusCode,
        message,
        error: message,
    };
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=errorResponse.js.map