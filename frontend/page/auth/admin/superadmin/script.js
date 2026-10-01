const API_BASE = 'http://localhost:5000';
  fetch(`${API_BASE}/admin/students`)
// Initialize Lucide Icons
lucide.createIcons();

// Load initial view on page load
document.addEventListener('DOMContentLoaded', () => {
  loadAllStudents();
});

// --- Sidebar Navigation & Views ---
const navButtons = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all buttons
    navButtons.forEach(b => b.classList.remove('active'));
    // Hide all section panels
    viewPanels.forEach(p => p.classList.add('hidden'));

    // Highlight clicked sidebar item
    btn.classList.add('active');
    
    // Show selected view panel
    const targetView = btn.getAttribute('data-view');
    document.getElementById(targetView).classList.remove('hidden');

    // Fetch API data for selected panel
    if (targetView === 'studentsView') loadAllStudents();
    if (targetView === 'approveStudentsView') loadUnapprovedStudents();
    if (targetView === 'eventsView') loadPendingEvents();
    if (targetView === 'eventListView') loadAllEvents();
  });
});

// --- Profile Dropdown Navigation & Actions ---
const profileTrigger = document.getElementById('profileTrigger');
const profileDropdown = document.getElementById('profileDropdown');

// Toggle profile menu
profileTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('hidden');
});

// Close profile dropdown when clicking outside
document.addEventListener('click', () => {
  profileDropdown.classList.add('hidden');
});

// Profile Dropdown Options
document.getElementById('menuDashboard').addEventListener('click', () => {
  document.querySelector('[data-view="studentsView"]').click();
});

document.getElementById('menuLogout').addEventListener('click', () => {
  // Redirect to your project's main login or index page
  window.location.href = 'http://127.0.0.1:5500/Collage_event_management/frontend/page/index.html';
});

// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

// ================= API BACKEND CALLS =================

// 1. GET /admin/students - Get all students
async function loadAllStudents() {
  const tbody = document.getElementById('studentsTableBody');
  tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">Loading students...</td></tr>';
  
  try {
    const res = await fetch(`${API_BASE}/admin/students`);
    const data = await res.json();
    
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No students found.</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(s => `
      <tr>
        <td>${s.name || 'N/A'}</td>
        <td><img src="${s.image || 'https://via.placeholder.com/32'}" class="user-thumb" alt="User"></td>
        <td>${s.contact || 'N/A'}</td>
        <td>${s.email || 'N/A'}</td>
        <td><span class="badge ${s.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${s.status || 'Pending'}</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading students:', err);
    tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No students found.</td></tr>';
  }
}

// 2. GET /admin/notApproved - Get unapproved students only
async function loadUnapprovedStudents() {
  const tbody = document.getElementById('unapprovedStudentsTableBody');
  tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Loading unapproved students...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/admin/notApproved`);
    const data = await res.json();

    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No students found<br><small>There are currently no students waiting for approval.</small></td></tr>';
      return;
    }

    tbody.innerHTML = data.map(s => `
      <tr>
        <td>${s.name || 'N/A'}</td>
        <td><img src="${s.image || 'https://via.placeholder.com/32'}" class="user-thumb" alt="User"></td>
        <td>${s.contact || 'N/A'}</td>
        <td>${s.email || 'N/A'}</td>
        <td>${s.isVerified ? 'Yes' : 'No'}</td>
        <td>
          <button class="btn btn-primary" onclick="approveStudent('${s._id || s.id}', true)">Approve</button>
          <button class="btn btn-danger" onclick="approveStudent('${s._id || s.id}', false)">Reject</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading unapproved students:', err);
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No students found<br><small>There are currently no students waiting for approval.</small></td></tr>';
  }
}

// 3. PATCH /admin/approve - Approve or reject student
async function approveStudent(studentId, isApproved) {
  try {
    await fetch(`${API_BASE}/admin/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, approved: isApproved })
    });
    loadUnapprovedStudents();
  } catch (err) {
    console.error('Failed to update student approval status:', err);
  }
}

// 4. GET /admin/event/pending - Get pending/unapproved events
async function loadPendingEvents() {
  const tbody = document.getElementById('pendingEventsTableBody');
  tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Loading pending events...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/admin/event/pending`);
    const data = await res.json();

    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No events found<br><small>There are currently no events waiting for approval.</small></td></tr>';
      return;
    }

    tbody.innerHTML = data.map(e => `
      <tr>
        <td>${e.title || e.name || 'N/A'}</td>
        <td>${e.location || 'N/A'}</td>
        <td>${e.date || 'N/A'}</td>
        <td>${e.type || 'N/A'}</td>
        <td>${e.details || 'N/A'}</td>
        <td>
          <button class="btn btn-primary" onclick="approveEvent('${e._id || e.id}', true)">Approve</button>
          <button class="btn btn-danger" onclick="approveEvent('${e._id || e.id}', false)">Reject</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading pending events:', err);
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No events found<br><small>There are currently no events waiting for approval.</small></td></tr>';
  }
}

// 5. GET /admin/events - Get all events
async function loadAllEvents() {
  const tbody = document.getElementById('allEventsTableBody');
  tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">Loading events...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/admin/events`);
    const data = await res.json();

    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No events found.</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(e => `
      <tr>
        <td>${e.title || e.name || 'N/A'}</td>
        <td>${e.location || 'N/A'}</td>
        <td>${e.date || 'N/A'}</td>
        <td>${e.type || 'N/A'}</td>
        <td><span class="badge ${e.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${e.status || 'Pending'}</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading events:', err);
    tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No events found.</td></tr>';
  }
}

// 6. PATCH /admin/event - Approve or reject events
async function approveEvent(eventId, isApproved) {
  try {
    await fetch(`${API_BASE}/admin/event`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, approved: isApproved })
    });
    loadPendingEvents();
  } catch (err) {
    console.error('Failed to update event approval status:', err);
  }
}