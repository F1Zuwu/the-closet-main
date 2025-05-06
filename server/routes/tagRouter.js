const tagController = require("../controllers/tagController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

  /**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management
 */

/**
 * @swagger
 * /api/tag:
 *   post:
 *     summary: Add a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tag_name
 *             properties:
 *               tag_name:
 *                 type: string
 *                 example: "Summer"
 *     responses:
 *       201:
 *         description: Tag created
 *       400:
 *         description: Missing required field
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a tag
 *     tags: [Tags]
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
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tag deleted
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tag/getAll:
 *   get:
 *     summary: Get all tags for the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tags
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tag/:
 *   get:
 *     summary: Get one tag by ID
 *     tags: [Tags]
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
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tag found
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */


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