import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'

const DETAILS = [
  { label: 'Applicant', value: 'Pedro Garcia' },
  { label: 'Submitted', value: 'Feb 28, 2025' },
  { label: 'Document Type', value: 'ID + Proof of Address' },
]

export default function VerificationDetail() {
  return (
    <>
      <PageHeader
        title="Verification Detail Review"
        subtitle="Review documents and approve or reject"
        actions={<Link to="/verification" className="btn btn-outline">Back to Pending</Link>}
      />
      <div className="detail-grid">
        {DETAILS.map(({ label, value }) => (
          <div key={label} className="detail-block">
            <label>{label}</label>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
      <SectionCard title="Uploaded Documents">
        <div className="chart-placeholder" style={{ height: 120 }}>Document preview placeholder</div>
      </SectionCard>
      <div className="cta-buttons">
        <Link to="/verification" className="btn btn-success">Approve Verification</Link>
        <Link to="/verification" className="btn btn-danger">Reject Verification</Link>
      </div>
    </>
  )
}
