import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SectionCard from '../components/common/SectionCard'
import Badge from '../components/common/Badge'

const SUB_NAV = [
  { to: '/bookings', label: 'All Bookings' },
  { to: '/bookings/detail', label: 'Booking Detail' },
  { to: '/bookings/dispute', label: 'Booking Dispute' },
]

const DISPUTES = [
  { id: '#D01', booking: '#B198', raisedBy: 'Maria Santos', reason: 'Service not completed', status: 'Open' },
]

export default function BookingDispute() {
  return (
    <>
      <PageHeader
        title="Booking Dispute"
        subtitle="Resolve booking disputes"
        actions={<Link to="/bookings" className="btn btn-outline">Back</Link>}
      />
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Dispute ID</th><th>Booking</th><th>Raised By</th><th>Reason</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DISPUTES.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.booking}</td>
                  <td>{d.raisedBy}</td>
                  <td>{d.reason}</td>
                  <td><Badge variant="pending">{d.status}</Badge></td>
                  <td><button type="button" className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8125rem' }}>Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <SubNav items={SUB_NAV} />
    </>
  )
}
