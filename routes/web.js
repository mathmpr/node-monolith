const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const signedMiddleware = require('../middlewares/signed');

const SignController = require('../controllers/web/SignController');
const ContactsController = require('../controllers/web/ContactsController');

router.get('/', signedMiddleware, SignController.signIn);
router.get('/sign-in', signedMiddleware, SignController.signIn);
router.get('/sign-up', signedMiddleware, SignController.signUp);

router.get('/contacts', authMiddleware, ContactsController.index);
router.get('/contacts/create', authMiddleware, ContactsController.create);
router.get('/contacts/:id/update', authMiddleware, ContactsController.update);
router.get('/contacts/:id/view', authMiddleware, ContactsController.view);

module.exports = router;