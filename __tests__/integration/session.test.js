const request = require("supertest");

const app = require("../../src/app")

const {User} = require('../../src/app/models');

const truncate = require("../utils/truncate.js");

describe("Authentication suit", () => {
	
	beforeEach(async () => {
		await truncate();
	});
	
	it("should authenticate with valid credentials", async() => {
		const user = await User.create({
			name: "Esq1z0",
			email: "esq1z0@esq1z0.com",
			password_hash: "12312313"
		});

		const response = await request(app)
								.post("/sessions")
								.send({
									email: user.email,
									password: '123456'
								});
		
		expect(response.statusCode).toBe(200);
	});
});