import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SearchBar from '../components/common/SearchBar'
import FilterTabs from '../components/common/FilterTabs'
import SectionCard from '../components/common/SectionCard'
import Pagination from '../components/common/Pagination'
import Badge from '../components/common/Badge'

const WORKERS = [
  { id: '#W501', name: 'Juan Dela Cruz', services: 'Plumbing, Wiring', rating: '4.9', status: 'Verified', earnings: '₱18,450' },
  { id: '#W502', name: 'Maria Santos', services: 'Cleaning, Laundry', rating: '4.8', status: 'Verified', earnings: '₱12,100' },
  { id: '#W503', name: 'Pedro Garcia', services: 'Electrical, HVAC', rating: '4.7', status: 'Pending', earnings: '₱0' },
]

export default function Workers() {
  const [filterTab, setFilterTab] = useState('All')

  const filteredWorkers = WORKERS.filter((w) => {
    if (filterTab === 'Verified') return w.status === 'Verified'
    if (filterTab === 'Pending') return w.status === 'Pending'
    return true
  })

  return (
    <>
      <PageHeader
        title="Workers"
        subtitle="Manage all registered workers"
      />
      <div className="toolbar">
        <SearchBar placeholder="Search workers..." />
        <FilterTabs tabs={['All', 'Verified', 'Pending']} activeTab={filterTab} onTabChange={setFilterTab} />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Worker ID</th><th>Name</th><th>Services</th><th>Rating</th><th>Status</th><th>Earnings</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.services}</td>
                  <td>★ {worker.rating}</td>
                  <td><Badge variant={worker.status === 'Verified' ? 'approved' : 'pending'}>{worker.status}</Badge></td>
                  <td>{worker.earnings}</td>
                  <td>
                    <div className="row-actions">
                      <Link to="/workers/501" className="action-btn view" title="View"><i className="fas fa-eye" /></Link>
                      <button type="button" className="action-btn delete" title="Suspend"><i className="fas fa-trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          info={`Showing ${filteredWorkers.length} of ${WORKERS.length} workers`}
          hasPrev={false}
          hasNext={false}
        />
      </SectionCard>
    </>
  )
}
