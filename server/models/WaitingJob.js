const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaitingJobSchema = new Schema({
    formdata: {
        type: Object,
        required: true
    },
    starterid: {
        type: String,
        required: true
    },
    activeuserid: {
        type: String,
        required: true
    },
    alluserids: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = WaitingJob = mongoose.model('waitingjob', WaitingJobSchema);

