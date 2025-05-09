const fitsController = require("../controllers/fitsController");
const BaseRouter = require("./BaseRouter");
const { checkAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Fits
 *   description: Outfit (Fit) management
 */

/**
 * @swagger
 * /api/fit:
 *   post:
 *     summary: Create a new fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, clothing_ids, image_url, tag_ids]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Work outfit"
 *               clothing_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               image_url:
 *                 type: string
 *                 example: "https://images-na.ssl-images-amazon.com/images/I/61es9JdKZWL._AC_UL210_SR210,210_.jpg"
 *               tag_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Fit created
 *       400:
 *         description: Invalid input
 *
 *   put:
 *     summary: Edit a fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fit_id, name, image_url]
 *             properties:
 *               fit_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fit updated
 */

/**
 * @swagger
 * /api/fit/getAll:
 *   get:
 *     summary: Get all fits for a user
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of fits
 */

/**
 * @swagger
 * /api/fit/{fit_id}:
 *   get:
 *     summary: Get a single fit
 *     tags: [Fits]
 *     parameters:
 *       - in: path
 *         name: fit_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the fit
 *     responses:
 *       200:
 *         description: Fit details
 */

/**
 * @swagger
 * /api/fit:
 *   delete:
 *     summary: Delete a fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fit_id]
 *             properties:
 *               fit_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fit deleted
 */

/**
 * @swagger
 * /api/fit/{fit_id}/clothing/{clothing_ids}:
 *   delete:
 *     summary: Remove clothing from fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fit_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: clothing_ids
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Clothing removed from fit
 */

/**
 * @swagger
 * /api/fit/{fit_id}/accessory/{accessory_id}:
 *   delete:
 *     summary: Remove accessory from fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fit_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: accessory_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Accessory removed from fit
 */

/**
 * @swagger
 * /api/fit/save:
 *   post:
 *     summary: Save a shared fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fit_id]
 *             properties:
 *               fit_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fit saved
 */

/**
 * @swagger
 * /api/fit/{fit_id}/addClothing:
 *   post:
 *     summary: Add clothing to a fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fit_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clothing_ids]
 *             properties:
 *               clothing_ids:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clothing added
 */

/**
 * @swagger
 * /api/fit/{fit_id}/addAccessory:
 *   post:
 *     summary: Add accessory to a fit
 *     tags: [Fits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fit_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [accessory_ids]
 *             properties:
 *               accessory_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Accessory added
 */


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
  
    this.registerRoute("post", "/fit/:fit_id/addClothing", checkAuthenticated, fitsController.addClothingToFit);
    this.registerRoute("post", "/fit/:fit_id/addAccessory", checkAuthenticated, fitsController.addAccessoriesToFit);
  }
}

module.exports = new fitRouter().getRouter();
