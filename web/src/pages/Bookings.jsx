import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SearchBar from '../components/common/SearchBar'
import FilterTabs from '../components/common/FilterTabs'
import SectionCard from '../components/common/SectionCard'
import Pagination from '../components/common/Pagination'
import Badge from '../components/common/Badge'

const SUB_NAV = [
  { to: '/bookings', label: 'All Bookings' },
]

const BOOKINGS = [
  { id: '#B201', client: 'Maria Santos', worker: 'Juan Dela Cruz', service: 'Plumbing', date: 'Mar 1, 2025', amount: '₱450', status: 'Completed' },
  { id: '#B200', client: 'Ana Reyes', worker: 'Pedro Garcia', service: 'Electrical', date: 'Mar 2, 2025', amount: '₱620', status: 'Pending' },
  { id: '#B199', client: 'Pedro Lopez', worker: 'Maria Santos', service: 'Cleaning', date: 'Feb 28, 2025', amount: '₱350', status: 'Completed' },
]

export default function Bookings() {
  const [filterTab, setFilterTab] = useState('All')

  const filteredBookings = BOOKINGS.filter((b) => {
    if (filterTab === 'Pending') return b.status === 'Pending'
    if (filterTab === 'Completed') return b.status === 'Completed'
    if (filterTab === 'Cancelled') return b.status === 'Cancelled'
    return true
  })

  return (
    <>
      <PageHeader
        title="Booking Management"
        subtitle="All bookings"
      />
      <SubNav items={SUB_NAV} />
      <div className="toolbar">
        <SearchBar placeholder="Search bookings..." />
        <FilterTabs tabs={['All', 'Pending', 'Completed', 'Cancelled']} activeTab={filterTab} onTabChange={setFilterTab} />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Client</th><th>Worker</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.client}</td>
                  <td>{b.worker}</td>
                  <td>{b.service}</td>
                  <td>{b.date}</td>
                  <td>{b.amount}</td>
                  <td><Badge variant={b.status === 'Completed' ? 'approved' : 'pending'}>{b.status}</Badge></td>
                  <td>
                    <Link to="/bookings/detail" className="action-btn view" title="View"><i className="fas fa-eye" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          info={`Showing ${filteredBookings.length} of ${BOOKINGS.length} bookings`}
          hasPrev={false}
          hasNext={BOOKINGS.length > filteredBookings.length}
        />
      </SectionCard>
    </>
  )
}
