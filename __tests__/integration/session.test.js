const request = require("supertest");

const app = require("../../src/app")

const factory = require("../factories");

const truncate = require("../utils/truncate.js");

describe("Authentication suit", () => {

	beforeEach(async () => {
		await truncate();
	});
	
	it("should authenticate with valid credentials", async() => {
		const user = await factory.create("User", {
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
		const user = await factory.create("User", {
			password: "123456"
		});

		const response = await request(app)
								.post("/sessions")
								.send({
									email: user.email,
									password: '123123'
								});
		
		expect(response.statusCode).toBe(401);
	});


	it('should return jwt token when authenticate', async() => {

		const user = await factory.create("User", {
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

	it('should be able to access private routes when authenticated', async() => {
		const user = await factory.create("User", {
			password: "123456"
		});

		const response = await request(app)
								.get("/dashboard")
								.set("Authorization", `Bearer ${user.generateToken()}`)

		expect(response.statusCode).toBe(200);
	});

	it('should not be able to access private routes without JWT token', async() => {
		const response = await request(app)
								.get("/dashboard")
		expect(response.statusCode).toBe(401);
	});

	it('should not be able to access private routes with a invalid JWT token', async() => {
		const response = await request(app)
								.get("/dashboard")
								.set("Authorization", `Bearer 12131123`)

		expect(response.statusCode).toBe(401);
	});
});