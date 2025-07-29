require('dotenv').config();
const express = require('express');
const { Model } = require('objection');
const knex = require('knex');
const path = require('path');

const User = require('./models/User');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

Model.knex(db);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.query();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.query().insert(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});