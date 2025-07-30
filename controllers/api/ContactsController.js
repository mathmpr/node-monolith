const Contact = require('../../models/Contact');

module.exports = {
    create: async (req, res) => {
        const {name, email, phone, address} = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !email || !phone || !address || !photo) {
            return res.status(400).json({error: 'all fields are mandatory'});
        }

        const contact = await Contact.query().insert({
            name, email, phone, address, photo,
            user_id: req.user.id
        });

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

        const updatedContact = await contact.$query().patchAndFetch(obj);

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

        res.json({success: true, message: 'contact deleted successfully'});
    }
};