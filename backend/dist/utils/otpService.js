"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeAllRefreshTokens = exports.revokeRefreshToken = exports.verifyRefreshToken = exports.storeRefreshToken = exports.verifyPasswordResetToken = exports.storePasswordResetToken = exports.verifyOtp = exports.storeOtp = exports.generateResetToken = exports.generateOtp = void 0;
const database_1 = __importDefault(require("@config/database"));
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const OTP_EXPIRY_MINUTES = 10;
const RESET_TOKEN_EXPIRY_HOURS = 24;
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOtp = generateOtp;
const generateResetToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
exports.generateResetToken = generateResetToken;
const storeOtp = async (userId, otp) => {
    // Invalidate any existing OTPs for this user
    await database_1.default.authToken.deleteMany({
        where: {
            userId,
            type: client_1.TokenType.EMAIL_VERIFICATION,
        },
    });
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);
    await database_1.default.authToken.create({
        data: {
            userId,
            token: otp,
            type: client_1.TokenType.EMAIL_VERIFICATION,
            expiresAt,
        },
    });
};
exports.storeOtp = storeOtp;
const verifyOtp = async (userId, otp) => {
    const record = await database_1.default.authToken.findFirst({
        where: {
            userId,
            token: otp,
            type: client_1.TokenType.EMAIL_VERIFICATION,
            expiresAt: {
                gt: new Date(),
            },
        },
    });
    if (!record)
        return false;
    // Delete used OTP
    await database_1.default.authToken.delete({
        where: { id: record.id },
    });
    return true;
};
exports.verifyOtp = verifyOtp;
const storePasswordResetToken = async (userId, token) => {
    // Invalidate any existing reset tokens for this user
    await database_1.default.authToken.deleteMany({
        where: {
            userId,
            type: client_1.TokenType.PASSWORD_RESET,
        },
    });
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + RESET_TOKEN_EXPIRY_HOURS);
    await database_1.default.authToken.create({
        data: {
            userId,
            token,
            type: client_1.TokenType.PASSWORD_RESET,
            expiresAt,
        },
    });
};
exports.storePasswordResetToken = storePasswordResetToken;
const verifyPasswordResetToken = async (userId, token) => {
    const record = await database_1.default.authToken.findFirst({
        where: {
            userId,
            token,
            type: client_1.TokenType.PASSWORD_RESET,
            expiresAt: {
                gt: new Date(),
            },
        },
    });
    if (!record)
        return false;
    await database_1.default.authToken.delete({
        where: { id: record.id },
    });
    return true;
};
exports.verifyPasswordResetToken = verifyPasswordResetToken;
const storeRefreshToken = async (userId, token) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await database_1.default.authToken.create({
        data: {
            userId,
            token,
            type: client_1.TokenType.REFRESH,
            expiresAt,
        },
    });
};
exports.storeRefreshToken = storeRefreshToken;
const verifyRefreshToken = async (token) => {
    const record = await database_1.default.authToken.findFirst({
        where: {
            token,
            type: client_1.TokenType.REFRESH,
            expiresAt: {
                gt: new Date(),
            },
        },
    });
    if (!record)
        return null;
    return record.userId;
};
exports.verifyRefreshToken = verifyRefreshToken;
const revokeRefreshToken = async (token) => {
    await database_1.default.authToken.deleteMany({
        where: {
            token,
            type: client_1.TokenType.REFRESH,
        },
    });
};
exports.revokeRefreshToken = revokeRefreshToken;
const revokeAllRefreshTokens = async (userId) => {
    await database_1.default.authToken.deleteMany({
        where: {
            userId,
            type: client_1.TokenType.REFRESH,
        },
    });
};
exports.revokeAllRefreshTokens = revokeAllRefreshTokens;
//# sourceMappingURL=otpService.js.map