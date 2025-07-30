const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

const SignController = require('../controllers/api/SignController');

router.post('/sign-in', SignController.signIn);
router.post('/sign-up', SignController.signUp);

module.exports = router;