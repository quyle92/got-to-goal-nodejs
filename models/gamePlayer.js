const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    gameId: { type: mongoose.Schema.ObjectId, ref: 'Game', required: true},
    playerId: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true},
    characterIdList: [{ type: mongoose.Schema.ObjectId, ref: 'Character', required: true}],
    finalResult: { type: String, enum: ['won', 'lost', 'disconnected'], required: true},
    goalScored: {type: Number, min: 0}
}, { timestamps: true });

module.exports = mongoose.model('GamePlayer', schema);