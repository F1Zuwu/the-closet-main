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
      "get",
      "/search",
      checkAuthenticated,
      searchController.searchFits
    );
    this.registerRoute(
      "get",
      "/filter",
      checkAuthenticated,
      searchController.filterFitsByTag
    );
  }
}

module.exports = new searchRouter().getRouter();
