const express = require('express');
const router = express.Router();
const { registerUser, updateUserRole, getAllUsers } = require('../controllers/authController');

router.post('/register-user', registerUser);
router.post('/update-user-role', updateUserRole);
router.get('/users', getAllUsers);

module.exports = router;
