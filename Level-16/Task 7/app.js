import express from 'express';

const app = express();
const PORT = 3100;

const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${req.method}] [${req.url}]`);
  next(); 
};

app.use(loggerMiddleware);


app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com.');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted successfully.');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
