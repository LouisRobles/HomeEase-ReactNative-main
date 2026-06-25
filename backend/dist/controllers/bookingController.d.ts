import { Request, Response } from 'express';
import type { JwtPayload } from '@/types/index';
interface AuthRequest extends Request {
    user?: JwtPayload;
}
/**
 * POST /api/bookings
 * Create a new booking (client only)
 */
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/bookings
 * List bookings (role-filtered: clients see their own, workers see assigned to them)
 */
export declare const listBookings: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/bookings/:id
 * Get booking detail with ownership check
 */
export declare const getBookingDetail: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/accept
 * Worker accepts booking (transaction-wrapped capacity check)
 */
export declare const acceptBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/decline
 * Worker declines (rejects) booking — reverts to PENDING so client can re-assign
 *
 * NOTE: Schema has no DECLINED status; REJECTED is used here, but since we
 * immediately revert back to PENDING, the booking is returned to the client
 * in a re-assignable state.
 */
export declare const declineBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/start
 * Worker marks booking as in progress
 */
export declare const startBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/bookings/:id/quote
 * Worker submits labor/materials quote
 * Quote data is stored inline on the Booking model (no separate Quote table in schema)
 */
export declare const submitQuote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/quote/approve
 * Client approves quote
 */
export declare const approveQuote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/quote/dispute
 * Client disputes quote and stores reason
 * Schema uses DISPUTED (not QUOTE_DISPUTED) as the BookingStatus value
 */
export declare const disputeQuote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/complete
 * Complete booking (decrement activeJobCount in transaction)
 */
export declare const completeBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/cancel
 * Cancel booking (status-gated)
 */
export declare const cancelBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/bookings/:id/reschedule
 * Reschedule booking to new date/time
 * NOTE: schema only has scheduledDate (no scheduledTime field)
 */
export declare const rescheduleBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/bookings/:id/addons
 * Add scope-creep addon items mid-job
 * Schema model: BookingAddOn with fields: name, price (not title/description/cost)
 */
export declare const addAddon: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/bookings/:id/review
 * Submit rating and review after completion
 */
export declare const submitReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=bookingController.d.ts.map