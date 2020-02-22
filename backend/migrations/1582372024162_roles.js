/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createRole('admin', {
        superuser: false,

    })
    pgm.createRole('super', {
        superuser: true,

    })
    pgm.createRole('user', {
        superuser: false,

    })
};

exports.down = pgm => {
    pgm.dropRole('admin')
    pgm.dropRole('super')
    pgm.dropRole('user')
};
