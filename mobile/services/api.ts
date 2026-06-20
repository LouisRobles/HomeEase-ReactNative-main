import {
  bookings as dummyBookings,
  workers as dummyWorkers,
  conversations as dummyConversations,
  transactions as dummyTransactions,
  workerTransactions as dummyWorkerTransactions,
} from "../constants/dummyData";

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

export async function postSignUp(userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: 'client' | 'worker';
}) {
  await delay(600);
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
  return {
    success: true,
    message: "Password reset email sent",
  };
}

export async function resetPassword(email: string, otp: string, newPassword: string) {
  await delay(400);
  return {
    success: true,
    message: "Password reset successfully",
  };
}

export async function sendOtpEmail(email: string) {
  await delay(400);
  return {
    success: true,
    message: "OTP sent to email",
  };
}

export async function verifyOtp(email: string, otp: string) {
  await delay(400);
  return {
    success: true,
    message: "Email verified",
    token: "token-" + Math.random().toString(36).substr(2, 20),
  };
}

export async function verifyEmail(email: string, token: string) {
  await delay(400);
  return {
    success: true,
    message: "Email verified successfully",
  };
}

export async function validateEmail(email: string) {
  await delay(300);
  return {
    exists: false,
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  };
}

// ============================================================================
// BOOKING ENDPOINTS - CLIENT
// ============================================================================

export async function getBookings(status?: string) {
  await delay(300);
  if (!status) return dummyBookings;
  return dummyBookings.filter((b) => b.status === status);
}

export async function getBookingDetail(bookingId: string) {
  await delay(250);
  const booking = dummyBookings.find((b) => b.id === bookingId);
  if (!booking) return null;
  return {
    ...booking,
    description: "Professional cleaning service including bathrooms and kitchen",
    notes: "Please bring your own cleaning supplies",
    createdAt: new Date(booking.date).toISOString(),
  };
}

export async function createBooking(details: {
  service: string;
  description: string;
  date: string;
  time: string;
  address: string;
  workerId?: string;
  paymentMethod: string;
  tip?: number;
  estimatedPrice: number;
}) {
  await delay(500);
  const newId = "BK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  return {
    id: newId,
    ...details,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
}

export async function updateBookingStatus(bookingId: string, status: string) {
  await delay(350);
  return { 
    id: bookingId, 
    status,
    updatedAt: new Date().toISOString(),
  };
}

export async function rescheduleBooking(bookingId: string, newDate: string, newTime: string) {
  await delay(400);
  return {
    id: bookingId,
    date: newDate,
    time: newTime,
    status: "Pending",
    message: "Booking rescheduled. Awaiting worker confirmation.",
  };
}

export async function cancelBooking(bookingId: string, reason?: string) {
  await delay(350);
  return {
    id: bookingId,
    status: "Cancelled",
    reason: reason || "User requested cancellation",
    refundAmount: 450,
    message: "Booking cancelled. Refund will be processed within 3-5 business days.",
  };
}

// ============================================================================
// WORKER DISCOVERY & PROFILES - CLIENT
// ============================================================================

export async function getWorkers(filters?: {
  category?: string;
  minRating?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  await delay(350);
  let results = [...dummyWorkers];
  
  if (filters?.category) {
    results = results.filter((w) => w.service.toLowerCase().includes(filters.category!.toLowerCase()));
  }
  if (filters?.minRating) {
    results = results.filter((w) => w.rating >= filters.minRating!);
  }
  if (filters?.maxPrice) {
    results = results.filter((w) => (w.rate || 500) <= filters.maxPrice!);
  }
  
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: results.slice(start, end),
    total: results.length,
    page,
    limit,
  };
}

export async function getWorkerDetail(workerId: string) {
  await delay(350);
  const worker = dummyWorkers.find((w) => w.id === workerId);
  if (!worker) return null;
  
  return {
    ...worker,
    bio: "Licensed professional with 5+ years of experience in plumbing services. Specializing in residential and commercial work.",
    yearsOfExperience: 5,
    certifications: ["Plumbing License", "Safety Training"],
    skills: ["Pipe Repair", "Installation", "Maintenance"],
    responseTime: "Usually responds within 1 hour",
    completedJobs: 234,
    joinDate: "2021-03-15",
    serviceArea: ["Central Luzon", "Metro Manila"],
  };
}

export async function searchWorkers(filters: {
  query?: string;
  categoryId?: string;
  minRating?: number;
  page?: number;
}) {
  await delay(400);
  let results = [...dummyWorkers];
  
  const q = filters.query?.toLowerCase().trim();
  if (q) {
    results = results.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.service.toLowerCase().includes(q)
    );
  }
  
  if (filters?.categoryId) {
    results = results.filter((w) => w.service.toLowerCase().includes(filters.categoryId!.toLowerCase()));
  }
  
  if (filters?.minRating) {
    results = results.filter((w) => w.rating >= filters.minRating!);
  }
  
  const page = filters?.page || 1;
  const limit = 10;
  const start = (page - 1) * limit;
  
  return {
    data: results.slice(start, start + limit),
    total: results.length,
    page,
  };
}

export async function getWorkerReviews(workerId: string) {
  await delay(300);
  return [
    {
      id: "r1",
      clientName: "Maria Santos",
      rating: 5,
      comment: "Excellent service, very professional and on time!",
      date: "2026-02-28",
      bookingId: "BK-001",
    },
    {
      id: "r2",
      clientName: "Juan Dela Cruz",
      rating: 4,
      comment: "Good work, would definitely book again.",
      date: "2026-02-20",
      bookingId: "BK-002",
    },
  ];
}

// ============================================================================
// PAYMENT METHODS - CLIENT
// ============================================================================

export async function getPaymentMethods() {
  await delay(250);
  return [
    { id: "pm1", type: "card", lastFour: "4242", isDefault: true, expiryDate: "12/25" },
    { id: "pm2", type: "gcash", lastFour: "9171234567", isDefault: false },
  ];
}

export async function addPaymentMethod(data: {
  type: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  walletId?: string;
}) {
  await delay(400);
  const newId = "pm-" + Math.random().toString(36).substr(2, 6);
  return {
    id: newId,
    type: data.type,
    lastFour: data.cardNumber?.slice(-4) || data.walletId?.slice(-4) || "0000",
    isDefault: false,
    createdAt: new Date().toISOString(),
  };
}

export async function deletePaymentMethod(methodId: string) {
  await delay(300);
  return {
    success: true,
    message: "Payment method deleted successfully",
  };
}

export async function setDefaultPaymentMethod(methodId: string) {
  await delay(250);
  return {
    success: true,
    message: "Default payment method updated",
    methodId,
  };
}

// ============================================================================
// ADDRESSES - CLIENT
// ============================================================================

export async function getAddresses() {
  await delay(250);
  return [
    {
      id: "addr1",
      label: "Home",
      address: "123 Rizal St., Hagonoy, Bulacan",
      isDefault: true,
      coordinates: { lat: 14.3520, lng: 120.8157 },
    },
    {
      id: "addr2",
      label: "Work",
      address: "456 Main Ave., Manila",
      isDefault: false,
      coordinates: { lat: 14.5994, lng: 120.9842 },
    },
  ];
}

export async function addAddress(data: {
  label: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}) {
  await delay(400);
  const newId = "addr-" + Math.random().toString(36).substr(2, 6);
  return {
    id: newId,
    ...data,
    isDefault: false,
    createdAt: new Date().toISOString(),
  };
}

export async function updateAddress(addressId: string, data: any) {
  await delay(350);
  return {
    id: addressId,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

export async function deleteAddress(addressId: string) {
  await delay(300);
  return {
    success: true,
    message: "Address deleted successfully",
  };
}

export async function setDefaultAddress(addressId: string) {
  await delay(250);
  return {
    success: true,
    addressId,
  };
}

// ============================================================================
// TRANSACTIONS - CLIENT
// ============================================================================

export async function getTransactions(page?: number) {
  await delay(300);
  const limit = 10;
  const start = ((page || 1) - 1) * limit;
  return {
    data: dummyTransactions.slice(start, start + limit),
    total: dummyTransactions.length,
    page: page || 1,
  };
}

export async function getTransactionDetail(transactionId: string) {
  await delay(250);
  const txn = dummyTransactions.find((t) => t.id === transactionId);
  if (!txn) return null;
  return {
    ...txn,
    breakdown: {
      servicePrice: 600,
      tax: 0,
      tip: 0,
      total: 600,
    },
    booking: dummyBookings.find((b) => b.id === txn.bookingId),
  };
}

export async function downloadReceipt(transactionId: string) {
  await delay(400);
  return {
    success: true,
    url: `https://receipts.homeease.com/${transactionId}.pdf`,
    fileName: `receipt-${transactionId}.pdf`,
  };
}

// ============================================================================
// REVIEWS - CLIENT
// ============================================================================

export async function submitReview(
  bookingId: string,
  rating: number,
  comment: string,
) {
  await delay(400);
  return {
    id: "rev-" + Math.random().toString(36).substr(2, 6),
    bookingId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };
}

export async function getMyReviews(page?: number) {
  await delay(300);
  return {
    data: [
      {
        id: "rev1",
        workerName: "Juan Dela Cruz",
        workerId: "w1",
        rating: 5,
        comment: "Excellent plumbing work!",
        bookingId: "BK-001",
        date: "2026-02-28",
      },
    ],
    total: 1,
    page: page || 1,
  };
}

// ============================================================================
// MESSAGING
// ============================================================================

export async function getConversations() {
  await delay(300);
  return dummyConversations;
}

export async function getConversationDetail(conversationId: string) {
  await delay(300);
  return {
    id: conversationId,
    participantName: "Juan Dela Cruz",
    participantAvatar: null,
    messages: [
      { id: "m1", text: "Hi, when can you come?", sender: "other", timestamp: "10:30 AM" },
      { id: "m2", text: "I can be there around 2 PM", sender: "me", timestamp: "10:31 AM" },
      { id: "m3", text: "Perfect! See you then", sender: "other", timestamp: "10:32 AM" },
    ],
  };
}

export async function sendMessage(conversationId: string, text: string) {
  await delay(400);
  return {
    id: "msg-" + Date.now(),
    conversationId,
    text,
    sender: "me",
    timestamp: new Date().toISOString(),
  };
}

export async function markMessagesAsRead(conversationId: string) {
  await delay(250);
  return { success: true, conversationId };
}

// ============================================================================
// WORKER ENDPOINTS
// ============================================================================

export async function getJobRequests(status?: string) {
  await delay(350);
  const jobRequests = [
    {
      id: "jr1",
      clientName: "Maria Santos",
      clientRating: 4.8,
      service: "Plumbing Repair",
      date: "2026-03-15",
      time: "2:00 PM",
      estimatedPrice: 500,
      status: "Pending",
      description: "Leaking faucet in kitchen",
    },
    {
      id: "jr2",
      clientName: "Juan Dela Cruz",
      clientRating: 4.5,
      service: "Pipe Installation",
      date: "2026-03-16",
      time: "10:00 AM",
      estimatedPrice: 1500,
      status: "Pending",
      description: "New water line installation",
    },
  ];
  
  if (!status) return jobRequests;
  return jobRequests.filter((j) => j.status === status);
}

export async function getJobRequestDetail(requestId: string) {
  await delay(300);
  return {
    id: requestId,
    clientName: "Maria Santos",
    clientRating: 4.8,
    clientReviews: 45,
    clientAvatar: null,
    service: "Plumbing Repair",
    date: "2026-03-15",
    time: "2:00 PM",
    estimatedPrice: 500,
    address: "123 Rizal St., Hagonoy, Bulacan",
    description: "Leaking faucet in kitchen. Also check water pressure issues.",
    status: "Pending",
  };
}

export async function acceptJobRequest(requestId: string) {
  await delay(400);
  return {
    success: true,
    message: "Job request accepted",
    requestId,
    bookingId: "BK-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
  };
}

export async function declineJobRequest(requestId: string, reason?: string) {
  await delay(350);
  return {
    success: true,
    message: "Job request declined",
    requestId,
  };
}

export async function markJobComplete(bookingId: string) {
  await delay(400);
  return {
    success: true,
    message: "Job marked as complete",
    bookingId,
  };
}

export async function getEarnings() {
  await delay(300);
  return {
    totalBalance: 15420.50,
    availableBalance: 10240.00,
    pendingBalance: 5180.50,
    monthlyEarnings: 4500.00,
    totalEarnings: 45200.00,
    completedJobs: 234,
  };
}

export async function getWorkerTransactions(page?: number) {
  await delay(300);
  const limit = 10;
  const start = ((page || 1) - 1) * limit;
  return {
    data: dummyWorkerTransactions.slice(start, start + limit),
    total: dummyWorkerTransactions.length,
    page: page || 1,
  };
}

export async function getWorkerRecords(status?: string) {
  await delay(350);
  const records = dummyBookings.map((b) => ({
    ...b,
    clientName: b.worker,
    completionDate: "2026-02-28",
  }));
  
  if (!status) return records;
  return records.filter((r) => r.status === status);
}

export async function requestWithdrawal(amount: number, method: string) {
  await delay(500);
  return {
    id: "wd-" + Math.random().toString(36).substr(2, 6),
    amount,
    method,
    status: "Pending",
    requestedAt: new Date().toISOString(),
    expectedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    message: "Withdrawal requested. Funds will be transferred within 3-5 business days.",
  };
}

export async function getWorkerReviewsReceived(page?: number) {
  await delay(300);
  return {
    data: [
      {
        id: "wr1",
        clientName: "Maria Santos",
        rating: 5,
        comment: "Professional and reliable!",
        bookingId: "BK-001",
        date: "2026-02-28",
      },
    ],
    total: 156,
    page: page || 1,
    averageRating: 4.8,
  };
}

export async function updateWorkerSkills(skills: { name: string; level: string }[]) {
  await delay(350);
  return {
    success: true,
    skills,
    message: "Skills updated successfully",
  };
}

export async function getWorkerSkills() {
  await delay(250);
  return [
    { id: "s1", name: "Plumbing", level: "Expert" },
    { id: "s2", name: "Electrical", level: "Intermediate" },
  ];
}

export async function getResumeParsed() {
  await delay(400);
  return {
    skills: ["Plumbing", "Electrical Basics", "Customer Service"],
    yearsOfExperience: 8,
    masteryLevel: "Advanced",
    certifications: ["Plumbing License", "Safety Training"],
    summary: "Experienced plumber with 8 years of hands-on expertise in residential and commercial plumbing work.",
  };
}

// ============================================================================
// PROFILE ENDPOINTS
// ============================================================================

export async function updateProfile(data: {
  name?: string;
  phone?: string;
  email?: string;
  bio?: string;
  yearsOfExperience?: number;
  serviceArea?: string;
}) {
  await delay(400);
  return {
    success: true,
    message: "Profile updated successfully",
    ...data,
  };
}

export async function changePassword(currentPassword: string, newPassword: string) {
  await delay(400);
  return {
    success: true,
    message: "Password changed successfully",
  };
}

export async function updateNotificationPreferences(preferences: Record<string, boolean>) {
  await delay(350);
  return {
    success: true,
    preferences,
    message: "Notification preferences updated",
  };
}

export async function deleteAccount(password: string) {
  await delay(500);
  return {
    success: true,
    message: "Account deletion request submitted. You will receive a confirmation email.",
  };
}

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

