const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose
  .connect('mongodb://10.0.0.11:27017/', {
    user: process.env.username,
    pass: process.env.password,
    dbName: process.env.db,
    autoIndex: true,
  })
  .then((r) => {});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 10);
    },
  },
});

const User = mongoose.model('User', UserSchema);

// User.db.dropCollection('users');
module.exports = { User };
