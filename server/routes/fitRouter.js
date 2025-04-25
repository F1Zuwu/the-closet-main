const fitsController = require("../controllers/fitsController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

class fitRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/fit", checkAuthenticated, fitsController.addFit);
    this.registerRoute("get", "/fit/getAll", checkAuthenticated, fitsController.getAllFits);
    this.registerRoute("get", "/fit/:fit_id", fitsController.getFit);
    this.registerRoute("put", "/fit", checkAuthenticated, fitsController.editFit);
    this.registerRoute("delete", "/fit", checkAuthenticated, fitsController.deleteFit);

  }
}

module.exports = new fitRouter().getRouter();
