const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    costumeUrl: String,
    coin: Number,
    premiumCurrency: Number,
    // characterId: { type: mongoose.Schema.ObjectId, ref: 'Character' }
}, { timestamps: true });

module.exports = mongoose.model('Costume', schema);