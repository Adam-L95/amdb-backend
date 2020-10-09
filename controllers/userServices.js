const userServicesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }

    return null;
};

userServicesRouter.post('/watchlist', async (request, response) => {
    const body = request.body;

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    // console.log(body);

    const watchlistItem = {
        movieId: body.id,
        title: body.title,
        posterPath: body.poster_path,
        releaseDate: body.release_date,
    };

    user.watchlist = user.watchlist.concat(watchlistItem);

    await user.save();

    response.json(user.watchlist);
});

userServicesRouter.delete('/watchlist/:id', async (request, response) => {
    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const newWatchlist = user.watchlist.filter(movie => movie.movieId !== parseInt(request.params.id));
    // console.log(typeof(request.params.id));
    // console.log(newWatchlist);

    user.watchlist = newWatchlist;

    await user.save();

    response.json(user.watchlist);
});

userServicesRouter.post('/diary', async (request, response) => {
    const body = request.body;

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const t = Date.now();

    const diaryItem = {
        movieId: body.id,
        title: body.title,
        posterPath: body.poster_path,
        releaseDate: body.release_date,
        dateLogged: Date(t).toString()
    };

    user.diary = user.diary.concat(diaryItem);

    await user.save();

    response.json(user.diary);
});

module.exports = userServicesRouter;