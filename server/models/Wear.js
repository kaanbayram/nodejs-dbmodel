const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Wear = mongoose.model('wear', WearSchema);

