const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    var user = this || null;

    if (user == null) return next('null user');

    //if password is unmodified, proceed next
    if (!user.isModified('password')) next();

    //generate SALT
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //hash password using SALT
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function(inputPassword, callback) {
    var user = this || null;
    if (user == null) return callback('null user');
    bcrypt.compare(inputPassword, user.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };