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
			name: "esq1z0",
			email: "aleatorio@esq1z0.com",
			password: "123456"
		});

		const response = await request(app)
								.post("/sessions")
								.send({
									email: user.email,
									password: '123456'
								});
		
		expect(response.statusCode).toBe(200);
	});

	it('should not authenticate with invalid credentials', async() => {
		const user = await User.create({
			name: "esq1z0",
			email: "aleatorio@esq1z0.com",
			password: "123456"
		});

		const response = await request(app)
								.post("/sessions")
								.send({
									email: user.email,
									password: '12345123'
								});
		
		expect(response.statusCode).toBe(401);
	});


	it('should return jwt token when authenticate', async() => {
		const user = await User.create({
			name: "esq1z0",
			email: "aleatorio@esq1z0.com",
			password: "123456"
		});

		const response = await request(app)
								.post("/sessions")
								.send({
									email: user.email,
									password: '123456'
								});

		expect(response.body).toHaveProperty("token");
	});
});