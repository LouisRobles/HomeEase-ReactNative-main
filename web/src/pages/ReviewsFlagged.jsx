import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SectionCard from '../components/common/SectionCard'

const SUB_NAV = [
  { to: '/reviews', label: 'All Reviews' },
  { to: '/reviews/flagged', label: 'Flagged Reviews' }
]

const FLAGGED = [
  { id: '#RV098', worker: 'Pedro Garcia', rating: '2.0', reason: 'Inappropriate content' },
]

export default function ReviewsFlagged() {
  return (
    <>
      <PageHeader title="Flagged Reviews" subtitle="Reviews reported by users" />
      <SubNav items={SUB_NAV} />
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Review</th><th>Worker</th><th>Rating</th><th>Flag Reason</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {FLAGGED.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.worker}</td>
                  <td>★ {r.rating}</td>
                  <td>{r.reason}</td>
                  <td>
                    <button type="button" className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}>Review</button>
                    <button type="button" className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>Dismiss</button>
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
