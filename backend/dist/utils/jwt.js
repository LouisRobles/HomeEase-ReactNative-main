"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DEFAULT_JWT_EXPIRY_SECONDS = 60 * 60 * 24 * 7;
const DEVELOPMENT_JWT_SECRET = 'homeease_development_secret_change_me';
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET?.trim();
    if (secret) {
        return secret;
    }
    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET is required in production');
    }
    return DEVELOPMENT_JWT_SECRET;
};
const getJwtExpiry = () => {
    const rawExpiry = process.env.JWT_EXPIRY?.trim();
    if (!rawExpiry) {
        return DEFAULT_JWT_EXPIRY_SECONDS;
    }
    const parsedExpiry = Number.parseInt(rawExpiry, 10);
    if (!Number.isFinite(parsedExpiry) || parsedExpiry <= 0) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('JWT_EXPIRY must be a positive number of seconds');
        }
        console.warn(`Invalid JWT_EXPIRY "${rawExpiry}", falling back to ${DEFAULT_JWT_EXPIRY_SECONDS} seconds`);
        return DEFAULT_JWT_EXPIRY_SECONDS;
    }
    return parsedExpiry;
};
const JWT_SECRET = getJwtSecret();
const JWT_EXPIRY = getJwtExpiry();
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map