'use strict';
let data = [];
let nbr = [20];
const { date, database } = require('faker');
var faker = require('faker');
const role = ['admin', 'author', 'guest'];

var d = new Date();

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (let i = 0; i < nbr; i++) {
            data.push({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.randomize(role),
                createdAt: d,
                updatedAt: d
            })

        }
        await queryInterface.bulkInsert('Users', data, {})
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};