const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Store Firebase UID directly for easy lookup
  age_group: { type: String },
  marital_status: { type: String },
  investment_goal: { type: String },
  market_comfort: { type: String },
  market_reaction: { type: String },
  updated_at: { type: Date, default: Date.now }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Upsert user profile step
exports.saveStep = async (uid, field, value) => {
  const validFields = [
    'age_group',
    'marital_status',
    'investment_goal',
    'market_comfort',
    'market_reaction',
  ];
  if (!validFields.includes(field)) {
    throw new Error('Invalid field');
  }

  const update = { [field]: value, updated_at: Date.now() };
  return await UserProfile.findOneAndUpdate(
    { uid },
    { $set: update },
    { upsert: true, new: true }
  );
};

// Get full profile for user
exports.getProfile = async (uid) => {
  return await UserProfile.findOne({ uid });
};

module.exports = {
  UserProfile,
  saveStep: exports.saveStep,
  getProfile: exports.getProfile
};
