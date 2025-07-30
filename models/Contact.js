const { Model } = require('objection');

class Contact extends Model {
    static get tableName() {
        return 'contacts';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string', nullable: true },
                photo: { type: 'string', nullable: false },
                address: { type: 'string', nullable: true },
            },
        };
    }

    async getUser() {
        return this.$relatedQuery('user');
    }
}

module.exports = Contact;