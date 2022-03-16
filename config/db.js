const { default: mongoose } = require("mongoose");

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/gtg_nodejs');
    console.log('Connected to MongoDB')
}

module.exports = { connect }