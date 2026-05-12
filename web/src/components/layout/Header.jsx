export default function Header() {
  return (
    <header className="header">
      <div className="header-left">HomeEaseAdmin</div>
      <div className="header-right">
        <button className="icon-btn" title="Notifications">
          <i className="fas fa-bell" />
          <span className="badge">3</span>
        </button>
        <div className="user-menu">
          <div className="avatar">A</div>
          <span className="user-email">admin@homeeaseadmin.com</span>
          <i className="fas fa-chevron-down" />
        </div>
      </div>
    </header>
  )
}
