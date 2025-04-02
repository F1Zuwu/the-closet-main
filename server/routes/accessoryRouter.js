const accessoryController = require("../controllers/accessoryController");
const BaseRouter = require("./BaseRouter");

class userRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/accessory", accessoryController.addAccessory);
    this.registerRoute("get", "/accessory", accessoryController.getAccessory);
    this.registerRoute("delete", "/accessory", accessoryController.deleteAccessory);
  }
}

module.exports = new userRouter().getRouter();
