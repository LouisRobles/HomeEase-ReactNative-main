import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'

export default function SuspendUser() {
  return (
    <>
      <PageHeader
        title="Suspend / Ban User"
        subtitle="Suspend or permanently ban a user account"
        actions={<Link to="/users" className="btn btn-outline">Back to Users</Link>}
      />
      <SectionCard style={{ maxWidth: 480 }}>
        <h3>Reason for suspension</h3>
        <p className="page-subtitle" style={{ marginBottom: '1rem' }}>
          Select a reason and add optional notes.
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Reason</label>
          <select style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.9375rem' }}>
            <option>Violation of terms</option>
            <option>Fraudulent activity</option>
            <option>Harassment</option>
            <option>Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Notes (optional)</label>
          <textarea rows={3} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.9375rem' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="btn btn-danger">Suspend User</button>
          <Link to="/users" className="btn btn-outline">Cancel</Link>
        </div>
      </SectionCard>
    </>
  )
}
