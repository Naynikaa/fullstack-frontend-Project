// Simulate login status using localStorage
function isLoggedIn() {
  return localStorage.getItem('loggedIn') === 'true';
}

function setLoggedIn(status) {
  localStorage.setItem('loggedIn', status);
}

// Redirect to login if not logged in (for protected pages)
function checkLogin() {
  const protectedPages = ['jobs.html', 'job-detail.html', 'apply.html'];
  const currentPage = window.location.pathname.split('/').pop();
  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// Run login check on page load
document.addEventListener('DOMContentLoaded', checkLogin);

// Login Form Validation (login.html)
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!email || !password) {
      errorMessage.textContent = 'Please fill in all fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email address.';
      errorMessage.style.display = 'block';
      return;
    }

    // Simulate successful login (replace with real auth)
    errorMessage.style.display = 'none';
    setLoggedIn('true');
    alert('Login successful!');
    // Redirect to home or intended page
    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
    window.location.href = redirectTo;
  });
}

// Apply Form Validation (apply.html) - Now requires login (handled by checkLogin)
if (document.getElementById('applyForm')) {
  document.getElementById('applyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert('Please log in to apply.');
      window.location.href = 'login.html?redirect=apply.html';
      return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!name || !email) {
      errorMessage.textContent = 'Please fill in all required fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    alert('Application submitted successfully!');
  });
}

// Job Search/Filter (jobs.html)
if (document.getElementById('searchInput')) {
  function filterJobs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
      const title = job.querySelector('h3').textContent.toLowerCase();
      const cat = job.dataset.category;
      if ((title.includes(query) || query === '') && (cat === category || category === '')) {
        job.style.display = 'block';
      } else {
        job.style.display = 'none';
      }
    });
  }
  const searchBtn = document.querySelector('.search button');
  if (searchBtn) searchBtn.addEventListener('click', filterJobs);
}

// Job Detail Dynamic Title (job-detail.html)
if (document.getElementById('jobTitle')) {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  document.getElementById('jobTitle').textContent = title || 'Job Title';
}

// View Job Function (jobs.html) - Now checks login
function viewJob(title) {
  if (!isLoggedIn()) {
    window.location.href = `login.html?redirect=job-detail.html?title=${encodeURIComponent(title)}`;
    return;
  }
  window.location.href = `job-detail.html?title=${encodeURIComponent(title)}`;
}

// Contact Form Validation (contact.html)
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const errorMessage = document.getElementById('contactError');

    if (!name || !email || !message) {
      errorMessage.textContent = 'Please fill in all fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    alert('Message sent successfully!');
  });
}
// ... (rest of the file remains unchanged)

// Apply Form Validation (apply.html) - Now redirects to status page
if (document.getElementById('applyForm')) {
  document.getElementById('applyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert('Please log in to apply.');
      window.location.href = 'login.html?redirect=apply.html';
      return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!name || !email) {
      errorMessage.textContent = 'Please fill in all required fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    // Redirect to status page instead of alert
    window.location.href = 'application-status.html';
  });
}

// Apply Form Validation (apply.html) - Now redirects to status page with job title
if (document.getElementById('applyForm')) {
  document.getElementById('applyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert('Please log in to apply.');
      window.location.href = 'login.html?redirect=apply.html';
      return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!name || !email) {
      errorMessage.textContent = 'Please fill in all required fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    // Get job title from URL params (passed from job-detail.html)
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('job') || 'Job Title';
    // Redirect to status page with job title
    window.location.href = `application-status.html?job=${encodeURIComponent(jobTitle)}`;
  });
}

// Add this to app.js for the status page dynamic title
if (document.getElementById('appliedJob')) {
  const urlParams = new URLSearchParams(window.location.search);
  const job = urlParams.get('job');
  document.getElementById('appliedJob').textContent = job || 'Job Title';
}
// ... (existing code remains)

// Simulate storing applications in localStorage
function getApplications() {
  return JSON.parse(localStorage.getItem('applications') || '[]');
}

function saveApplication(jobTitle) {
  const apps = getApplications();
  apps.push({ job: jobTitle, status: 'Submitted', date: new Date().toLocaleDateString() });
  localStorage.setItem('applications', JSON.stringify(apps));
}

// Logout function
function logout() {
  setLoggedIn('false');
  localStorage.removeItem('applications'); // Clear apps on logout (optional)
  window.location.href = 'index.html';
}

// Show/hide dashboard link
function updateNavbar() {
  const dashboardLink = document.getElementById('dashboardLink');
  if (dashboardLink) {
    dashboardLink.style.display = isLoggedIn() ? 'inline' : 'none';
    dashboardLink.href = isLoggedIn() ? 'dashboard.html' : '#';
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  checkLogin();
  updateNavbar();
});

// Apply Form Validation (apply.html) - Now saves application
if (document.getElementById('applyForm')) {
  document.getElementById('applyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert('Please log in to apply.');
      window.location.href = 'login.html?redirect=apply.html';
      return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!name || !email) {
      errorMessage.textContent = 'Please fill in all required fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('job') || 'Job Title';
    saveApplication(jobTitle); // Save to localStorage
    window.location.href = `application-status.html?job=${encodeURIComponent(jobTitle)}`;
  });
}

// Load dashboard (dashboard.html)
if (document.getElementById('applicationsList')) {
  const apps = getApplications();
  const list = document.getElementById('applicationsList');
  if (apps.length === 0) {
    list.innerHTML = '<p>No applications yet. <a href="jobs.html">Browse jobs</a> to apply.</p>';
  } else {
    list.innerHTML = apps.map(app => `
      <div class="job" style="margin-bottom: 1rem;">
        <h3>${app.job}</h3>
        <p><strong>Status:</strong> ${app.status}</p>
        <p><strong>Applied On:</strong> ${app.date}</p>
        <button onclick="alert('View details for ${app.job}')">View Details</button>
        <button onclick="withdrawApplication('${app.job}')">Withdraw</button>
      </div>
    `).join('');
  }
}

// Withdraw application (placeholder)
function withdrawApplication(job) {
  const apps = getApplications().filter(app => app.job !== job);
  localStorage.setItem('applications', JSON.stringify(apps));
  location.reload(); // Refresh to update list
}

// ... (rest of the file remains)

// ... (existing code remains)

// Simulate user storage in localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUser(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return false; // User already exists
  }
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

function isUserRegistered(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password);
}

// Register Form Validation (register.html)
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const errorMessage = document.getElementById('registerError');

    if (!name || !email || !password) {
      errorMessage.textContent = 'Please fill in all fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email.';
      errorMessage.style.display = 'block';
      return;
    }
    if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters.';
      errorMessage.style.display = 'block';
      return;
    }

    if (saveUser(name, email, password)) {
      errorMessage.style.display = 'none';
      alert('Registration successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      errorMessage.textContent = 'Email already registered.';
      errorMessage.style.display = 'block';
    }
  });
}

// Login Form Validation (login.html) - Now checks registration
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!email || !password) {
      errorMessage.textContent = 'Please fill in all fields.';
      errorMessage.style.display = 'block';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = 'Please enter a valid email address.';
      errorMessage.style.display = 'block';
      return;
    }

    if (!isUserRegistered(email, password)) {
      errorMessage.textContent = 'Invalid credentials or not registered. <a href="register.html">Register here</a>.';
      errorMessage.style.display = 'block';
      return;
    }

    errorMessage.style.display = 'none';
    setLoggedIn('true');
    alert('Login successful!');
    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
    window.location.href = redirectTo;
  });
}

// ... (rest of the file remains)