import { Link } from 'react-router-dom'
import StatCard from '../components/common/StatCard'
import SectionCard from '../components/common/SectionCard'

const STATS = [
  { label: 'Total Users', value: '128', icon: 'fa-users', color: 'purple' },
  { label: 'Total Clients', value: '80', icon: 'fa-users', color: 'purple' },
  { label: 'Total Workers', value: '48', icon: 'fa-user-cog', color: 'blue' },
  { label: 'Pending Approvals', value: '3', icon: 'fa-check-circle', color: 'green' },
  { label: 'Active Bookings', value: '24', icon: 'fa-calendar-check', color: 'purple' },
  { label: 'Total Revenue', value: '₱12,450', icon: 'fa-peso-sign', color: 'blue' },
]

const ACTIVITIES = [
  { text: 'Maria Santos booked Juan Dela Cruz for plumbing repair.', time: 'Mar 1, 2025, 02:30 PM' },
  { text: 'Ana Reyes completed a cleaning service booking.', time: 'Mar 1, 2025, 11:00 AM' },
  { text: 'New worker registration: Pedro Garcia (Electrical).', time: 'Feb 28, 2025, 06:45 PM' },
]

const TOP_WORKERS = [
  { name: 'Juan Dela Cruz', services: 'Plumbing, Wiring, Installation', rating: '4.9', reviews: 128 },
  { name: 'Maria Santos', services: 'Cleaning, Laundry', rating: '4.8', reviews: 95 },
  { name: 'Pedro Garcia', services: 'Electrical, HVAC', rating: '4.7', reviews: 82 },
]

export default function Dashboard() {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Welcome back! Here&apos;s what&apos;s happening with HomeEaseAdmin today.
      </p>
      <div className="cards-row">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <SectionCard title="Bookings Trend (Last 7 Days)">
        <div className="chart-placeholder">Line chart placeholder — Bookings over time</div>
      </SectionCard>
      <div className="two-col">
        <SectionCard title="Recent Activities">
          <div className="activity-list">
            {ACTIVITIES.map((item, i) => (
              <div key={i} className="activity-item">
                <div className="icon">
                  <i className="fas fa-file-alt" />
                </div>
                <div>
                  <div>{item.text}</div>
                  <div className="time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Top Performing Workers">
          <div className="rank-list">
            {TOP_WORKERS.map((worker, i) => (
              <div key={i} className="rank-item">
                <div className="rank-num">{i + 1}</div>
                <div>
                  <div><strong>{worker.name}</strong></div>
                  <div className="meta">{worker.services}</div>
                </div>
                <div className="stars">
                  ★ {worker.rating} <span className="meta">({worker.reviews} reviews)</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="cta-buttons">
        <Link to="/verification" className="btn btn-primary">Approve Workers (3)</Link>
        <Link to="/bookings" className="btn btn-success">View Bookings (24)</Link>
        <Link to="/payments" className="btn btn-purple">Process Payments</Link>
        <Link to="/reports" className="btn btn-orange">Check Reports</Link>
        <Link to="/analytics" className="btn btn-outline">Analytics & Reports</Link>
      </div>
    </>
  )
}
