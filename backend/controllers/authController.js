const { User, createUser, findUserByUid, updateUserRole } = require('../models/user');

// List of allowed admin emails
const allowedAdminEmails = [
  'admin1@example.com',
  'admin2@example.com'
  // Add more allowed admin emails here
];

// Handles registration/login for user
exports.registerUser = async (req, res) => {
  const { uid, email, name } = req.body;
  try {
    let user = await findUserByUid(uid);
    if (!user) {
      user = await createUser({ uid, email, name });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Handles registration for admin (restricted)
exports.registerAdmin = async (req, res) => {
  const { uid, email, name } = req.body;
  try {
    let user = await findUserByUid(uid);
    if (!user) {
      if (allowedAdminEmails.includes(email)) {
        user = await createUser({ uid, email, name });
        user.role = 'admin';
        await user.save();
      } else {
        throw new Error('Email not allowed for admin registration');
      }
    } else if (user.role !== 'admin' && user.role !== 'super_admin') {
      if (allowedAdminEmails.includes(email)) {
        user.role = 'admin';
        await user.save();
      } else {
        throw new Error('Email not allowed for admin registration');
      }
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(403).json({ success: false, error: err.message });
  }
};

// Update user role (super admin)
exports.updateUserRole = async (req, res) => {
  const { targetUid, newRole, requesterEmail } = req.body;
  try {
    const result = await updateUserRole(targetUid, newRole, requesterEmail);
    res.json(result);
  } catch (err) {
    res.status(403).json({ success: false, error: err.message });
  }
};

// Get all users (for super admin panel)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'uid email name role');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
