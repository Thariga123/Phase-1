const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Contact Form</h2>
    <form method="POST" action="/submit">
      <label>Name: <input type="text" name="name" /></label><br/><br/>
      <label>Email: <input type="email" name="email" /></label><br/><br/>
      <label>Message: <textarea name="message"></textarea></label><br/><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send(`
      <h2>Error</h2>
      <p>All fields are required. Please go back and fill out the form.</p>
      <a href="/">Go Back</a>
    `);
  }

  res.send(`
    <h2>Submission Successful!</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Go Back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
