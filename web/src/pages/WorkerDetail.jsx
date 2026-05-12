import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import Badge from '../components/common/Badge'

const DETAILS = [
  { label: 'Worker ID', value: '#W501' },
  { label: 'Full Name', value: 'Juan Dela Cruz' },
  { label: 'Email', value: 'juan.d@email.com' },
  { label: 'Services', value: 'Plumbing, Wiring, Installation' },
  { label: 'Rating', value: '★ 4.9 (128 reviews)' },
  { label: 'Total Earnings', value: '₱18,450' },
  { label: 'Verification', value: <Badge variant="approved">Verified</Badge> },
  { label: 'Joined', value: 'Dec 10, 2024' },
]

const BOOKINGS = [
  { id: '#B201', client: 'Maria Santos', service: 'Plumbing', date: 'Mar 1, 2025', earnings: '₱450' },
  { id: '#B195', client: 'Pedro Lopez', service: 'Wiring', date: 'Feb 27, 2025', earnings: '₱620' },
]

export default function WorkerDetail() {
  return (
    <>
      <PageHeader
        title="Worker Detail"
        subtitle="View and manage worker profile"
        actions={(
          <>
            <Link to="/workers" className="btn btn-outline">Back to Workers</Link>
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
                <th>Booking ID</th><th>Client</th><th>Service</th><th>Date</th><th>Earnings</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td><td>{b.client}</td><td>{b.service}</td><td>{b.date}</td><td>{b.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  )
}
