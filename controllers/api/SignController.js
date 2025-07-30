const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const setToken = (user, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.json({ token, user: { id: user.id, email: user.email } });
}

module.exports = {
    signIn: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.query().findOne({ email });
        if (!user || !(await user.verifyPassword(password))) {
            return res.status(401).json({ error: 'invalid credentials' });
        }
        setToken(user, res);
    },
    signUp: (req, res) => {
        const { name, email, password } = req.body;
        User.query()
            .insert({ name, email, password: bcrypt.hashSync(password, 10) })
            .then(user => {
                setToken(user, res);
            })
            .catch(err => {
                res.status(500).json({
                    error: 'failed to create user',
                    type: err.name,
                });
            });
    },
    signOut: (req, res) => {
        req.user = null;
        res.clearCookie('token');
        res.json({ success: true, message: 'signed out successfully' });
    }
};