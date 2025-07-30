module.exports = {
    index: async (req, res) => {

        const contacts = [
            {
                name: 'João Silva',
                phone: '11 91234-5678',
                email: 'joao@email.com',
                address: 'Rua das Flores, 123',
                photo: '/images/joao.jpg',
            }
        ];

        res.render('contacts/index', {
            user: { name: 'Matheus' },
            contacts,
        });
    },
};