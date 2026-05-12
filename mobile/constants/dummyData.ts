export const workers = [
  {
    id: 'w1',
    name: 'Juan Dela Cruz',
    service: 'Plumbing',
    rate: 250,
    rating: 4.8,
    reviews: 120,
    status: 'available'
  },
  {
    id: 'w2',
    name: 'Maria Santos',
    service: 'Electrical',
    rate: 300,
    rating: 4.9,
    reviews: 98,
    status: 'available'
  },
  {
    id: 'w3',
    name: 'Pedro Reyes',
    service: 'Aircon Services',
    rate: 350,
    rating: 4.7,
    reviews: 75,
    status: 'unavailable'
  },
  {
    id: 'w4',
    name: 'Ana Lim',
    service: 'House Cleaning',
    rate: 200,
    rating: 5.0,
    reviews: 200,
    status: 'available'
  },
  {
    id: 'w5',
    name: 'Jose Garcia',
    service: 'Carpentry',
    rate: 280,
    rating: 4.6,
    reviews: 55,
    status: 'available'
  }
] as const;

export const categories = [
  { id: 'plumbing', name: 'Plumbing', count: 24 },
  { id: 'electrical', name: 'Electrical', count: 18 },
  { id: 'aircon', name: 'Aircon', count: 15 },
  { id: 'cleaning', name: 'Cleaning', count: 32 },
  { id: 'carpentry', name: 'Carpentry', count: 12 },
  { id: 'painting', name: 'Painting', count: 9 },
  { id: 'gardening', name: 'Gardening', count: 7 },
  { id: 'appliance', name: 'Appliance', count: 20 }
] as const;

export const bookings = [
  {
    id: 'BK-001',
    service: 'House Cleaning',
    worker: 'Ana Lim',
    date: '2026-03-01',
    status: 'Pending',
    amount: 400,
    paymentMethod: 'GCash'
  },
  {
    id: 'BK-002',
    service: 'Plumbing',
    worker: 'Juan',
    date: '2026-02-28',
    status: 'Active',
    amount: 500,
    paymentMethod: 'Cash'
  },
  {
    id: 'BK-003',
    service: 'Electrical',
    worker: 'Maria',
    date: '2026-02-20',
    status: 'Completed',
    amount: 600,
    paymentMethod: 'Maya'
  },
  {
    id: 'BK-004',
    service: 'Aircon',
    worker: 'Pedro',
    date: '2026-02-15',
    status: 'Cancelled',
    amount: 700,
    paymentMethod: 'GCash'
  }
] as const;

export const transactions = [
  {
    id: 'TXN-001',
    bookingId: 'BK-003',
    amount: 600,
    method: 'GCash',
    status: 'Completed',
    date: '2026-02-20'
  },
  {
    id: 'TXN-002',
    bookingId: 'BK-001',
    amount: 400,
    method: 'Cash',
    status: 'Pending',
    date: '2026-03-01'
  },
  {
    id: 'TXN-003',
    bookingId: 'BK-002',
    amount: 500,
    method: 'Maya',
    status: 'Completed',
    date: '2026-02-28'
  }
] as const;

export const conversations = [
  {
    id: 'c1',
    name: 'Juan Dela Cruz',
    lastMessage: 'On my way na po!',
    time: '10:30 AM',
    unread: 2
  },
  {
    id: 'c2',
    name: 'Ana Lim',
    lastMessage: 'Done na po, please check.',
    time: 'Yesterday',
    unread: 0
  },
  {
    id: 'c3',
    name: 'Maria Santos',
    lastMessage: 'Sige po, confirmed!',
    time: 'Mon',
    unread: 1
  }
] as const;

export const notifications = [
  {
    id: 'n1',
    title: 'Booking Confirmed',
    body: 'BK-001 accepted',
    time: '5 mins ago',
    type: 'booking',
    isRead: false
  },
  {
    id: 'n2',
    title: 'Payment Received',
    body: '₱600 confirmed',
    time: '1 hour ago',
    type: 'payment',
    isRead: false
  },
  {
    id: 'n3',
    title: 'Job Completed',
    body: 'Ana Lim completed',
    time: 'Yesterday',
    type: 'booking',
    isRead: true
  },
  {
    id: 'n4',
    title: 'New Message',
    body: 'Message from Juan',
    time: 'Mon',
    type: 'message',
    isRead: true
  }
] as const;

export const jobRequests = [
  {
    id: 'req1',
    client: 'Carlo Mendoza',
    service: 'House Cleaning',
    date: '2026-03-01',
    amount: 400,
    status: 'Pending'
  },
  {
    id: 'req2',
    client: 'Liza Torres',
    service: 'Plumbing',
    date: '2026-03-02',
    amount: 500,
    status: 'Pending'
  }
] as const;

