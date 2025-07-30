const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

const SignController = require('../controllers/api/SignController');
const ContactsController = require('../controllers/api/ContactsController');

router.post('/sign-in', SignController.signIn);
router.post('/sign-up', SignController.signUp);
router.get('/sign-out', SignController.signOut);

router.post('/contacts/create', authMiddleware, uploadMiddleware.single('photo'), ContactsController.create);
router.put('/contacts/:id/update', authMiddleware, uploadMiddleware.single('photo'), ContactsController.update);
router.delete('/contacts/:id/delete', authMiddleware, ContactsController.delete);

module.exports = router;