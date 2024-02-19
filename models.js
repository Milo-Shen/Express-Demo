const mongoose = require('mongoose');
mongoose.connect('mongodb://10.0.0.55:27017/', {
  user: process.env.username,
  pass: process.env.password,
  dbName: process.env.db,
});

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
