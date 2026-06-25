const STORAGE_KEY = 'job-applications';
const form = document.querySelector('#applicationForm');
const list = document.querySelector('#applications');
const stats = document.querySelector('#stats');
const filter = document.querySelector('#filter');

let applications = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function renderStats() {
  const counts = ['Saved', 'Applied', 'Interview', 'Offer'].map(status => ({
    status,
    count: applications.filter(app => app.status === status).length
  }));

  stats.innerHTML = counts.map(item => `
    <article class="stat"><span>${item.status}</span><strong>${item.count}</strong></article>
  `).join('');
}

function render() {
  const selected = filter.value;
  const visible = selected === 'All' ? applications : applications.filter(app => app.status === selected);

  renderStats();
  list.innerHTML = visible.length ? visible.map(app => `
    <article class="card">
      <h3>${app.role} at ${app.company}</h3>
      <p>${app.notes || 'No notes yet.'}</p>
      <footer><span>${app.status}</span><span>${app.date}</span></footer>
    </article>
  `).join('') : '<p>No applications match this filter.</p>';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  applications.unshift({
    company: form.company.value.trim(),
    role: form.role.value.trim(),
    status: form.status.value,
    date: form.date.value,
    notes: form.notes.value.trim()
  });
  save();
  form.reset();
  render();
});

filter.addEventListener('change', render);
render();
