const tagController = require("../controllers/tagController");
const BaseRouter = require("./BaseRouter");

class userRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/tag", tagController.addTag);
    this.registerRoute("get", "/tag/getAll", tagController.getAllTags);
    this.registerRoute("get", "/tag/", tagController.getTag);
    this.registerRoute("delete", "/tag", tagController.deleteTag);
  }
}

module.exports = new userRouter().getRouter();
