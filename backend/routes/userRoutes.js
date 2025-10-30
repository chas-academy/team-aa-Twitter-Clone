const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser 

} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// admin-only routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers); // list all users
router.put('/:id', authMiddleware, adminMiddleware, updateUser); // update a user
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser); // delete a user

module.exports = router;