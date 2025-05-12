import express from'express';
import path from'path';

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Express Error Handling Example</h1>');
});

app.get('/api/error', (req, res, next) => {
  const err = new Error('Manually triggered API error');
  err.status = 400;
  next(err);
});

app.get('/html/error', (req, res, next) => {
  const err = new Error('Manually triggered HTML error');
  err.status = 500;
  next(err);
});

app.get('/api/notfound', (req, res, next) => {
  const err = new Error('Requested resource not found');
  err.status = 404;
  next(err);
});

app.get('/api/async-error', async (req, res, next) => {
  try {
    await Promise.reject(new Error('Simulated async error'));
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const isAPI = req.path.startsWith('/api');

  const errorResponse = {
    message: err.message || 'Internal Server Error',
    ...(ENV === 'development' && { stack: err.stack }),
  };

  if (isAPI) {
    res.status(status).json(errorResponse);
  } else {
    res.status(status).send(`
      <h1>Error ${status}</h1>
      <p>${errorResponse.message}</p>
      ${ENV === 'development' ? `<pre>${errorResponse.stack}</pre>` : ''}
    `);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${ENV} mode]`);
});
