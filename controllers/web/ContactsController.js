const Contact = require('../../models/Contact');

module.exports = {
    index: async (req, res) => {

        const contacts = await Contact.query()
            .where('user_id', req.user.id)
            .orderBy('created_at', 'desc');

        res.render('contacts/index', {
            user: req.user,
            contacts,
        });
    },
    create: async (req, res) => {
        res.render('contacts/form', {
            user: req.user,
            contact: {}
        });
    },
    view: async (req, res) => {
        const contact = await Contact.query()
            .findById(req.params.id)
            .where('user_id', req.user.id);

        if (!contact) {
            return res.status(404).render('contacts/view', {
                user: req.user,
                contact: false
            });
        }

        res.render('contacts/view', {
            user: req.user,
            contact,
        });
    },
    update: async (req, res) => {
        const contact = await Contact.query()
            .findById(req.params.id)
            .where('user_id', req.user.id);

        if (!contact) {
            res.render('contacts/form', {
                user: req.user,
                contact: false
            });
        }

        res.render('contacts/form', {
            user: req.user,
            contact,
        });
    }
};