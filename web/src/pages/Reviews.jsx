import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SearchBar from '../components/common/SearchBar'
import FilterTabs from '../components/common/FilterTabs'
import SectionCard from '../components/common/SectionCard'
import Pagination from '../components/common/Pagination'

const SUB_NAV = [
  { to: '/reviews', label: 'All Reviews' },
  { to: '/reviews/flagged', label: 'Flagged Reviews' }
]

const REVIEWS = [
  { id: '#RV101', booking: '#B201', client: 'Maria Santos', worker: 'Juan Dela Cruz', rating: '5.0', comment: 'Very professional...', date: 'Mar 1, 2025' },
  { id: '#RV100', booking: '#B199', client: 'Pedro Lopez', worker: 'Maria Santos', rating: '4.5', comment: 'Good cleaning service...', date: 'Feb 28, 2025' },
]

export default function Reviews() {
  const [filterTab, setFilterTab] = useState('All')

  const filteredReviews = REVIEWS.filter((r) => {
    const rating = parseFloat(r.rating)
    if (Number.isNaN(rating)) return true

    if (filterTab === '5 Star') return rating >= 5
    if (filterTab === '1-2 Star') return rating >= 1 && rating <= 2

    return true
  })

  return (
    <>
      <PageHeader title="Ratings & Reviews Management" subtitle="All reviews" />
      <SubNav items={SUB_NAV} />
      <div className="toolbar">
        <SearchBar placeholder="Search reviews..." />
        <FilterTabs tabs={['All', '5 Star', '1-2 Star']} activeTab={filterTab} onTabChange={setFilterTab} />
      </div>
      <SectionCard>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Review ID</th><th>Booking</th><th>Client</th><th>Worker</th><th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.booking}</td>
                  <td>{r.client}</td>
                  <td>{r.worker}</td>
                  <td>★ {r.rating}</td>
                  <td>{r.comment}</td>
                  <td>{r.date}</td>
                  <td>
                    <Link to="/reviews/detail" className="action-btn view" title="View"><i className="fas fa-eye" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          info={`Showing ${filteredReviews.length} of ${REVIEWS.length} reviews`}
          hasPrev={false}
          hasNext={REVIEWS.length > filteredReviews.length}
        />
      </SectionCard>
    </>
  )
}
