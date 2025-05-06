const accessoryController = require("../controllers/accessoryController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

  /**
 * @swagger
 * tags:
 *   name: Accessories
 *   description: Accessory management
 */

/**
 * @swagger
 * /api/accessory:
 *   post:
 *     summary: Add a new accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image_url
 *             properties:
 *               name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Accessory item created
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get one accessory item by ID
 *     tags: [Accessories]
 *     parameters:
 *       - in: query
 *         name: accessory_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the accessory to retrieve
 *     responses:
 *       200:
 *         description: Accessory item returned
 *       404:
 *         description: Accessory not found
 */

/**
 * @swagger
 * /api/accessory/getAll:
 *   get:
 *     summary: Get all accessories for the authenticated user
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accessories
 */

/**
 * @swagger
 * /api/accessory:
 *   delete:
 *     summary: Delete an accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessory_id
 *             properties:
 *               accessory_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Accessory deleted
 *       404:
 *         description: Accessory not found
 *
 *   put:
 *     summary: Update an accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessory_id
 *               - name
 *               - image_url
 *             properties:
 *               accessory_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Accessory updated
 *       400:
 *         description: Invalid input
 */


class accessoryRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/accessory", checkAuthenticated, accessoryController.addAccessory);
    this.registerRoute("get", "/accessory", accessoryController.getAccessory);
    this.registerRoute("get", "/accessory/getAll", checkAuthenticated, accessoryController.getAllAccessories);
    this.registerRoute("delete", "/accessory", checkAuthenticated, accessoryController.deleteAccessory);
    this.registerRoute("put", "/accessory", checkAuthenticated, accessoryController.editAccessory);
  }
}

module.exports = new accessoryRouter().getRouter();
