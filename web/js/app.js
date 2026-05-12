(function () {
  'use strict';

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => el.querySelectorAll(sel);

  const mainContent = $('#main-content');
  const navItems = $$('.nav-item');

  function getHash() {
    const hash = (window.location.hash || '#dashboard').slice(1);
    return hash || 'dashboard';
  }

  function getSection(pageId) {
    const map = {
      dashboard: 'dashboard', analytics: 'dashboard',
      users: 'users', 'users-clients': 'users', 'users-workers': 'users', 'client-detail': 'users', 'worker-detail': 'users', 'suspend-user': 'users',
      workers: 'workers',
      verification: 'verification', 'verification-detail': 'verification', 'approve-verification': 'verification', 'reject-verification': 'verification',
      bookings: 'bookings', 'booking-detail': 'bookings', 'booking-dispute': 'bookings',
      payments: 'payments', 'transaction-detail': 'payments', 'refunds': 'payments',
      reviews: 'reviews', 'reviews-flagged': 'reviews', 'review-detail': 'reviews',
      reports: 'reports', 'reports-logs': 'reports', 'reports-service': 'reports', 'reports-activity': 'reports', 'reports-export': 'reports',
      settings: 'settings'
    };
    return map[pageId] || 'dashboard';
  }

  function setActiveNav(pageId) {
    const section = getSection(pageId);
    navItems.forEach(item => {
      const isActive = item.dataset.page === section;
      item.classList.toggle('active', isActive);
    });
  }

  function renderDashboard() {
    return `
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back! Here's what's happening with HomeEaseAdmin today.</p>8
      <div class="cards-row">
        <div class="stat-card">
          <div>
            <div class="label">Total Users</div>
            <div class="value">128</div>
          </div>
          <div class="icon-wrap purple"><i class="fas fa-users"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <div class="label">Total Workers</div>
            <div class="value">45</div>
          </div>
          <div class="icon-wrap blue"><i class="fas fa-user-cog"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <div class="label">Pending Approvals</div>
            <div class="value">3</div>
          </div>
          <div class="icon-wrap green"><i class="fas fa-check-circle"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <div class="label">Active Bookings</div>
            <div class="value">24</div>
          </div>
          <div class="icon-wrap purple"><i class="fas fa-calendar-check"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <div class="label">Total Revenue</div>
            <div class="value">₱12,450</div>
          </div>
          <div class="icon-wrap blue"><i class="fas fa-peso-sign"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <div class="label">Worker Earnings</div>
            <div class="value">₱8,220</div>
          </div>
          <div class="icon-wrap pink"><i class="fas fa-wallet"></i></div>
        </div>
      </div>
      <div class="section-card">
        <h3>Bookings Trend (Last 7 Days)</h3>
        <div class="chart-placeholder">Line chart placeholder — Bookings over time</div>
      </div>
      <div class="two-col">
        <div class="section-card">
          <h3>Recent Activities</h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="icon"><i class="fas fa-file-alt"></i></div>
              <div>
                <div>Maria Santos booked Juan Dela Cruz for plumbing repair.</div>
                <div class="time">Mar 1, 2025, 02:30 PM</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="icon"><i class="fas fa-file-alt"></i></div>
              <div>
                <div>Ana Reyes completed a cleaning service booking.</div>
                <div class="time">Mar 1, 2025, 11:00 AM</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="icon"><i class="fas fa-file-alt"></i></div>
              <div>
                <div>New worker registration: Pedro Garcia (Electrical).</div>
                <div class="time">Feb 28, 2025, 06:45 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-card">
          <h3>Top Performing Workers</h3>
          <div class="rank-list">
            <div class="rank-item">
              <div class="rank-num">1</div>
              <div>
                <div><strong>Juan Dela Cruz</strong></div>
                <div class="meta">Plumbing, Wiring, Installation</div>
              </div>
              <div class="stars">★ 4.9 <span class="meta">(128 reviews)</span></div>
            </div>
            <div class="rank-item">
              <div class="rank-num">2</div>
              <div>
                <div><strong>Maria Santos</strong></div>
                <div class="meta">Cleaning, Laundry</div>
              </div>
              <div class="stars">★ 4.8 <span class="meta">(95 reviews)</span></div>
            </div>
            <div class="rank-item">
              <div class="rank-num">3</div>
              <div>
                <div><strong>Pedro Garcia</strong></div>
                <div class="meta">Electrical, HVAC</div>
              </div>
              <div class="stars">★ 4.7 <span class="meta">(82 reviews)</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="cta-buttons">
        <a href="#verification" class="btn btn-primary">Approve Workers (3)</a>
        <a href="#bookings" class="btn btn-success">View Bookings (24)</a>
        <a href="#payments" class="btn btn-purple">Process Payments</a>
        <a href="#reports" class="btn btn-orange">Check Reports</a>
        <a href="#analytics" class="btn btn-outline">Analytics & Reports</a>
      </div>
    `;
  }

  function renderAnalytics() {
    return `
      <h1 class="page-title">Analytics & Reports</h1>
      <p class="page-subtitle">View platform metrics and performance analytics.</p>
      <div class="cards-row">
        <div class="stat-card"><div><div class="label">Page Views</div><div class="value">12.4k</div></div><div class="icon-wrap blue"><i class="fas fa-eye"></i></div></div>
        <div class="stat-card"><div><div class="label">Conversion Rate</div><div class="value">4.2%</div></div><div class="icon-wrap green"><i class="fas fa-chart-line"></i></div></div>
        <div class="stat-card"><div><div class="label">Avg. Session</div><div class="value">3m 42s</div></div><div class="icon-wrap purple"><i class="fas fa-clock"></i></div></div>
      </div>
      <div class="section-card">
        <h3>Traffic Overview</h3>
        <div class="chart-placeholder">Chart: Traffic over time</div>
      </div>
      <div class="section-card">
        <h3>Service Category Performance</h3>
        <div class="chart-placeholder">Chart: Bookings by category</div>
      </div>
      <a href="#dashboard" class="btn btn-outline">Back to Dashboard</a>
    `;
  }

  function renderUsers(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#users" class="${view === 'all' ? 'active' : ''}">All Users</a>
        <a href="#users-clients" class="${view === 'clients' ? 'active' : ''}">Client List</a>
        <a href="#users-workers" class="${view === 'workers' ? 'active' : ''}">Worker List</a>
      </div>`;
    const titles = { all: ['User Management', 'Manage all registered users'], clients: ['Client List', 'All registered clients'], workers: ['Worker List', 'All registered workers'] };
    const [title, subtitle] = titles[view] || titles.all;
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">${title}</h1>
          <p class="page-subtitle">${subtitle}</p>
        </div>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> Add User</button>
      </div>
      ${subNav}
      <div class="toolbar">
        <div class="search-wrap">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search by name, email, or phone..." />
        </div>
        <div class="filter-tabs">
          <button type="button" class="active">All</button>
          <button type="button">Active</button>
          <button type="button">Suspended</button>
        </div>
      </div>
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>User ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Bookings</th><th>Total Spent</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td><td>Maria Santos</td><td>maria.s@email.com</td><td>0917 123 4567</td>
                <td><span class="badge badge-active">active</span></td><td>12</td><td>₱4,240</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#client-detail'"><i class="fas fa-eye"></i></button><button class="action-btn delete" title="Suspend"><i class="fas fa-trash"></i></button></div></td>
              </tr>
              <tr>
                <td>#1002</td><td>Juan Dela Cruz</td><td>juan.d@email.com</td><td>0918 234 5678</td>
                <td><span class="badge badge-suspended">suspended</span></td><td>8</td><td>₱2,690</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#client-detail'"><i class="fas fa-eye"></i></button><button class="action-btn approve" title="Activate"><i class="fas fa-check"></i></button><button class="action-btn delete" title="Delete"><i class="fas fa-trash"></i></button></div></td>
              </tr>
              <tr>
                <td>#1003</td><td>Ana Reyes</td><td>ana.r@email.com</td><td>0919 345 6789</td>
                <td><span class="badge badge-active">active</span></td><td>5</td><td>₱1,890</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#client-detail'"><i class="fas fa-eye"></i></button><button class="action-btn delete" title="Suspend"><i class="fas fa-trash"></i></button></div></td>
              </tr>
              <tr>
                <td>#1004</td><td>Pedro Garcia</td><td>pedro.g@email.com</td><td>0920 456 7890</td>
                <td><span class="badge badge-active">active</span></td><td>3</td><td>₱1,240</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#client-detail'"><i class="fas fa-eye"></i></button><button class="action-btn delete" title="Suspend"><i class="fas fa-trash"></i></button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrap">
          <span class="info">Showing 4 of 4 users</span>
          <div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div>
        </div>
      </div>
    `;
  }

  function renderClientDetail() {
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">Client Detail</h1>
          <p class="page-subtitle">View and manage client information</p>
        </div>
        <div>
          <a href="#users" class="btn btn-outline">Back to Users</a>
          <a href="#suspend-user" class="btn btn-danger">Suspend / Ban User</a>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-block"><label>Client ID</label><div class="value">#1001</div></div>
        <div class="detail-block"><label>Full Name</label><div class="value">Maria Santos</div></div>
        <div class="detail-block"><label>Email</label><div class="value">maria.s@email.com</div></div>
        <div class="detail-block"><label>Phone</label><div class="value">0917 123 4567</div></div>
        <div class="detail-block"><label>Status</label><div class="value"><span class="badge badge-active">active</span></div></div>
        <div class="detail-block"><label>Total Bookings</label><div class="value">12</div></div>
        <div class="detail-block"><label>Total Spent</label><div class="value">₱4,240</div></div>
        <div class="detail-block"><label>Joined</label><div class="value">Jan 15, 2025</div></div>
      </div>
      <div class="section-card">
        <h3>Recent Bookings</h3>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Booking ID</th><th>Service</th><th>Worker</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>#B201</td><td>Plumbing</td><td>Juan Dela Cruz</td><td>Mar 1, 2025</td><td><span class="badge badge-approved">Completed</span></td></tr>
              <tr><td>#B198</td><td>Cleaning</td><td>Ana Reyes</td><td>Feb 28, 2025</td><td><span class="badge badge-approved">Completed</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderWorkerDetail() {
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">Worker Detail</h1>
          <p class="page-subtitle">View and manage worker profile</p>
        </div>
        <div>
          <a href="#workers" class="btn btn-outline">Back to Workers</a>
          <a href="#suspend-user" class="btn btn-danger">Suspend / Ban User</a>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-block"><label>Worker ID</label><div class="value">#W501</div></div>
        <div class="detail-block"><label>Full Name</label><div class="value">Juan Dela Cruz</div></div>
        <div class="detail-block"><label>Email</label><div class="value">juan.d@email.com</div></div>
        <div class="detail-block"><label>Services</label><div class="value">Plumbing, Wiring, Installation</div></div>
        <div class="detail-block"><label>Rating</label><div class="value">★ 4.9 (128 reviews)</div></div>
        <div class="detail-block"><label>Total Earnings</label><div class="value">₱18,450</div></div>
        <div class="detail-block"><label>Verification</label><div class="value"><span class="badge badge-approved">Verified</span></div></div>
        <div class="detail-block"><label>Joined</label><div class="value">Dec 10, 2024</div></div>
      </div>
      <div class="section-card">
        <h3>Recent Bookings</h3>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Booking ID</th><th>Client</th><th>Service</th><th>Date</th><th>Earnings</th></tr></thead>
            <tbody>
              <tr><td>#B201</td><td>Maria Santos</td><td>Plumbing</td><td>Mar 1, 2025</td><td>₱450</td></tr>
              <tr><td>#B195</td><td>Pedro Lopez</td><td>Wiring</td><td>Feb 27, 2025</td><td>₱620</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderWorkers() {
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">Workers</h1>
          <p class="page-subtitle">Manage all registered workers</p>
        </div>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> Add Worker</button>
      </div>
      <div class="toolbar">
        <div class="search-wrap"><i class="fas fa-search"></i><input type="text" placeholder="Search workers..." /></div>
        <div class="filter-tabs"><button type="button" class="active">All</button><button type="button">Verified</button><button type="button">Pending</button></div>
      </div>
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Worker ID</th><th>Name</th><th>Services</th><th>Rating</th><th>Status</th><th>Earnings</th><th>Actions</th></tr></thead>
            <tbody>
              <tr>
                <td>#W501</td><td>Juan Dela Cruz</td><td>Plumbing, Wiring</td><td>★ 4.9</td><td><span class="badge badge-approved">Verified</span></td><td>₱18,450</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#worker-detail'"><i class="fas fa-eye"></i></button><button class="action-btn delete" title="Suspend"><i class="fas fa-trash"></i></button></div></td>
              </tr>
              <tr>
                <td>#W502</td><td>Maria Santos</td><td>Cleaning, Laundry</td><td>★ 4.8</td><td><span class="badge badge-approved">Verified</span></td><td>₱12,100</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#worker-detail'"><i class="fas fa-eye"></i></button><button class="action-btn delete" title="Suspend"><i class="fas fa-trash"></i></button></div></td>
              </tr>
              <tr>
                <td>#W503</td><td>Pedro Garcia</td><td>Electrical, HVAC</td><td>★ 4.7</td><td><span class="badge badge-pending">Pending</span></td><td>₱0</td>
                <td><div class="row-actions"><button class="action-btn view" title="View" onclick="location.hash='#worker-detail'"><i class="fas fa-eye"></i></button><button class="action-btn approve" title="Approve"><i class="fas fa-check"></i></button><button class="action-btn delete" title="Reject"><i class="fas fa-trash"></i></button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrap"><span class="info">Showing 3 of 3 workers</span><div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div></div>
      </div>
    `;
  }

  function renderSuspendUser() {
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">Suspend / Ban User</h1>
          <p class="page-subtitle">Suspend or permanently ban a user account</p>
        </div>
        <a href="#users" class="btn btn-outline">Back to Users</a>
      </div>
      <div class="section-card" style="max-width: 480px;">
        <h3>Reason for suspension</h3>
        <p class="page-subtitle" style="margin-bottom: 1rem;">Select a reason and add optional notes.</p>
        <div style="margin-bottom: 1rem;">
          <label style="display:block; font-size: 0.875rem; margin-bottom: 0.5rem;">Reason</label>
          <select style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.9375rem;">
            <option>Violation of terms</option>
            <option>Fraudulent activity</option>
            <option>Harassment</option>
            <option>Other</option>
          </select>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display:block; font-size: 0.875rem; margin-bottom: 0.5rem;">Notes (optional)</label>
          <textarea rows="3" style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.9375rem;"></textarea>
        </div>
        <div style="display:flex; gap: 0.5rem;">
          <button type="button" class="btn btn-danger">Suspend User</button>
          <a href="#users" class="btn btn-outline">Cancel</a>
        </div>
      </div>
    `;
  }

  function renderVerification(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#verification" class="${view === 'pending' ? 'active' : ''}">Pending Verifications</a>
        <a href="#verification-detail" class="${view === 'detail' ? 'active' : ''}">Verification Detail</a>
      </div>`;
    if (view === 'detail' || view === 'approve' || view === 'reject') {
      return `
        <div class="page-header">
          <div class="title-group">
            <h1 class="page-title">${view === 'approve' ? 'Approve Verification' : view === 'reject' ? 'Reject Verification' : 'Verification Detail Review'}</h1>
            <p class="page-subtitle">Review documents and approve or reject</p>
          </div>
          <a href="#verification" class="btn btn-outline">Back to Pending</a>
        </div>
        <div class="detail-grid">
          <div class="detail-block"><label>Applicant</label><div class="value">Pedro Garcia</div></div>
          <div class="detail-block"><label>Submitted</label><div class="value">Feb 28, 2025</div></div>
          <div class="detail-block"><label>Document Type</label><div class="value">ID + Proof of Address</div></div>
        </div>
        <div class="section-card">
          <h3>Uploaded Documents</h3>
          <div class="chart-placeholder" style="height: 120px;">Document preview placeholder</div>
        </div>
        <div class="cta-buttons">
          <a href="#verification" class="btn btn-success">Approve Verification</a>
          <a href="#verification" class="btn btn-danger">Reject Verification</a>
        </div>
      `;
    }
    return `
      <div class="page-header">
        <div class="title-group">
          <h1 class="page-title">Verification Management</h1>
          <p class="page-subtitle">Pending worker verifications</p>
        </div>
      </div>
      ${subNav}
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Applicant</th><th>Email</th><th>Services</th><th>Submitted</th><th>Actions</th></tr></thead>
            <tbody>
              <tr>
                <td>Pedro Garcia</td><td>pedro.g@email.com</td><td>Electrical, HVAC</td><td>Feb 28, 2025</td>
                <td><div class="row-actions"><button class="action-btn view" onclick="location.hash='#verification-detail'"><i class="fas fa-eye"></i></button><button class="action-btn approve" onclick="location.hash='#approve-verification'"><i class="fas fa-check"></i></button><button class="action-btn delete" onclick="location.hash='#reject-verification'"><i class="fas fa-times"></i></button></div></td>
              </tr>
              <tr>
                <td>Rosa Martinez</td><td>rosa.m@email.com</td><td>Cleaning</td><td>Feb 27, 2025</td>
                <td><div class="row-actions"><button class="action-btn view" onclick="location.hash='#verification-detail'"><i class="fas fa-eye"></i></button><button class="action-btn approve"><i class="fas fa-check"></i></button><button class="action-btn delete"><i class="fas fa-times"></i></button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderBookings(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#bookings" class="${view === 'all' ? 'active' : ''}">All Bookings</a>
        <a href="#booking-detail" class="${view === 'detail' ? 'active' : ''}">Booking Detail</a>
        <a href="#booking-dispute" class="${view === 'dispute' ? 'active' : ''}">Booking Dispute</a>
      </div>`;
    if (view === 'detail') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Booking Detail</h1><p class="page-subtitle">Booking #B201</p></div><a href="#bookings" class="btn btn-outline">Back</a></div>
        <div class="detail-grid">
          <div class="detail-block"><label>Booking ID</label><div class="value">#B201</div></div>
          <div class="detail-block"><label>Client</label><div class="value">Maria Santos</div></div>
          <div class="detail-block"><label>Worker</label><div class="value">Juan Dela Cruz</div></div>
          <div class="detail-block"><label>Service</label><div class="value">Plumbing Repair</div></div>
          <div class="detail-block"><label>Date & Time</label><div class="value">Mar 1, 2025, 2:00 PM</div></div>
          <div class="detail-block"><label>Status</label><div class="value"><span class="badge badge-approved">Completed</span></div></div>
          <div class="detail-block"><label>Amount</label><div class="value">₱450</div></div>
        </div>
        ${subNav}
      `;
    }
    if (view === 'dispute') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Booking Dispute</h1><p class="page-subtitle">Resolve booking disputes</p></div><a href="#bookings" class="btn btn-outline">Back</a></div>
        <div class="section-card">
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Dispute ID</th><th>Booking</th><th>Raised By</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td>#D01</td><td>#B198</td><td>Maria Santos</td><td>Service not completed</td><td><span class="badge badge-pending">Open</span></td><td><button class="btn btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.8125rem;">Review</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${subNav}
      `;
    }
    return `
      <div class="page-header">
        <div class="title-group"><h1 class="page-title">Booking Management</h1><p class="page-subtitle">All bookings</p></div>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> Add Booking</button>
      </div>
      ${subNav}
      <div class="toolbar">
        <div class="search-wrap"><i class="fas fa-search"></i><input type="text" placeholder="Search bookings..." /></div>
        <div class="filter-tabs"><button type="button" class="active">All</button><button type="button">Pending</button><button type="button">Completed</button><button type="button">Cancelled</button></div>
      </div>
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Booking ID</th><th>Client</th><th>Worker</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>#B201</td><td>Maria Santos</td><td>Juan Dela Cruz</td><td>Plumbing</td><td>Mar 1, 2025</td><td>₱450</td><td><span class="badge badge-approved">Completed</span></td><td><button class="action-btn view" onclick="location.hash='#booking-detail'"><i class="fas fa-eye"></i></button></td></tr>
              <tr><td>#B200</td><td>Ana Reyes</td><td>Pedro Garcia</td><td>Electrical</td><td>Mar 2, 2025</td><td>₱620</td><td><span class="badge badge-pending">Pending</span></td><td><button class="action-btn view" onclick="location.hash='#booking-detail'"><i class="fas fa-eye"></i></button></td></tr>
              <tr><td>#B199</td><td>Pedro Lopez</td><td>Maria Santos</td><td>Cleaning</td><td>Feb 28, 2025</td><td>₱350</td><td><span class="badge badge-approved">Completed</span></td><td><button class="action-btn view" onclick="location.hash='#booking-detail'"><i class="fas fa-eye"></i></button></td></tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrap"><span class="info">Showing 3 of 24 bookings</span><div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div></div>
      </div>
    `;
  }

  function renderPayments(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#payments" class="${view === 'all' ? 'active' : ''}">All Transactions</a>
        <a href="#transaction-detail" class="${view === 'detail' ? 'active' : ''}">Transaction Detail</a>
        <a href="#refunds" class="${view === 'refunds' ? 'active' : ''}">Refund Management</a>
      </div>`;
    if (view === 'detail') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Transaction Detail</h1><p class="page-subtitle">Transaction #T301</p></div><a href="#payments" class="btn btn-outline">Back</a></div>
        <div class="detail-grid">
          <div class="detail-block"><label>Transaction ID</label><div class="value">#T301</div></div>
          <div class="detail-block"><label>Booking</label><div class="value">#B201</div></div>
          <div class="detail-block"><label>Amount</label><div class="value">₱450</div></div>
          <div class="detail-block"><label>Method</label><div class="value">GCash</div></div>
          <div class="detail-block"><label>Status</label><div class="value"><span class="badge badge-approved">Completed</span></div></div>
          <div class="detail-block"><label>Date</label><div class="value">Mar 1, 2025, 2:35 PM</div></div>
        </div>
        ${subNav}
      `;
    }
    if (view === 'refunds') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Refund Management</h1><p class="page-subtitle">Process and track refunds</p></div></div>
        ${subNav}
        <div class="section-card">
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Refund ID</th><th>Transaction</th><th>Amount</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td>#R01</td><td>#T298</td><td>₱350</td><td>Cancelled by client</td><td><span class="badge badge-pending">Pending</span></td><td><button class="btn btn-success" style="padding: 0.25rem 0.5rem; font-size: 0.8125rem;">Process</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    return `
      <div class="page-header"><div class="title-group"><h1 class="page-title">Payment Management</h1><p class="page-subtitle">All transactions</p></div></div>
      ${subNav}
      <div class="toolbar">
        <div class="search-wrap"><i class="fas fa-search"></i><input type="text" placeholder="Search transactions..." /></div>
        <div class="filter-tabs"><button type="button" class="active">All</button><button type="button">Completed</button><button type="button">Pending</button><button type="button">Failed</button></div>
      </div>
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Transaction ID</th><th>Booking</th><th>User</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>#T301</td><td>#B201</td><td>Maria Santos</td><td>₱450</td><td>GCash</td><td>Mar 1, 2025</td><td><span class="badge badge-approved">Completed</span></td><td><button class="action-btn view" onclick="location.hash='#transaction-detail'"><i class="fas fa-eye"></i></button></td></tr>
              <tr><td>#T300</td><td>#B200</td><td>Ana Reyes</td><td>₱620</td><td>Card</td><td>Mar 1, 2025</td><td><span class="badge badge-pending">Pending</span></td><td><button class="action-btn view" onclick="location.hash='#transaction-detail'"><i class="fas fa-eye"></i></button></td></tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrap"><span class="info">Showing 2 of 48 transactions</span><div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div></div>
      </div>
    `;
  }

  function renderReviews(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#reviews" class="${view === 'all' ? 'active' : ''}">All Reviews</a>
        <a href="#reviews-flagged" class="${view === 'flagged' ? 'active' : ''}">Flagged Reviews</a>
        <a href="#review-detail" class="${view === 'detail' ? 'active' : ''}">Review Detail</a>
      </div>`;
    if (view === 'detail') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Review Detail</h1><p class="page-subtitle">Review #RV101</p></div><a href="#reviews" class="btn btn-outline">Back</a></div>
        <div class="section-card">
          <p><strong>Client:</strong> Maria Santos</p>
          <p><strong>Worker:</strong> Juan Dela Cruz</p>
          <p><strong>Rating:</strong> ★★★★★ 5.0</p>
          <p><strong>Comment:</strong> Very professional and fixed the issue quickly. Highly recommend!</p>
          <p><strong>Date:</strong> Mar 1, 2025</p>
        </div>
        ${subNav}
      `;
    }
    if (view === 'flagged') {
      return `
        <div class="page-header"><div class="title-group"><h1 class="page-title">Flagged Reviews</h1><p class="page-subtitle">Reviews reported by users</p></div></div>
        ${subNav}
        <div class="section-card">
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Review</th><th>Worker</th><th>Rating</th><th>Flag Reason</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td>#RV098</td><td>Pedro Garcia</td><td>★ 2.0</td><td>Inappropriate content</td><td><button class="btn btn-primary" style="padding: 0.25rem 0.5rem;">Review</button> <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;">Dismiss</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    return `
      <div class="page-header"><div class="title-group"><h1 class="page-title">Ratings & Reviews Management</h1><p class="page-subtitle">All reviews</p></div></div>
      ${subNav}
      <div class="toolbar">
        <div class="search-wrap"><i class="fas fa-search"></i><input type="text" placeholder="Search reviews..." /></div>
        <div class="filter-tabs"><button type="button" class="active">All</button><button type="button">5 Star</button><button type="button">1-2 Star</button></div>
      </div>
      <div class="section-card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Review ID</th><th>Booking</th><th>Client</th><th>Worker</th><th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>#RV101</td><td>#B201</td><td>Maria Santos</td><td>Juan Dela Cruz</td><td>★ 5.0</td><td>Very professional...</td><td>Mar 1, 2025</td><td><button class="action-btn view" onclick="location.hash='#review-detail'"><i class="fas fa-eye"></i></button></td></tr>
              <tr><td>#RV100</td><td>#B199</td><td>Pedro Lopez</td><td>Maria Santos</td><td>★ 4.5</td><td>Good cleaning service...</td><td>Feb 28, 2025</td><td><button class="action-btn view" onclick="location.hash='#review-detail'"><i class="fas fa-eye"></i></button></td></tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrap"><span class="info">Showing 2 of 156 reviews</span><div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div></div>
      </div>
    `;
  }

  function renderReports(view) {
    const subNav = `
      <div class="sub-nav">
        <a href="#reports-logs" class="${view === 'logs' ? 'active' : ''}">System Logs</a>
        <a href="#reports-service" class="${view === 'service' ? 'active' : ''}">Service Reports</a>
        <a href="#reports-activity" class="${view === 'activity' ? 'active' : ''}">User Activity Reports</a>
        <a href="#reports-export" class="${view === 'export' ? 'active' : ''}">Export Reports</a>
      </div>`;
    const titles = { logs: 'System Logs', service: 'Service Reports', activity: 'User Activity Reports', export: 'Export Reports' };
    const title = titles[view] || 'Reports & Logs';
    return `
      <div class="page-header">
        <div class="title-group"><h1 class="page-title">${title}</h1><p class="page-subtitle">${view === 'export' ? 'Export data to CSV or PDF' : 'View and filter logs'}</p></div>
        ${view === 'export' ? '<button class="btn btn-primary"><i class="fas fa-download"></i> Export</button>' : ''}
      </div>
      ${subNav}
      <div class="section-card">
        ${view === 'export' ? `
          <p style="margin-bottom: 1rem;">Select report type and date range to export.</p>
          <div class="detail-grid" style="margin-bottom: 1rem;">
            <div class="detail-block"><label>Report Type</label><select style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px;"><option>Bookings</option><option>Payments</option><option>Users</option><option>Reviews</option></select></div>
            <div class="detail-block"><label>From</label><input type="date" style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px;" /></div>
            <div class="detail-block"><label>To</label><input type="date" style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px;" /></div>
            <div class="detail-block"><label>Format</label><select style="width:100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 8px;"><option>CSV</option><option>PDF</option></select></div>
          </div>
          <button class="btn btn-primary"><i class="fas fa-download"></i> Generate Export</button>
        ` : `
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Timestamp</th><th>Level</th><th>Source</th><th>Message</th></tr></thead>
              <tbody>
                <tr><td>Mar 1, 2025 14:35:02</td><td><span class="badge badge-active">INFO</span></td><td>API</td><td>Booking #B201 completed</td></tr>
                <tr><td>Mar 1, 2025 14:30:15</td><td><span class="badge badge-active">INFO</span></td><td>Auth</td><td>User login: maria.s@email.com</td></tr>
                <tr><td>Mar 1, 2025 11:00:00</td><td><span class="badge badge-pending">WARN</span></td><td>Payment</td><td>Retry attempt for T299</td></tr>
                <tr><td>Feb 28, 2025 18:45:22</td><td><span class="badge badge-active">INFO</span></td><td>Verification</td><td>New submission: Pedro Garcia</td></tr>
              </tbody>
            </table>
          </div>
          <div class="pagination-wrap"><span class="info">Showing 4 of 1,240 log entries</span><div class="pagination-btns"><button type="button" disabled>Previous</button><button type="button">Next</button></div></div>
        `}
      </div>
    `;
  }

  function renderSettings() {
    return `
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">General administration settings</p>
      <div class="section-card">
        <h3>General</h3>
        <div class="detail-grid">
          <div class="detail-block"><label>Site Name</label><div class="value">HandyAdmin</div></div>
          <div class="detail-block"><label>Support Email</label><div class="value">support@handyadmin.com</div></div>
        </div>
        <button class="btn btn-primary" style="margin-top: 1rem;">Save Changes</button>
      </div>
      <div class="section-card">
        <h3>Notifications</h3>
        <p class="page-subtitle">Configure email and in-app notifications.</p>
        <button class="btn btn-outline">Configure</button>
      </div>
    `;
  }

  function render(pageId) {
    let html = '';
    switch (pageId) {
      case 'dashboard': html = renderDashboard(); break;
      case 'analytics': html = renderAnalytics(); break;
      case 'users': html = renderUsers('all'); break;
      case 'users-clients': html = renderUsers('clients'); break;
      case 'users-workers': html = renderUsers('workers'); break;
      case 'client-detail': html = renderClientDetail(); break;
      case 'worker-detail': html = renderWorkerDetail(); break;
      case 'workers': html = renderWorkers(); break;
      case 'suspend-user': html = renderSuspendUser(); break;
      case 'verification': html = renderVerification('pending'); break;
      case 'verification-detail': html = renderVerification('detail'); break;
      case 'approve-verification': html = renderVerification('approve'); break;
      case 'reject-verification': html = renderVerification('reject'); break;
      case 'bookings': html = renderBookings('all'); break;
      case 'booking-detail': html = renderBookings('detail'); break;
      case 'booking-dispute': html = renderBookings('dispute'); break;
      case 'payments': html = renderPayments('all'); break;
      case 'transaction-detail': html = renderPayments('detail'); break;
      case 'refunds': html = renderPayments('refunds'); break;
      case 'reviews': html = renderReviews('all'); break;
      case 'reviews-flagged': html = renderReviews('flagged'); break;
      case 'review-detail': html = renderReviews('detail'); break;
      case 'reports':
      case 'reports-logs': html = renderReports('logs'); break;
      case 'reports-service': html = renderReports('service'); break;
      case 'reports-activity': html = renderReports('activity'); break;
      case 'reports-export': html = renderReports('export'); break;
      case 'settings': html = renderSettings(); break;
      default: html = renderDashboard();
    }
    mainContent.innerHTML = html;
    setActiveNav(pageId);
  }

  function onHashChange() {
    render(getHash());
  }

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.dataset.page;
      if (page === 'dashboard') location.hash = 'dashboard';
      else if (page === 'users') location.hash = 'users';
      else if (page === 'workers') location.hash = 'workers';
      else if (page === 'verification') location.hash = 'verification';
      else if (page === 'bookings') location.hash = 'bookings';
      else if (page === 'payments') location.hash = 'payments';
      else if (page === 'reviews') location.hash = 'reviews';
      else if (page === 'reports') location.hash = 'reports';
      else if (page === 'settings') location.hash = 'settings';
    });
  });

  window.addEventListener('hashchange', onHashChange);
  onHashChange();
})();
