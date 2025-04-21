const clothingController = require("../controllers/clothingController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

class clothingRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/clothing", checkAuthenticated, clothingController.addClothing);
    this.registerRoute("get", "/clothing", clothingController.getClothing);
    this.registerRoute("delete", "/clothing", checkAuthenticated, clothingController.deleteClothing);
    this.registerRoute("get", "/clothing/getAll", checkAuthenticated, clothingController.getAllClothing);
  }
}

module.exports = new clothingRouter().getRouter();
