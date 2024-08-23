const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const organisationSchema = new Schema({

    orgId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: String
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;