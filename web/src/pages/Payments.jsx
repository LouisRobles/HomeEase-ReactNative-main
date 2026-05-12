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
  { to: '/payments', label: 'All Transactions' }
]

const TRANSACTIONS = [
  { id: '#T301', booking: '#B201', user: 'Maria Santos', amount: '₱450', method: 'GCash', date: 'Mar 1, 2025', status: 'Completed' },
  { id: '#T300', booking: '#B200', user: 'Ana Reyes', amount: '₱620', method: 'Card', date: 'Mar 1, 2025', status: 'Pending' },
]

export default function Payments() {
  const [filterTab, setFilterTab] = useState('All')

  const filteredTransactions = TRANSACTIONS.filter((t) => {
    if (filterTab === 'Completed') return t.status === 'Completed'
    if (filterTab === 'Pending') return t.status === 'Pending'
    if (filterTab === 'Failed') return t.status === 'Failed'
    return true
  })

  return (
    <>
      <PageHeader title="Payment Management" subtitle="All transactions" />
      <SubNav items={SUB_NAV} />
      <div className="toolbar">
        <SearchBar placeholder="Search transactions..." />
        <FilterTabs tabs={['All', 'Completed', 'Pending', 'Failed']} activeTab={filterTab} onTabChange={setFilterTab} />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th><th>Booking</th><th>User</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.booking}</td>
                  <td>{t.user}</td>
                  <td>{t.amount}</td>
                  <td>{t.method}</td>
                  <td>{t.date}</td>
                  <td><Badge variant={t.status === 'Completed' ? 'approved' : 'pending'}>{t.status}</Badge></td>
                  <td>
                    <Link to="/payments/transaction" className="action-btn view" title="View"><i className="fas fa-eye" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          info={`Showing ${filteredTransactions.length} of ${TRANSACTIONS.length} transactions`}
          hasPrev={false}
          hasNext={TRANSACTIONS.length > filteredTransactions.length}
        />
      </SectionCard>
    </>
  )
}
