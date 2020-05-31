const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    formdata: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Form = mongoose.model('form', FormSchema);

