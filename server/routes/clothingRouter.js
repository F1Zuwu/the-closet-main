const clothingController = require("../controllers/clothingController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");


/**
 * @swagger
 * tags:
 *   name: Clothing
 *   description: Clothing management
 */

/**
 * @swagger
 * /api/clothing:
 *   post:
 *     summary: Add a new clothing item
 *     tags: [Clothing]
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
 *         description: Clothing item created
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get clothing for the current user
 *     tags: [Clothing]
 *     responses:
 *       200:
 *         description: List of clothing items
 */

/**
 * @swagger
 * /api/clothing:
 *   get:
 *     summary: Get a clothing item by ID
 *     tags: [Clothing]
 *     parameters:
 *       - in: query
 *         name: clothing_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the clothing item to retrieve
 *     responses:
 *       200:
 *         description: One clothing item
 *       404:
 *         description: Clothing item not found
 */


/**
 * @swagger
 * /api/clothing/getAll:
 *   get:
 *     summary: Get all clothing (admin or extended view)
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All clothing items
 */

/**
 * @swagger
 * /api/clothing:
 *   put:
 *     summary: Update a clothing item
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clothing_id
 *             properties:
 *               clothing_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clothing item updated
 *
 *   delete:
 *     summary: Delete a clothing item
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clothing_id
 *             properties:
 *               clothing_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clothing item deleted
 */


class clothingRouter extends BaseRouter {
  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.registerRoute("post", "/clothing", checkAuthenticated, clothingController.addClothing);
    this.registerRoute("get", "/clothing", clothingController.getClothing);
    this.registerRoute("get", "/clothing/getAll", checkAuthenticated, clothingController.getAllClothing);
    this.registerRoute("put", "/clothing", checkAuthenticated, clothingController.editClothing);
    this.registerRoute("delete", "/clothing", checkAuthenticated, clothingController.deleteClothing);
  }
}

module.exports = new clothingRouter().getRouter();
