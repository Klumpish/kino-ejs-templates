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
