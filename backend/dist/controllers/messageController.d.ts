import { Request, Response } from 'express';
import type { JwtPayload } from '@/types/index';
interface AuthRequest extends Request {
    user?: JwtPayload;
}
/**
 * GET /api/messages/conversations
 * Get derived conversation list (latest message from each unique sender/receiver pair)
 */
export declare const getConversations: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/messages/conversations/:userId
 * Get message thread with one specific user
 */
export declare const getConversationThread: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/messages
 * Send a message (also creates MESSAGE_RECEIVED Notification)
 */
export declare const sendMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/messages/conversations/:userId/read
 * Mark entire conversation with a user as read
 */
export declare const markConversationRead: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/messages/unread-count
 * Get total unread message count for the badge
 */
export declare const getUnreadCount: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=messageController.d.ts.map