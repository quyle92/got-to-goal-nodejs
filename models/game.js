const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    gameMode: { type: String, enum: ['3v3', '5v5'], required: true },
    tieBreaker: { type: String, enum: ['golden_goal', 'penalty'], required: true },
    privacy: { type: String, enum: ['public', 'private'], required: true },
    result_set: { type: [String], required: true },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Game', schema);