import express from 'express';
import ejs from 'ejs';
import { loadMovie, loadMovies } from './lib/movies.js';
// converts markdown text in to html
import * as marked from 'marked';

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

// single movie page
app.get('/movie/:movieId', async (request, response) => {
  try {
    const movie = await loadMovie(request.params.movieId);

    // convert movie intro text from markdown to html
    if (movie && movie.attributes && movie.attributes.intro) {
      movie.attributes.intro = marked.marked(movie.attributes.intro);
    }

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

app.use((request, response, next) => {
  response.status(404).render('404');
});
