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
    this.registerRoute("get", "/accessory/getAll", checkAuthenticated, accessoryController.getAllAccessories);
    this.registerRoute("delete", "/accessory", checkAuthenticated, accessoryController.deleteAccessory);
    this.registerRoute("put", "/accessory", checkAuthenticated, accessoryController.editAccessory);
  }
}

module.exports = new accessoryRouter().getRouter();
