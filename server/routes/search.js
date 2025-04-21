const searchController = require("../controllers/searchController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

class searchRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute(
      "post",
      "/search",
      checkAuthenticated,
      searchController.searchFits
    );
    this.registerRoute(
      "post",
      "/filter",
      checkAuthenticated,
      searchController.filterFitsByTag
    );
  }
}

module.exports = new searchRouter().getRouter();
