import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import Badge from '../components/common/Badge'

const SUB_NAV = [
  { to: '/payments', label: 'All Transactions' },
]

const DETAILS = [
  { label: 'Transaction ID', value: '#T301' },
  { label: 'Booking', value: '#B201' },
  { label: 'Amount', value: '₱450' },
  { label: 'Method', value: 'GCash' },
  { label: 'Status', value: <Badge variant="approved">Completed</Badge> },
  { label: 'Date', value: 'Mar 1, 2025, 2:35 PM' },
]

export default function TransactionDetail() {
  return (
    <>
      <PageHeader
        title="Transaction Detail"
        subtitle="Transaction #T301"
        actions={<Link to="/payments" className="btn btn-outline">Back</Link>}
      />
      <div className="detail-grid">
        {DETAILS.map(({ label, value }) => (
          <div key={label} className="detail-block">
            <label>{label}</label>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
      <SubNav items={SUB_NAV} />
    </>
  )
}
