import { config } from "../constants/config";
import {
  bookings as dummyBookings,
  workers as dummyWorkers,
  conversations as dummyConversations,
} from "../constants/dummyData";

// Auth Endpoints
export async function postSignUp(userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: 'client' | 'worker';
}) {
  await delay(600);
  // Simulate successful signup
  return {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    name: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    token: "token-" + Math.random().toString(36).substr(2, 20),
  };
}

export async function postLogin(email: string, password: string) {
  await delay(500);
  // Simulate successful login
  return {
    id: "user-123",
    name: "John Doe",
    email: email,
    role: "client" as const,
    token: "token-" + Math.random().toString(36).substr(2, 20),
  };
}

export async function sendPasswordResetEmail(email: string) {
  await delay(400);
  // Simulate sending reset email
  return {
    success: true,
    message: "Password reset email sent",
  };
}

export async function resetPassword(email: string, otp: string, newPassword: string) {
  await delay(400);
  // Simulate password reset
  return {
    success: true,
    message: "Password reset successfully",
  };
}

export async function sendOtpEmail(email: string) {
  await delay(400);
  // Simulate sending OTP
  return {
    success: true,
    message: "OTP sent to email",
  };
}

export async function verifyOtp(email: string, otp: string) {
  await delay(400);
  // Simulate OTP verification
  return {
    success: true,
    message: "Email verified",
    token: "token-" + Math.random().toString(36).substr(2, 20),
  };
}

export async function verifyEmail(email: string, token: string) {
  await delay(400);
  // Simulate email verification
  return {
    success: true,
    message: "Email verified successfully",
  };
}

export async function validateEmail(email: string) {
  await delay(300);
  // Simulate email validation - check if exists
  return {
    exists: false,
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  };
}

// Bookings
export async function getBookings() {
  await delay(300);
  return dummyBookings;
}

export async function createBooking(details: Record<string, unknown>) {
  await delay(500);
  return {
    id: "BK-NEW",
    ...details,
  };
}

export async function updateBooking(id: string, status: string) {
  await delay(300);
  return { id, status };
}

// Workers
export async function searchWorkers(filters: {
  query?: string;
  categoryId?: string;
}) {
  await delay(300);
  const q = filters.query?.toLowerCase().trim();
  if (!q) return dummyWorkers;
  return dummyWorkers.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      w.service.toLowerCase().includes(q),
  );
}

export async function getWorkerDetail(id: string) {
  await delay(200);
  return dummyWorkers.find((w) => w.id === id) ?? null;
}

// Messaging
export async function getConversations() {
  await delay(200);
  return dummyConversations;
}

export async function sendMessage(conversationId: string, text: string) {
  await delay(150);
  return { id: Date.now().toString(), conversationId, text };
}

// Reviews
export async function submitReview(
  bookingId: string,
  rating: number,
  comment: string,
) {
  await delay(250);
  return { bookingId, rating, comment };
}

export async function getWorkerReviews(workerId: string) {
  await delay(250);
  return [];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

