const TestController = require("../controllers/TestController");
const userController = require("../controllers/userController");
const BaseRouter = require("./BaseRouter");
// const NotificationController = require('../controllers/NotificationController');

// const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');

class userRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/user", userController.Register);
  }
}

module.exports = new userRouter().getRouter();
