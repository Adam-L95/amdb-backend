const config = require('./utils/config');
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const moviesRouter = require('./controllers/movies');
const userServicesRouter = require('./controllers/userServices');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('logged into mongoDB'));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/search', moviesRouter);
app.use('/api/userServices', userServicesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


const server = http.createServer(app);

server.listen(config.PORT, () => {
    console.log(`Example app listening at http://localhost:${config.PORT}`);
});
