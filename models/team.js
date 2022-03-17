const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    teamName: { type: String, required: true },
    description: String,
    maxPlayer: Number
}, { timestamps: true});

module.exports = mongoose.model('Team', schema);