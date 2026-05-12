import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SectionCard from '../components/common/SectionCard'
import Badge from '../components/common/Badge'

const SUB_NAV = [
  { to: '/payments', label: 'All Transactions' },
  { to: '/payments/transaction', label: 'Transaction Detail' },
  { to: '/payments/refunds', label: 'Refund Management' },
]

const REFUNDS = [
  { id: '#R01', transaction: '#T298', amount: '₱350', reason: 'Cancelled by client', status: 'Pending' },
]

export default function Refunds() {
  return (
    <>
      <PageHeader title="Refund Management" subtitle="Process and track refunds" />
      <SubNav items={SUB_NAV} />
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Refund ID</th><th>Transaction</th><th>Amount</th><th>Reason</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {REFUNDS.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.transaction}</td>
                  <td>{r.amount}</td>
                  <td>{r.reason}</td>
                  <td><Badge variant="pending">{r.status}</Badge></td>
                  <td><button type="button" className="btn btn-success" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8125rem' }}>Process</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  )
}
