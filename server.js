import initApp from './src/js/app.js';
import { loadMovie, loadMovies } from './lib/movies.js';

const api = {
  loadMovie,
  loadMovies,
};

const app = initApp(api);

if (process.env.NODE_ENV !== 'test') {
  app.listen(5080, () => {
    console.log('Server running at http://localhost:5080');
  });
}
