// User model
module.exports = {
  createUser: async (pool, userData) => {
    const { uid, email, name } = userData;
    // If registering as super admin, set role to super_admin
    const role = email === 'sayanp607@gmail.com' ? 'super_admin' : 'user';
    try {
      const result = await pool.query(
        'INSERT INTO users (uid, email, name, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [uid, email, name, role]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error inserting user:', err);
      throw err;
    }
  },
  findUserByUid: async (pool, uid) => {
    const result = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);
    return result.rows[0];
  },
  updateUserRole: async (pool, targetUid, newRole, requesterEmail) => {
    // Prevent changing super admin's role
    const superAdminEmail = 'sayanp607@gmail.com';
    const targetUser = await pool.query('SELECT * FROM users WHERE uid = $1', [targetUid]);
    if (!targetUser.rows.length) throw new Error('Target user not found');
    if (targetUser.rows[0].email === superAdminEmail) throw new Error('Cannot change super admin role');
    if (requesterEmail !== superAdminEmail) throw new Error('Only super admin can update roles');
    if (newRole !== 'admin' && newRole !== 'user') throw new Error('Invalid role');
    await pool.query('UPDATE users SET role = $1 WHERE uid = $2', [newRole, targetUid]);
    return { success: true };
  },
};
