import { config } from "../constants/config";
import {
  bookings as dummyBookings,
  workers as dummyWorkers,
  conversations as dummyConversations,
} from "../constants/dummyData";

// Auth
export async function postLogin(email: string, password: string) {
  await delay(400);
  return { token: "mock-token", email };
}

export async function postSignUp(userData: Record<string, unknown>) {
  await delay(400);
  return { id: "user-1", ...userData };
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

