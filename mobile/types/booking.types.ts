export type BookingStatus = 'Pending' | 'Active' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  service: string;
  worker: string;
  workerId?: string;
  date: string;
  time?: string;
  status: BookingStatus;
  amount: number;
  paymentMethod: string;
  address?: string;
};
