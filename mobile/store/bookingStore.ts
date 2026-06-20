import { create } from 'zustand';
import { bookings as dummyBookings, workers } from '../constants/dummyData';
import { bookingStorage } from '../utils/storage';

export type BookingStatus =
  | 'Pending'
  | 'Accepted'
  | 'Active'
  | 'InProgress'
  | 'QuoteSubmitted'
  | 'QuoteApproved'
  | 'Disputed'
  | 'Completed'
  | 'Cancelled';

export type Quote = {
  laborCost: number;
  materialsCost: number;
  totalAmount: number;
  notes: string;
  submittedAt: string;
};

export type Booking = {
  id: string;
  service: string;
  worker: string;
  date: string;
  status: BookingStatus;
  amount: number;
  paymentMethod: string;
  rating?: number;
  reviewText?: string;
  quote?: Quote;
  address?: string;
  time?: string;
};

export type DraftBooking = {
  category: string | null;
  description: string;
  address: string | null;
  date: string | null;
  time: string | null;
  instructions?: string;
  workerId: string | null;
  paymentMethod: string | null;
  tip?: number;
  taxRate?: number;
  selectedTaskId: string | null;
  selectedAddOnIds: string[];
  estimatedPrice: number;
};

type BookingState = {
  bookings: Booking[];
  selectedBooking: Booking | null;
  draft: DraftBooking;
  setBookings: (bookings: Booking[]) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setDraft: (draft: Partial<DraftBooking>) => void;
  clearDraft: () => void;
  setCurrentBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  processPayment: (method: string, amount: number) => Promise<Booking>;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  restoreDraft: () => Promise<void>;
  // Quote flow actions
  submitQuote: (bookingId: string, quote: Quote) => void;
  approveQuote: (bookingId: string) => void;
  disputeQuote: (bookingId: string, reason: string) => void;
};

const initialDraft: DraftBooking = {
  category: null,
  description: '',
  address: null,
  date: null,
  time: null,
  instructions: '',
  workerId: null,
  paymentMethod: null,
  tip: 0,
  taxRate: 0.12,
  selectedTaskId: null,
  selectedAddOnIds: [],
  estimatedPrice: 0,
};

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [...dummyBookings] as unknown as Booking[],
  selectedBooking: null,
  draft: initialDraft,

  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),

  setDraft: (draft) =>
    set((s) => {
      const updated = { draft: { ...s.draft, ...draft } };
      bookingStorage.saveDraft(updated.draft);
      return updated;
    }),

  clearDraft: async () => {
    set({ draft: initialDraft });
    await bookingStorage.clearDraft();
  },

  setCurrentBooking: (booking) => set({ selectedBooking: booking }),

  updateBookingStatus: (id, status) =>
    set((state) => {
      const updatedBookings = state.bookings.map((b) =>
        b.id === id ? { ...b, status } : b,
      );
      const updatedSelected =
        state.selectedBooking?.id === id
          ? { ...state.selectedBooking, status }
          : state.selectedBooking;
      return { bookings: updatedBookings, selectedBooking: updatedSelected };
    }),

  submitQuote: (bookingId, quote) =>
    set((state) => {
      const updatedBookings = state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'QuoteSubmitted' as BookingStatus, quote, amount: quote.totalAmount }
          : b,
      );
      const updatedSelected =
        state.selectedBooking?.id === bookingId
          ? { ...state.selectedBooking, status: 'QuoteSubmitted' as BookingStatus, quote, amount: quote.totalAmount }
          : state.selectedBooking;
      return { bookings: updatedBookings, selectedBooking: updatedSelected };
    }),

  approveQuote: (bookingId) =>
    set((state) => {
      const updatedBookings = state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'QuoteApproved' as BookingStatus }
          : b,
      );
      const updatedSelected =
        state.selectedBooking?.id === bookingId
          ? { ...state.selectedBooking, status: 'QuoteApproved' as BookingStatus }
          : state.selectedBooking;
      return { bookings: updatedBookings, selectedBooking: updatedSelected };
    }),

  disputeQuote: (bookingId, _reason) =>
    set((state) => {
      const updatedBookings = state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'Disputed' as BookingStatus }
          : b,
      );
      const updatedSelected =
        state.selectedBooking?.id === bookingId
          ? { ...state.selectedBooking, status: 'Disputed' as BookingStatus }
          : state.selectedBooking;
      return { bookings: updatedBookings, selectedBooking: updatedSelected };
    }),

  processPayment: (method, amount) =>
    new Promise<Booking>((resolve) => {
      let createdBooking: Booking | null = null;

      set((state) => {
        const nextIndex = state.bookings.length + 1;
        const id = `BK-${String(nextIndex).padStart(3, '0')}`;
        const now = new Date().toISOString();

        const workerRecord = workers.find((w) => w.id === state.draft.workerId);
        const workerDisplayName =
          workerRecord?.name ?? state.draft.workerId ?? 'Any Worker';

        const booking: Booking = {
          id,
          service: state.draft.category ?? 'Service',
          worker: workerDisplayName,
          date: now,
          status: 'Pending',
          amount,
          paymentMethod: method,
          address: state.draft.address ?? undefined,
          time: state.draft.time ?? undefined,
        };

        createdBooking = booking;

        return {
          bookings: [...state.bookings, booking],
          selectedBooking: booking,
          draft: initialDraft,
        };
      });

      bookingStorage.clearDraft();

      setTimeout(() => {
        if (createdBooking) resolve(createdBooking);
      }, 1200);
    }),

  submitReview: (bookingId, rating, comment) =>
    set((state) => {
      const updatedBookings = state.bookings.map((b) =>
        b.id === bookingId ? { ...b, rating, reviewText: comment } : b,
      );
      const updatedSelected =
        state.selectedBooking?.id === bookingId
          ? { ...state.selectedBooking, rating, reviewText: comment }
          : state.selectedBooking;
      return { bookings: updatedBookings, selectedBooking: updatedSelected };
    }),

  restoreDraft: async () => {
    const savedDraft = await bookingStorage.getDraft();
    if (savedDraft) set({ draft: savedDraft });
  },
}));