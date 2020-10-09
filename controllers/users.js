const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (exception) {
        return res.status(401).json({
            error: 'user already exists'
        });
    }
});

usersRouter.get('/', async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = usersRouter;