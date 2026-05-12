import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import Badge from '../components/common/Badge'

const SUB_NAV = [
  { to: '/bookings', label: 'All Bookings' },
  
]

const DETAILS = [
  { label: 'Booking ID', value: '#B201' },
  { label: 'Client', value: 'Maria Santos' },
  { label: 'Worker', value: 'Juan Dela Cruz' },
  { label: 'Service', value: 'Plumbing Repair' },
  { label: 'Date & Time', value: 'Mar 1, 2025, 2:00 PM' },
  { label: 'Status', value: <Badge variant="approved">Completed</Badge> },
  { label: 'Amount', value: '₱450' },
]

export default function BookingDetail() {
  return (
    <>
      <PageHeader
        title="Booking Detail"
        subtitle="Booking #B201"
        actions={<Link to="/bookings" className="btn btn-outline">Back</Link>}
      />
      <div className="detail-grid">
        {DETAILS.map(({ label, value }) => (
          <div key={label} className="detail-block">
            <label>{label}</label>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
      <SubNav items={SUB_NAV} />
    </>
  )
}
