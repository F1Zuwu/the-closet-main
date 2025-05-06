const userController = require("../controllers/userController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");
// const NotificationController = require('../controllers/NotificationController');

// const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and session management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created and logged in
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get the current session's user info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session info returned
 *       401:
 *         description: Unauthorized
 */


class userRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/user/register", userController.Register);
    this.registerRoute("post", "/user/login", userController.Login);
    this.registerRoute('get', '/sessions', checkAuthenticated, userController.getSession);
  }
}

module.exports = new userRouter().getRouter();
