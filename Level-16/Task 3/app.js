
const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Thariga', email: 'thariga@example.com' },
  { id: 2, name: 'Suthan', email: 'suthan@example.com' },
  { id: 3, name: 'Ragavi', email: 'ragavi@example.com' }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(3110, () => {
  console.log('Server running on http://localhost:3110');
});