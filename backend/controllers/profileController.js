const UserProfile = require('../models/userProfile');

exports.saveStep = async (req, res) => {
  try {
    const { uid, field, value } = req.body;
  // Log request body
  console.log('Request body:', req.body);
    if (!uid || !field || typeof value === 'undefined') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const profile = await UserProfile.saveStep(uid, field, value);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    try {
      const profile = await UserProfile.getProfile(uid);
      res.json({ profile: profile || null });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
