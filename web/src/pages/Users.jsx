import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SearchBar from '../components/common/SearchBar'
import FilterTabs from '../components/common/FilterTabs'
import SectionCard from '../components/common/SectionCard'
import Pagination from '../components/common/Pagination'
import Badge from '../components/common/Badge'

// Clients only for this page
const CLIENTS = [
  {
    id: '#1001',
    name: 'Maria Santos',
    email: 'maria.s@email.com',
    phone: '0917 123 4567',
    status: 'active',
    bookings: 12,
    spent: '₱4,240',
  },
  {
    id: '#1003',
    name: 'Ana Reyes',
    email: 'ana.r@email.com',
    phone: '0919 345 6789',
    status: 'active',
    bookings: 5,
    spent: '₱1,890',
  },
  {
    id: '#1004',
    name: 'Pedro Garcia',
    email: 'pedro.g@email.com',
    phone: '0920 456 7890',
    status: 'active',
    bookings: 3,
    spent: '₱1,240',
  },
]

export default function Users() {
  const [filterTab, setFilterTab] = useState('All')

  const filteredClients = CLIENTS.filter((u) => {
    if (filterTab === 'Active') return u.status === 'active'
    if (filterTab === 'Suspended') return u.status === 'suspended'
    return true
  })

  return (
    <>
      <PageHeader title="Client List" subtitle="All registered clients" />
      <div className="toolbar">
        <SearchBar placeholder="Search by name, email, or phone..." />
        <FilterTabs tabs={['All', 'Active', 'Suspended']} activeTab={filterTab} onTabChange={setFilterTab} />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Badge variant={user.status === 'active' ? 'active' : 'suspended'}>{user.status}</Badge>
                  </td>
                  <td>{user.bookings}</td>
                  <td>{user.spent}</td>
                  <td>
                    <div className="row-actions">
                      <Link to="/users/client/1001" className="action-btn view" title="View">
                        <i className="fas fa-eye" />
                      </Link>
                      <button type="button" className="action-btn delete" title="Suspend">
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          info={`Showing ${filteredClients.length} of ${CLIENTS.length} clients`}
          hasPrev={false}
          hasNext={false}
        />
      </SectionCard>
    </>
  )
}
