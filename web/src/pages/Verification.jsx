import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import FilterTabs from '../components/common/FilterTabs'

// type: 'client' or 'worker'
const PENDING = [
  {
    name: 'Pedro Garcia',
    email: 'pedro.g@email.com',
    services: 'Electrical, HVAC',
    submitted: 'Feb 28, 2025',
    type: 'worker',
  },
  {
    name: 'Rosa Martinez',
    email: 'rosa.m@email.com',
    services: 'Cleaning',
    submitted: 'Feb 27, 2025',
    type: 'worker',
  },
  {
    name: 'Maria Santos',
    email: 'maria.s@email.com',
    services: 'Account verification',
    submitted: 'Mar 2, 2025',
    type: 'client',
  },
]

export default function Verification() {
  const [filterTab, setFilterTab] = useState('All')

  const filtered = PENDING.filter((row) => {
    if (filterTab === 'Clients') return row.type === 'client'
    if (filterTab === 'Workers') return row.type === 'worker'
    return true
  })

  return (
    <>
      <PageHeader title="Verification Management" subtitle="Pending account verifications" />
      <div className="toolbar" style={{ marginBottom: '1rem' }}>
        <FilterTabs
          tabs={['All', 'Clients', 'Workers']}
          activeTab={filterTab}
          onTabChange={setFilterTab}
        />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Email</th>
                <th>Type</th>
                <th>Services / Reason</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.email}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{row.type}</td>
                  <td>{row.services}</td>
                  <td>{row.submitted}</td>
                  <td>
                    <div className="row-actions">
                      <Link to="/verification/detail" className="action-btn view">
                        <i className="fas fa-eye" />
                      </Link>
                      <Link to="/verification/approve" className="action-btn approve">
                        <i className="fas fa-check" />
                      </Link>
                      <button type="button" className="action-btn delete">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  )
}
