const searchController = require("../controllers/searchController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");


  /**
 * @swagger
 * tags:
 *   name: Search
 *   description: Endpoints for searching and filtering fits
 */

/**
 * @swagger
 * /api/search:
 *   post:
 *     summary: Search fits by name
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: object
 *             required:
 *               - search
 *     responses:
 *       200:
 *         description: List of matching fits
 *       400:
 *         description: Search term is required.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/filter:
 *   post:
 *     summary: Filter fits by tag(s)
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tag_id
 *             properties:
 *               tag_id:
 *                 oneOf:
 *                   - type: integer
 *                   - type: array
 *                     items:
 *                       type: integer
 *     responses:
 *       200:
 *         description: List of filtered fits
 *       404:
 *         description: Missing tag ID
 *       500:
 *         description: Internal server error
 */


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
