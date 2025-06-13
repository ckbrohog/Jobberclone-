const form = document.getElementById('client-form');
const clientList = document.getElementById('client-list');

let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients() {
  clientList.innerHTML = '';
  if (clients.length === 0) {
    clientList.innerHTML = '<p>No clients yet.</p>';
    return;
  }

  clients.forEach((client, index) => {
    const div = document.createElement('div');
    div.className = 'client-card';
    div.innerHTML = `
      <h3>${client.name}</h3>
      <p><strong>Email:</strong> ${client.email}</p>
      <p><strong>Phone:</strong> ${client.phone || 'N/A'}</p>
      <p><strong>Notes:</strong> ${client.notes || 'None'}</p>
      <p><strong>Card Token:</strong> ${client.cardToken || 'Not provided'}</p>
    `;
    clientList.appendChild(div);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const notes = form.notes.value.trim();
  const cardToken = form.cardToken.value.trim();

  if (!name || !email) {
    alert('Name and Email are required.');
    return;
  }

  clients.push({ name, email, phone, notes, cardToken });
  saveClients();
  renderClients();
  form.reset();
});

renderClients();
