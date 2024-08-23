const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrganisationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true
  }
});

const UserOrganisation = mongoose.model('UserOrganisation', userOrganisationSchema);

module.exports = UserOrganisation;
