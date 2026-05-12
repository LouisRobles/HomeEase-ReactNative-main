import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import Badge from '../components/common/Badge'

const DETAILS = [
  { label: 'Client ID', value: '#1001' },
  { label: 'Full Name', value: 'Maria Santos' },
  { label: 'Email', value: 'maria.s@email.com' },
  { label: 'Phone', value: '0917 123 4567' },
  { label: 'Status', value: <Badge variant="active">active</Badge> },
  { label: 'Total Bookings', value: '12' },
  { label: 'Total Spent', value: '₱4,240' },
  { label: 'Joined', value: 'Jan 15, 2025' },
]

const BOOKINGS = [
  { id: '#B201', service: 'Plumbing', worker: 'Juan Dela Cruz', date: 'Mar 1, 2025', status: 'Completed' },
  { id: '#B198', service: 'Cleaning', worker: 'Ana Reyes', date: 'Feb 28, 2025', status: 'Completed' },
]

export default function ClientDetail() {
  return (
    <>
      <PageHeader
        title="Client Detail"
        subtitle="View and manage client information"
        actions={(
          <>
            <Link to="/users" className="btn btn-outline">Back to Users</Link>
            <Link to="/users/suspend" className="btn btn-danger">Suspend / Ban User</Link>
          </>
        )}
      />
      <div className="detail-grid">
        {DETAILS.map(({ label, value }) => (
          <div key={label} className="detail-block">
            <label>{label}</label>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
      <SectionCard title="Recent Bookings">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Service</th><th>Worker</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td><td>{b.service}</td><td>{b.worker}</td><td>{b.date}</td>
                  <td><Badge variant="approved">{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  )
}
