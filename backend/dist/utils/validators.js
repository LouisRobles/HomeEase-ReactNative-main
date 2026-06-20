"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = exports.validatePhone = exports.validatePassword = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    // Min 8 chars, 1 uppercase, 1 number
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};
exports.validatePassword = validatePassword;
const validatePhone = (phone) => {
    return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
};
exports.validatePhone = validatePhone;
const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp);
};
exports.validateOtp = validateOtp;
//# sourceMappingURL=validators.js.map