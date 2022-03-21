const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    playerName:{type: String, required: true},
    team: { type: mongoose.Schema.ObjectId, ref: 'Team', required: false },
    isLeader: { type: Boolean, required: false},
    lastActive: Date,
    isBonusActivator: { type: Boolean, default: 0 },
    bonusPickupStatus: { type: Boolean, default: 0 },
    teamJoinedAt: Date,
    teamDismissedInfo: {
        teamId: { type: mongoose.Schema.ObjectId, ref: 'Team'},
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
    playerStatus: { type: String, enum: ['active', 'suspended'], default: 'active'},
    characters:[{
        _id: { type: mongoose.Schema.ObjectId },
        point: { type: Number, min: 1 },
        isFavorite: {type: Boolean, default: 0},
        status: { type: String, enum: ['unlocked', 'selected'], default: 'unlocked' },
        speed: { type: Number, min: 1, default:1 },
        passing: { type: Number, min: 1, default:1 },
        stamina: { type: Number, min: 1, default:1 },
        shooting: { type: Number, min: 1, default:1 },
        tackling: { type: Number, min: 1, default:1 },
        superpowerLevel: { type: Number, min: 1, max:5 },
        purchased_costumes: [{ type: mongoose.Schema.ObjectId, ref: 'Costume' }]
    }]
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Player', schema);