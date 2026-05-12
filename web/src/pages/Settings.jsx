import SectionCard from '../components/common/SectionCard'

export default function Settings() {
  return (
    <>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">General administration settings</p>
      <SectionCard title="General">
        <div className="detail-grid">
          <div className="detail-block">
            <label>Site Name</label>
            <div className="value">HomeEaseAdmin</div>
          </div>
          <div className="detail-block">
            <label>Support Email</label>
            <div className="value">support@HomeEaseAdmin.com</div>
          </div>
        </div>
        <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
      </SectionCard>
      <SectionCard title="Notifications">
        <p className="page-subtitle">Configure email and in-app notifications.</p>
        <button type="button" className="btn btn-outline">Configure</button>
      </SectionCard>
    </>
  )
}
