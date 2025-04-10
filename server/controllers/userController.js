const { models } = require("../database");
const BaseController = require("./BaseController");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class userController extends BaseController {
  constructor() {
    super();
    this.Register = this.Register.bind(this);
    this.Login = this.Login.bind(this);
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.user_id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }

  async Register(req, res) {
    this.handleRequest(req, res, async () => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ success: false, error: "fields can not be empty!!!" });
      }
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email format" });
      }

      try {
        const user = await models.users.create({
          username,
          email,
          password,
        });

        const token = this.generateToken(user);
        console.log(user);

        return res.status(201).json({
          success: true,
          message: "User created and logged in.",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to create user.",
          error: dbErr.message,
        });
      }
    });
  }

  async Login(req, res) {
    this.handleRequest(req, res, async () => {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ success: false, error: "fields can not be empty!!!" });
      }
      try {
        const user = await models.users.findOne({
          where: { username },
        });

        if (!user || user.password !== password) {
          return res
            .status(401)
            .json({ success: false, error: "Invalid credentials" });
        }

        const token = this.generateToken(user);
        console.log(user);

        return res.status(201).json({
          success: true,
          message: "User logged in.",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to login user.",
          error: dbErr.message,
        });
      }
    });
  }

  async getSession(req, res) {
    this.handleRequest(req, res, async () => {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    });
  }
}

module.exports = new userController();
