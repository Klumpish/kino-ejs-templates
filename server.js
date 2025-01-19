import express from 'express';
import ejs from 'ejs';
import { loadMovie, loadMovies } from './lib/movies.js';

// create a new express application/server
const app = express();

// sets the view engine to EJS
app.set('view engine', 'ejs');
// sets view directory (the folder containg EJS files)
app.set('views', './views');

app.get('/', async (request, response) => {
  try {
    const movies = await loadMovies();
    const limitedMovies = movies.slice(0, 4); //gets the first 4 movies
    response.render('index.ejs', { movies: limitedMovies });
  } catch (err) {
    console.error('Error loading movie', err);
    response.status(500).send('Error loading movie');
  }
});

app.get('/about-us', async (request, response) => {
  response.render('about-us.ejs');
});
app.get('/movies', async (request, response) => {
  const movies = await loadMovies();
  response.render('movies.ejs', { movies });
});

app.get('/movie/:movieId', async (request, response) => {
  try {
    const movie = await loadMovie(request.params.movieId);
    response.render('movie', { movie });
  } catch (err) {
    console.error('Error loading movie', err);
    response.status(500).send('Error loading movie');
  }
});

app.use('/static', express.static('./static'));
app.listen(5080, () => {
  console.log('Server running at http://localhost:5080');
});
