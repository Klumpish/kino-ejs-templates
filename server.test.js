import request from 'supertest';
import app from './server'; // rememmber to export  app in server.js

describe('404 Error handling', () => {
  it('should return a 404 page when visiting a non-existent movie page', async () => {
    const response = await request(app).get('/movie/nonexistent-movie-id');

    // checks status code 404

    expect(response.status).toBe(404);

    // checks if 404-page is rendered correctly
    expect(response.text).toContain('Oops! Page not found.');
    expect(response.text).toContain('The page you are looking for does not exist.');
  });
});

describe('Movie page', () => {
  it('should display the correct movie title', async () => {
    const movieId = '4'; //change later for a correct movie id

    // makes request tot the server
    const response = await request(app).get(`/movie/${movieId}`);

    // fetch the title from the API response
    const movie = await import('./lib/movies.js').then(({ loadMovie }) => loadMovie(movieId));

    // get the title from the API response
    const movieTitle = movie.attributes.title;

    // log the title
    console.log('Title from API:', movieTitle);
    // check if statuscode is 200 (ok)
    expect(response.status).toBe(200);

    expect(response.text).toContain(`<h1 class=\"movie__single__header\">${movieTitle}</h1>`);
  });
});
