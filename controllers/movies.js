const axios = require('axios');
const moviesRouter = require('express').Router();

const api_key = process.env.API_KEY;


moviesRouter.get('/:title', async(request, response) => {
    const query = request.params.title;
    try {
        const results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`);
        if(results) {
            // console.log(results.data);
            response.json(results.data);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        console.log(error);
    }
});

moviesRouter.get('/movie/:id', async(request, response) => {
    const movieId = request.params.id;

    try {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`);
        if (result) {
            // console.log(result.data);
            response.json(result.data);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        console.log(error);
    }
});

moviesRouter.get('/movie/credits/:id', async(request, response) => {
    const movieId = request.params.id;

    try {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`);
        if (result) {
            // console.log(result.data);
            response.json(result.data);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        console.log(error);
    }
});

moviesRouter.get('/movie/now_playing', async (request, response) => {
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`);
        if (result) {
            response.json(result.data);
        } else {
            response.status(404).end();
        }

    } catch (error) {
        console.log(error);
    }
});

moviesRouter.get('/movie/similar_movies/:id', async (request, response) => {
    const movieId = request.params.id;
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=1`);
        if (result) {
            response.json(result.data);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = moviesRouter;