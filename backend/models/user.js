const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, unique: true },
    stocks: { type: [], required: false },
    portfolio: { type: [], required: false },
    cryptPortfolio: { type: [], required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
