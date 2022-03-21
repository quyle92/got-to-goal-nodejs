const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

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

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Character', schema);