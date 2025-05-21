const request = require("supertest");
const app = require("../index.js"); // Your Express app entry point
const { models } = require("../database");

let token;
let accessoryId;

beforeAll(async () => {
  await models.users.destroy({ where: {}, truncate: true, cascade: true });
  await models.accessory.destroy({ where: {}, truncate: true, cascade: true });

  const res = await request(app).post("/api/user/register").send({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  });
  console.log(res.body)
  token = res.body.token;
});

describe("Accessory Controller (JWT Protected)", () => {
  it("should add a new accessory", async () => {
    console.log(token)
    const res = await request(app)
      .post("/api/accessory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Watch",
        image_url: "http://example.com/watch.png",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.accessory).toHaveProperty("accessory_id");

    accessoryId = res.body.accessory.accessory_id;
  });

  it("should get the accessory by ID", async () => {
    const res = await request(app)
      .get("/api/accessory")
      .set("Authorization", `Bearer ${token}`) // Not protected in your setup, but good practice
      .query({ accessory_id: accessoryId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.accessory.name).toBe("Watch");
  });

  it("should get all accessories for the user", async () => {
    const res = await request(app)
      .get("/api/accessory/getAll")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.accessory)).toBe(true);
  });

  it("should edit an accessory", async () => {
    const res = await request(app)
      .put("/api/accessory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        accessory_id: accessoryId,
        name: "Smart Watch",
        image_url: "http://example.com/smartwatch.png",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.accessory.accessory.name).toBe("Smart Watch");
  });

  it("should delete the accessory", async () => {
    const res = await request(app)
      .delete("/api/accessory")
      .set("Authorization", `Bearer ${token}`)
      .send({ accessory_id: accessoryId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should fail without a token", async () => {
    const res = await request(app).get("/api/accessory/getAll");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
