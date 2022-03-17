const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    characterName: String,
    defaultAvatar: String,
    winnerAvatar: String,
    default_speed: Number,
    default_passing: Number,
    default_stamina: Number,
    default_shooting: Number,
    default_tackling: Number,
    costumes: [{ type: mongoose.Schema.ObjectId, ref: 'Costume'}]
}, { timestamps: true });

module.exports = mongoose.model('Character', schema);