require('dotenv').config();
const express = require('express');
const { Model } = require('objection');
const knex = require('knex');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

Model.knex(db);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'any-secret-thing',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use((req, res, next) => {
    if (!res.locals.flash) {
        res.locals.flash = {
            success: req.flash('success'),
            error: req.flash('error'),
            info: req.flash('info')
        };
        next();
    }
});

app.use((req, res, next) => {
    res.previous = req.get('Referer') || req.get('Referrer') || false;
    res.locals.previous = res.previous;
    next();
});

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});