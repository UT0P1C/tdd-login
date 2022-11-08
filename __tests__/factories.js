const {faker} = require("@faker-js/faker")

const { factory } = require("factory-girl");


const { User } = require("../src/app/models");

faker.locale = "pt_BR";

factory.define("User", User, {
	name: faker.name.fullName() ,
	email: faker.internet.email(),
	password: faker.internet.password()
});

module.exports = factory;