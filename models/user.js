const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    watchlist: [
        {
            movieId: Number,
            title: String,
            posterPath: String,
            releaseDate: String,
        }
    ],
    diary: [
        {
            movieId: Number,
            title: String,
            posterPath: String,
            releaseDate: String,
            dateLogged: String 
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

