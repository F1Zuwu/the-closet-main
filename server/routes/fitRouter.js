const fitsController = require("../controllers/fitsController");
const BaseRouter = require("./BaseRouter");

class fitRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/fit", fitsController.addFit);
    this.registerRoute("get", "/fit/getAll", fitsController.getAllFits);
    this.registerRoute("get", "/fit/:fit_id", fitsController.getFit);
    this.registerRoute("delete", "/fit", fitsController.deleteFit);
  }
}

module.exports = new fitRouter().getRouter();
