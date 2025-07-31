const Contact = require('../../models/Contact');
const e = require("express");

const validateUnique = async (userId, phone, email, contactId = null) => {
    const existingByPhone = await Contact.query()
        .where('user_id', userId)
        .andWhere('phone', phone)
        .andWhereNot('id', contactId)
        .first();

    const existingByEmail = await Contact.query()
        .where('user_id', userId)
        .andWhere('email', email)
        .andWhereNot('id', contactId)
        .first();

    let errorType = null;
    if (existingByPhone) {
        errorType = 'phone';
    }
    if (existingByEmail) {
        errorType = 'email';
    }

    return errorType;
}

module.exports = {
    create: async (req, res) => {
        const {name, email, phone, address} = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !email || !phone || !address || !photo) {
            return res.status(400).json({error: 'all fields are mandatory'});
        }

        let errorType = await validateUnique(req.user.id, phone, email);

        if (errorType) {
            return res.status(400).json({type: errorType, error: 'contact with this email or phone already exists'});
        }

        const contact = await Contact.query().insert({
            name, email, phone, address, photo,
            user_id: req.user.id
        });

        req.flash('success', 'Contato criado com sucesso!');
        res.status(201).json(contact);
    },
    update: async (req, res) => {
        const {name, email, phone, address} = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !email || !phone || !address) {
            return res.status(400).json({error: 'all fields are mandatory'});
        }

        const contact = await Contact.query()
            .findById(req.params.id)
            .where('user_id', req.user.id);

        if (!contact) {
            return res.status(404).json({error: 'contact not found'});
        }

        let obj = {name, email, phone, address};
        if (photo) {
            obj.photo = photo;
        }

        let errorType = await validateUnique(req.user.id, phone, email, contact.id);

        if (errorType) {
            return res.status(400).json({type: errorType, error: 'contact with this email or phone already exists'});
        }

        const updatedContact = await contact.$query().patchAndFetch(obj);

        req.flash('success', 'Contato alterado com sucesso!');
        res.json(updatedContact);
    },
    delete: async (req, res) => {
        const contact = await Contact.query()
            .findById(req.params.id)
            .where('user_id', req.user.id);

        if (!contact) {
            return res.status(404).json({error: 'contact not found'});
        }

        await contact.$query().delete();
        if (req.body && req.body.flash) {
            req.flash('success', 'Contato excluído com sucesso!');
        }

        res.json({success: true, message: 'contact deleted successfully'});
    }
};