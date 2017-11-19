const mongoose = require('mongoose');
const db = require('./../configuration/dbUri');

mongoose.connect(db, { useMongoClient: true });

module.exports = mongoose.connection;