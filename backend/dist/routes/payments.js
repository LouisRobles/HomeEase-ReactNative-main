"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const auth_1 = require("../middleware/auth");
const role_1 = require("../middleware/role");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// PayMongo webhook (no auth required)
router.post('/paymongo/webhook', paymentController_1.handlePayMongoWebhook);
// All other routes require auth
router.use(auth_1.authMiddleware);
// Create payment (client only)
router.post('/:bookingId', (0, role_1.restrictTo)('CLIENT'), paymentController_1.createPayment);
// Get payment detail
router.get('/:bookingId', paymentController_1.getPaymentDetail);
// List my payments (client: payments made, worker: payouts)
router.get('/', paymentController_1.listMyPayments);
// Release escrow (client only)
router.post('/:id/release', (0, role_1.restrictTo)('CLIENT'), validation_1.validateReleaseEscrow, paymentController_1.releaseEscrow);
// Refund payment (client only)
router.post('/:id/refund', (0, role_1.restrictTo)('CLIENT'), validation_1.validateRefundPayment, paymentController_1.refundPayment);
// Create PayMongo payment intent (client only)
router.post('/paymongo/intent', (0, role_1.restrictTo)('CLIENT'), paymentController_1.createPaymentIntent);
exports.default = router;
//# sourceMappingURL=payments.js.map