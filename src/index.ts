import express from 'express';
import routes from './routes/index';

const app = express();
const port = '3000';

app.listen(port);

app.get('/', (req, res) => {
  res.send('Welcome! Image process GET requests can be made at /api/images.');
});

app.use('/api', routes);

export default app;
