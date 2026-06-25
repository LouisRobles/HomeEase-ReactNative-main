"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const role_1 = require("../middleware/role");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// All booking routes require auth
router.use(auth_1.authMiddleware);
// List bookings (role-filtered)
router.get('/', bookingController_1.listBookings);
// Get booking detail
router.get('/:id', bookingController_1.getBookingDetail);
// Create booking (client only)
router.post('/', (0, role_1.restrictTo)('CLIENT'), validation_1.validateCreateBooking, bookingController_1.createBooking);
// Accept booking (worker only)
router.patch('/:id/accept', (0, role_1.restrictTo)('WORKER'), bookingController_1.acceptBooking);
// Decline booking (worker only)
router.patch('/:id/decline', (0, role_1.restrictTo)('WORKER'), validation_1.validateBookingStatusUpdate, bookingController_1.declineBooking);
// Start booking (worker only)
router.patch('/:id/start', (0, role_1.restrictTo)('WORKER'), bookingController_1.startBooking);
// Submit quote (worker only)
router.post('/:id/quote', (0, role_1.restrictTo)('WORKER'), validation_1.validateSubmitQuote, bookingController_1.submitQuote);
// Approve quote (client only)
router.patch('/:id/quote/approve', (0, role_1.restrictTo)('CLIENT'), validation_1.validateApproveQuote, bookingController_1.approveQuote);
// Dispute quote (client only)
router.patch('/:id/quote/dispute', (0, role_1.restrictTo)('CLIENT'), validation_1.validateDisputeQuote, bookingController_1.disputeQuote);
// Complete booking (worker only)
router.patch('/:id/complete', (0, role_1.restrictTo)('WORKER'), bookingController_1.completeBooking);
// Cancel booking (client or worker)
router.patch('/:id/cancel', validation_1.validateBookingStatusUpdate, bookingController_1.cancelBooking);
// Reschedule booking (client or worker)
router.patch('/:id/reschedule', validation_1.validateRescheduleBooking, bookingController_1.rescheduleBooking);
// Add addon (worker only)
router.post('/:id/addons', (0, role_1.restrictTo)('WORKER'), validation_1.validateAddAddon, bookingController_1.addAddon);
// Submit review (client only)
router.post('/:id/review', (0, role_1.restrictTo)('CLIENT'), validation_1.validateAddReview, bookingController_1.submitReview);
exports.default = router;
//# sourceMappingURL=bookings.js.map