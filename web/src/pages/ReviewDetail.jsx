import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SubNav from '../components/common/SubNav'
import SectionCard from '../components/common/SectionCard'

const SUB_NAV = [
  { to: '/reviews', label: 'All Reviews' },
  { to: '/reviews/flagged', label: 'Flagged Reviews' },
  { to: '/reviews/detail', label: 'Review Detail' },
]

export default function ReviewDetail() {
  return (
    <>
      <PageHeader
        title="Review Detail"
        subtitle="Review #RV101"
        actions={<Link to="/reviews" className="btn btn-outline">Back</Link>}
      />
      <SectionCard>
        <p><strong>Client:</strong> Maria Santos</p>
        <p><strong>Worker:</strong> Juan Dela Cruz</p>
        <p><strong>Rating:</strong> ★★★★★ 5.0</p>
        <p><strong>Comment:</strong> Very professional and fixed the issue quickly. Highly recommend!</p>
        <p><strong>Date:</strong> Mar 1, 2025</p>
      </SectionCard>
      <SubNav items={SUB_NAV} />
    </>
  )
}
