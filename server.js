import express from 'express';
import fs from 'fs/promises';

// create a new express application/server
const app = express();

app.get('/', async (request, response) => {
  const buf = await fs.readFile('./dist/index.html');
  const html = buf.toString();
  response.send(html);
});
app.get('/about-us.html', async (request, response) => {
  const buf = await fs.readFile('./dist/about-us.html');
  const html = buf.toString();
  response.send(html);
});
app.get('/movies', async (request, response) => {
  const buf = await fs.readFile('./dist/movies.html');
  const html = buf.toString();
  response.send(html);
});

app.use('/kino-bio-projekt', express.static('./dist'));
app.listen(5080, () => {
  console.log('Server running at http://localhost:5080');
});
