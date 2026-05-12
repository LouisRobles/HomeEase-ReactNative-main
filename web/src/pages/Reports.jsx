import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SectionCard from '../components/common/SectionCard'
import Pagination from '../components/common/Pagination'
import Badge from '../components/common/Badge'
import FilterTabs from '../components/common/FilterTabs'

const SUB_NAV = [
  { to: '/reports/logs', label: 'System Logs' },
  { to: '/reports/service', label: 'Service Reports' },
  { to: '/reports/activity', label: 'User Activity Reports' },
  { to: '/reports/export', label: 'Export Reports' },
]

const LOGS = [
  { time: 'Mar 1, 2025 14:35:02', level: 'INFO', source: 'API', message: 'Booking #B201 completed' },
  { time: 'Mar 1, 2025 14:30:15', level: 'INFO', source: 'Auth', message: 'User login: maria.s@email.com' },
  { time: 'Mar 1, 2025 11:00:00', level: 'WARN', source: 'Payment', message: 'Retry attempt for T299' },
  { time: 'Feb 28, 2025 18:45:22', level: 'INFO', source: 'Verification', message: 'New submission: Pedro Garcia' },
]

const TITLES = {
  logs: ['System Logs', 'View and filter logs'],
  service: ['Service Reports', 'View and filter logs'],
  activity: ['User Activity Reports', 'View and filter logs'],
  export: ['Export Reports', 'Export data to CSV or PDF'],
}

export default function Reports() {
  const { pathname } = useLocation()
  const path = pathname.replace(/^\//, '') || 'reports'
  const view = path.includes('export') ? 'export' : path.includes('activity') ? 'activity' : path.includes('service') ? 'service' : 'logs'
  const [title, subtitle] = TITLES[view] || TITLES.logs
  const [levelTab, setLevelTab] = useState('All')

  const filteredLogs = LOGS.filter((log) => {
    if (levelTab === 'Info') return log.level === 'INFO'
    if (levelTab === 'Warn') return log.level === 'WARN'
    return true
  })

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={view === 'export' ? (
          <button type="button" className="btn btn-primary">
            <i className="fas fa-download" /> Export
          </button>
        ) : null}
      />
      <SubNav items={SUB_NAV} />
      <SectionCard>
        {view === 'export' ? (
          <>
            <p style={{ marginBottom: '1rem' }}>Select report type and date range to export.</p>
            <div className="detail-grid" style={{ marginBottom: '1rem' }}>
              <div className="detail-block">
                <label>Report Type</label>
                <select style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <option>Bookings</option>
                  <option>Payments</option>
                  <option>Users</option>
                  <option>Reviews</option>
                </select>
              </div>
              <div className="detail-block">
                <label>From</label>
                <input type="date" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8 }} />
              </div>
              <div className="detail-block">
                <label>To</label>
                <input type="date" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8 }} />
              </div>
              <div className="detail-block">
                <label>Format</label>
                <select style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <option>CSV</option>
                  <option>PDF</option>
                </select>
              </div>
            </div>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-download" /> Generate Export
            </button>
          </>
        ) : (
          <>
            <div className="toolbar" style={{ marginBottom: '1rem' }}>
              <FilterTabs
                tabs={['All', 'Info', 'Warn']}
                activeTab={levelTab}
                onTabChange={setLevelTab}
              />
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Timestamp</th><th>Level</th><th>Source</th><th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, i) => (
                    <tr key={i}>
                      <td>{log.time}</td>
                      <td><Badge variant={log.level === 'WARN' ? 'pending' : 'active'}>{log.level}</Badge></td>
                      <td>{log.source}</td>
                      <td>{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              info={`Showing ${filteredLogs.length} of ${LOGS.length} log entries`}
              hasPrev={false}
              hasNext={LOGS.length > filteredLogs.length}
            />
          </>
        )}
      </SectionCard>
    </>
  )
}
