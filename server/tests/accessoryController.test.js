const request = require("supertest");
const app = require("../index");
const { models, sequelize } = require("../database/index");
const jwt = require("jsonwebtoken");

console.log('Loaded models:', Object.keys(models));


const mockToken = jwt.sign(
    { id: 2, username: "testUser123" },  
    process.env.JWT_SECRET || "testsecret"
  );

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await models.users.create({
    user_id: 2,
    username: "testUser123",
    email: "test123@user.com",
    password: "pass",
  });
});

describe("Accessory Controller", () => {
  it("POST /accessory → should add accessory", async () => {
    const res = await request(app)
      .post("/api/accessory")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        name: "Test Hat",
        image_url: "http://test.url/hat.jpg",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.accessory.name).toBe("Test Hat");
  });

  it("GET /accessory → should get all accessories for user", async () => {
    const mockToken = jwt.sign({ id: 2 }, process.env.JWT_SECRET || "secret");
  
    const res = await request(app)
      .get("/api/accessory")
      .set("Authorization", `Bearer ${mockToken}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.accessory)).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});
