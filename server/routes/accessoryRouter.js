const accessoryController = require("../controllers/accessoryController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

class accessoryRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/accessory", checkAuthenticated, accessoryController.addAccessory);
    this.registerRoute("get", "/accessory", accessoryController.getAccessory);
    this.registerRoute("delete", "/accessory", checkAuthenticated, accessoryController.deleteAccessory);
    this.registerRoute("get", "/accessory/getAll", checkAuthenticated, accessoryController.getAllAccessories);
  }
}

module.exports = new accessoryRouter().getRouter();
