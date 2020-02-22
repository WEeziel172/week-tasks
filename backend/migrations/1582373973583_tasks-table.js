/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('tasks', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        body: { type: 'text', notNull: true },
        completed: { type: 'boolean', default: false },
        date: { type: 'date', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('tasks', 'userId')
};

exports.down = pgm => { };
