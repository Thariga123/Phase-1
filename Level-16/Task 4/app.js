const express = require('express');
const app = express();
const port = 3300;

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`<h1>User Profile</h1><p>User ID: ${userId}</p>`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
