import { useBookingStore } from "../store/bookingStore";

const MAX_CONCURRENT_JOBS = 2;

/**
 * useWorkerCapacity
 *
 * Returns capacity info for a given worker based on their
 * active bookings in the store. Use this on the booking flow
 * to warn clients or block selection when a worker is full.
 *
 * Usage:
 *   const { isAtCapacity, activeJobCount } = useWorkerCapacity(workerId);
 */
export function useWorkerCapacity(workerName: string | null) {
  const bookings = useBookingStore((s) => s.bookings);

  if (!workerName) {
    return {
      isAtCapacity: false,
      activeJobCount: 0,
      maxJobs: MAX_CONCURRENT_JOBS,
      canAcceptJob: true,
    };
  }

  const activeJobCount = bookings.filter(
    (b) =>
      b.worker === workerName &&
      (b.status === "Accepted" ||
        b.status === "Active" ||
        b.status === "InProgress" ||
        b.status === "QuoteSubmitted" ||
        b.status === "QuoteApproved"),
  ).length;

  const isAtCapacity = activeJobCount >= MAX_CONCURRENT_JOBS;

  return {
    isAtCapacity,
    activeJobCount,
    maxJobs: MAX_CONCURRENT_JOBS,
    canAcceptJob: !isAtCapacity,
  };
}