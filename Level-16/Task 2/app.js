const express = require('express');
const app = express();
const port = 3100;

app.get('/', (req, res) => {
  res.send('Welcome to our homepage!');
});
app.get('/about', (req, res) => {
  res.send('About Us page');
});
app.get('/contact', (req, res) => {
  res.send('Contact Us page');
});

app.get('/services', (req, res) => {
  res.send('Our Services page');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
