const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    playerName:{type: String, required: true},
    team: { type: mongoose.Schema.ObjectId, ref: 'Team', required: false },
    isLeader: { type: Boolean, required: false},
    lastActive: Date,
    isBonusActivator: { type: Boolean, default: 0 },
    bonusPickupStatus: { type: Boolean, default: 0 },
    teamJoinedAt: Date,
    teamDismissedInfo: {
        teamId: { type: mongoose.Schema.ObjectId, ref: 'Team', required: false },
        dismissedAt: Date
    },
    isUnlockTeam: Boolean,
    isUnlockH2h: Boolean,
    isUnlockShop: Boolean,
    backgroundColorUrl: String,
    tutorialStartedAt: Date,
    tutorialStepPassed: Number,
    audioStatus: Boolean,
    notificationStatus: Boolean,
    coin: Number,
    premiumCurrency: Number,
    rocket: Number,
    energyDrink: Number,
    newBoots: Number,
    megashield: Number,
    compass: Number,
    email: String,
    password: String,
    playerStatus: { type: String, enum: ['active', 'suspended'], default: 'active'}

});

module.exports = mongoose.model('Player', schema);