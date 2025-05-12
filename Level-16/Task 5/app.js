import express from 'express';
const app = express();
const port = 3400;


app.get('/search', (req, res) => {
  const query = req.query.q || 'No query provided';
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;

  res.send(`Search for: ${query}, Limit: ${limit}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
