const userController = require("../controllers/userController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");
// const NotificationController = require('../controllers/NotificationController');

// const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');

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
