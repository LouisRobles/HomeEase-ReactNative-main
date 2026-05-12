import { Link } from 'react-router-dom'
import StatCard from '../components/common/StatCard'
import SectionCard from '../components/common/SectionCard'

const STATS = [
  { label: 'Page Views', value: '12.4k', icon: 'fa-eye', color: 'blue' },
  { label: 'Conversion Rate', value: '4.2%', icon: 'fa-chart-line', color: 'green' },
  { label: 'Avg. Session', value: '3m 42s', icon: 'fa-clock', color: 'purple' },
]

export default function Analytics() {
  return (
    <>
      <h1 className="page-title">Analytics & Reports</h1>
      <p className="page-subtitle">View platform metrics and performance analytics.</p>
      <div className="cards-row">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <SectionCard title="Traffic Overview">
        <div className="chart-placeholder">Chart: Traffic over time</div>
      </SectionCard>
      <SectionCard title="Service Category Performance">
        <div className="chart-placeholder">Chart: Bookings by category</div>
      </SectionCard>
      <Link to="/dashboard" className="btn btn-outline">Back to Dashboard</Link>
    </>
  )
}
