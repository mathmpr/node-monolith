const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleError = (res, error) => {
    if (req.path.startsWith('/api')) {
        return res.status(401).json(error);
    }
    return res.redirect('/sign-in');
};

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token ?? authHeader?.split(' ')[1];

    if (!token) return handleError({ error: 'no provided token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.query().findById(decoded.id);
        if (!user) return handleError({ error: 'user not found' });
        req.user = user;
        next();
    } catch (err) {
        return handleError({ error: 'invalid token' });
    }
};

module.exports = authMiddleware;
