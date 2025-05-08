const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();
// Rota de registro
//router.post('/register', authController.registerController);

// Rota de login
router.post('/login', authController.loginController);

module.exports = router;
