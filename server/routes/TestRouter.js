const TestController = require("../controllers/TestController");
const BaseRouter = require("./BaseRouter");
// const NotificationController = require('../controllers/NotificationController');

// const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');

class TestRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("get", "/hell", TestController.GetHell);
  }
}

module.exports = new TestRouter().getRouter();
