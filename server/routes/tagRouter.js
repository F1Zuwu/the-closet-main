const tagController = require("../controllers/tagController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

class tagRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/tag", checkAuthenticated, tagController.addTag);
    this.registerRoute("get", "/tag/getAll", checkAuthenticated, tagController.getAllTags);
    this.registerRoute("get", "/tag/", checkAuthenticated, tagController.getTag);
    this.registerRoute("delete", "/tag", checkAuthenticated, tagController.deleteTag);
  }
}

module.exports = new tagRouter().getRouter();
