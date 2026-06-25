"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("@routes/auth"));
const workers_1 = __importDefault(require("@routes/workers"));
const bookings_1 = __importDefault(require("@routes/bookings"));
const payments_1 = __importDefault(require("@routes/payments"));
const users_1 = __importDefault(require("@routes/users"));
const messages_1 = __importDefault(require("@routes/messages"));
const errorHandler_1 = require("@middleware/errorHandler");
const app = (0, express_1.default)();
const jsonBodyLimit = process.env.JSON_BODY_LIMIT || '1mb';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
// Middleware
app.use(express_1.default.json({ limit: jsonBodyLimit }));
app.use(express_1.default.urlencoded({ extended: true, limit: jsonBodyLimit }));
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/workers', workers_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/payments', payments_1.default);
app.use('/api/users', users_1.default);
app.use('/api/messages', messages_1.default);
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'OK' });
});
// Error handling
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map