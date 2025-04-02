const clothingController = require("../controllers/clothingController");
const BaseRouter = require("./BaseRouter");

class userRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/clothing", clothingController.addClothing);
    this.registerRoute("get", "/clothing", clothingController.getClothing);
    this.registerRoute("delete", "/clothing", clothingController.deleteClothing);
  }
}

module.exports = new userRouter().getRouter();
