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

    this.registerRoute("delete", "/fit/:fit_id/clothing/:clothing_id", checkAuthenticated, fitsController.removeClothingFromFit);
    this.registerRoute("delete", "/fit/:fit_id/accessory/:accessory_id", checkAuthenticated, fitsController.removeAccessoryFromFit);
    
    this.registerRoute("post", "/fit/save", checkAuthenticated, fitsController.saveSharedFit);
  }
}

module.exports = new fitRouter().getRouter();
