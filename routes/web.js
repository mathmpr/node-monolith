const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

const SignController = require('../controllers/web/SignController');
const ContactsController = require('../controllers/web/ContactsController');

router.get('/', SignController.signIn);
router.get('/sign-in', SignController.signIn);
router.get('/sign-up', SignController.signUp);
router.get('/sign-out', SignController.signOut);

router.get('/contacts', authMiddleware, ContactsController.index);



module.exports = router;