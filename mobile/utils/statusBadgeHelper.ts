import type { StatusType } from '../components/ui/StatusBadge';

export function getStatusColor(status: StatusType): string {
  switch (status) {
    case 'Pending':
    case 'Pending KYC':
      return '#F59E0B';
    case 'Accepted':
      return '#3B82F6';
    case 'Active':
      return '#4B5FD6';
    case 'Completed':
    case 'Credited':
    case 'Verified':
      return '#4CAF50';
    case 'Cancelled':
      return '#EF4444';
    default:
      return '#6B7299';
  }
}
