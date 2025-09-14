const pool = require('../config/db');
const { createUser, findUserByUid, createAdmin, updateUserRole } = require('../models/user');

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
    let user = await findUserByUid(pool, uid);
    if (!user) {
      user = await createUser(pool, { uid, email, name });
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
    let user = await findUserByUid(pool, uid);
    if (!user) {
      user = await createAdmin(pool, { uid, email, name }, allowedAdminEmails);
    } else if (user.identity !== 'admin') {
      // If user exists but not admin, update identity if allowed
      if (allowedAdminEmails.includes(email)) {
        await pool.query('UPDATE users SET identity = $1 WHERE uid = $2', ['admin', uid]);
        user.identity = 'admin';
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
    const result = await updateUserRole(pool, targetUid, newRole, requesterEmail);
    res.json(result);
  } catch (err) {
    res.status(403).json({ success: false, error: err.message });
  }
};

// Get all users (for super admin panel)
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT uid, email, name, role FROM users');
    res.json({ users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
