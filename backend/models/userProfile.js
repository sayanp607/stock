const db = require('../config/db');

// Helper: get user id from uid
async function getUserIdFromUid(uid) {
  console.log('getUserIdFromUid called with uid:', uid);
  const { rows } = await db.query('SELECT id FROM users WHERE uid = $1', [uid]);
  if (!rows.length) {
    console.error('User not found for uid:', uid);
    throw new Error('User not found');
  }
  console.log('Found userId:', rows[0].id);
  return rows[0].id;
}

// Upsert user profile step
exports.saveStep = async (uid, field, value) => {
  // Only allow valid fields
  const validFields = [
    'age_group',
    'marital_status',
    'investment_goal',
    'market_comfort',
    'market_reaction',
  ];
  console.log('saveStep called with:', { uid, field, value });
  if (!validFields.includes(field)) {
    console.error('Invalid field:', field);
    throw new Error('Invalid field');
  }
  const userId = await getUserIdFromUid(uid);
  console.log('Upserting profile for userId:', userId, 'field:', field, 'value:', value);
  const query = `
    INSERT INTO user_profile (user_id, ${field})
    VALUES ($1, $2)
    ON CONFLICT (user_id) DO UPDATE SET ${field} = $2
    RETURNING *;
  `;
  const { rows } = await db.query(query, [userId, value]);
  console.log('Upsert result:', rows[0]);
  return rows[0];
};

// Get full profile for user
exports.getProfile = async (uid) => {
  console.log('getProfile called with uid:', uid);
  const userId = await getUserIdFromUid(uid);
  console.log('Fetching profile for userId:', userId);
  const { rows } = await db.query('SELECT * FROM user_profile WHERE user_id = $1', [userId]);
  console.log('Profile query result:', rows);
  return rows[0];
};
