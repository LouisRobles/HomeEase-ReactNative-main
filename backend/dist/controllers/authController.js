"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendPasswordResetEmail = exports.login = exports.signup = void 0;
const database_1 = __importDefault(require("@config/database"));
const passwordHash_1 = require("@utils/passwordHash");
const jwt_1 = require("@utils/jwt");
const validators_1 = require("@utils/validators");
const errorResponse_1 = require("@utils/errorResponse");
const getTrimmedString = (value) => {
    return typeof value === 'string' ? value.trim() : '';
};
const getPasswordString = (value) => {
    return typeof value === 'string' ? value : '';
};
const normalizeEmail = (value) => {
    return getTrimmedString(value).toLowerCase();
};
const normalizeSignupRole = (value) => {
    const role = getTrimmedString(value).toUpperCase();
    if (role === 'CLIENT' || role === 'WORKER') {
        return role;
    }
    return null;
};
const signup = async (req, res) => {
    try {
        const fullName = getTrimmedString(req.body.fullName);
        const email = normalizeEmail(req.body.email);
        const phone = getTrimmedString(req.body.phone);
        const password = getPasswordString(req.body.password);
        const role = normalizeSignupRole(req.body.role);
        // Validation
        if (!fullName || !email || !phone || !password || !req.body.role) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Missing required fields'));
        }
        if (!role) {
            return res
                .status(400)
                .json((0, errorResponse_1.errorResponse)(400, 'Role must be either CLIENT or WORKER'));
        }
        if (!(0, validators_1.validateEmail)(email)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Invalid email format'));
        }
        if (!(0, validators_1.validatePassword)(password)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Password must be at least 8 characters with 1 uppercase letter and 1 number'));
        }
        if (!(0, validators_1.validatePhone)(phone)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Invalid phone number'));
        }
        // Check if email exists
        const existingUser = await database_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json((0, errorResponse_1.errorResponse)(409, 'Email already registered'));
        }
        // Hash password
        const hashedPassword = await (0, passwordHash_1.hashPassword)(password);
        const user = await database_1.default.$transaction(async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    fullName,
                    email,
                    phone,
                    password: hashedPassword,
                    role,
                },
            });
            if (role === 'WORKER') {
                await tx.workerProfile.create({
                    data: {
                        userId: createdUser.id,
                    },
                });
            }
            else {
                await tx.clientProfile.create({
                    data: {
                        userId: createdUser.id,
                    },
                });
            }
            return createdUser;
        });
        // Generate token
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // FIXED: Added return keyword here
        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token,
            },
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json((0, errorResponse_1.errorResponse)(500, 'Internal server error'));
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const password = getPasswordString(req.body.password);
        if (!email || !password) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Email and password required'));
        }
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json((0, errorResponse_1.errorResponse)(401, 'Invalid credentials'));
        }
        const isPasswordValid = await (0, passwordHash_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json((0, errorResponse_1.errorResponse)(401, 'Invalid credentials'));
        }
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // FIXED: Added return keyword here
        return res.json({
            success: true,
            message: 'Login successful',
            data: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json((0, errorResponse_1.errorResponse)(500, 'Internal server error'));
    }
};
exports.login = login;
const sendPasswordResetEmail = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        if (!(0, validators_1.validateEmail)(email)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Invalid email'));
        }
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            // Return success anyway for security
            return res.json({
                success: true,
                message: 'If email exists, password reset link sent',
            });
        }
        // TODO: Send actual email with reset token
        // For now, just return success
        // FIXED: Added return keyword here
        return res.json({
            success: true,
            message: 'Password reset email sent',
        });
    }
    catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json((0, errorResponse_1.errorResponse)(500, 'Internal server error'));
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const newPassword = getPasswordString(req.body.newPassword);
        if (!(0, validators_1.validateEmail)(email)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Invalid email'));
        }
        if (!(0, validators_1.validatePassword)(newPassword)) {
            return res.status(400).json((0, errorResponse_1.errorResponse)(400, 'Password must be at least 8 characters with 1 uppercase letter and 1 number'));
        }
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json((0, errorResponse_1.errorResponse)(404, 'User not found'));
        }
        const hashedPassword = await (0, passwordHash_1.hashPassword)(newPassword);
        await database_1.default.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
        // FIXED: Added return keyword here
        return res.json({
            success: true,
            message: 'Password reset successfully',
        });
    }
    catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json((0, errorResponse_1.errorResponse)(500, 'Internal server error'));
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map