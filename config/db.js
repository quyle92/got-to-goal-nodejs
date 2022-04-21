const { default: mongoose } = require("mongoose");

async function connect() {
    // await mongoose.connect('mongodb://localhost:27017/gtg_nodejs');
    await mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/gtg_nodejs?replicaSet=rs0');
    console.log('Connected to MongoDB')
}

module.exports = { connect }