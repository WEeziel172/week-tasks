/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createSchema('app_public', {
        ifNotExists: true
    })

};

exports.down = pgm => { };
