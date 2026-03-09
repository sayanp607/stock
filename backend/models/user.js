const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  createUser: async (userData) => {
    const { uid, email, name } = userData;
    const role = email === 'sayanp607@gmail.com' ? 'super_admin' : 'user';
    const user = new User({ uid, email, name, role });
    return await user.save();
  },
  findUserByUid: async (uid) => {
    return await User.findOne({ uid });
  },
  updateUserRole: async (targetUid, newRole, requesterEmail) => {
    const superAdminEmail = 'sayanp607@gmail.com';
    const targetUser = await User.findOne({ uid: targetUid });
    if (!targetUser) throw new Error('Target user not found');
    if (targetUser.email === superAdminEmail) throw new Error('Cannot change super admin role');
    if (requesterEmail !== superAdminEmail) throw new Error('Only super admin can update roles');
    if (newRole !== 'admin' && newRole !== 'user') throw new Error('Invalid role');
    
    targetUser.role = newRole;
    await targetUser.save();
    return { success: true };
  },
};
