const { models } = require("../database");
const BaseController = require("./BaseController");

class fitsController extends BaseController {
  constructor() {
    super();
    this.addFit = this.addFit.bind(this);
    this.getFit = this.getFit.bind(this);
    this.getAllFits = this.getAllFits.bind(this);
    this.editFit = this.editFit.bind(this);
    this.deleteFit = this.deleteFit.bind(this);

    this.removeClothingFromFit = this.removeClothingFromFit.bind(this);
    this.removeAccessoryFromFit = this.removeAccessoryFromFit.bind(this);

    this.saveSharedFit = this.saveSharedFit.bind(this);

    this.addClothingToFit = this.addClothingToFit.bind(this);
    this.addAccessoriesToFit = this.addAccessoriesToFit.bind(this);
  }

  async addFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { name, clothing_ids, accessory_ids, image_url, tag_ids } =
        req.body;

      if (
        !clothing_ids ||
        !Array.isArray(clothing_ids) ||
        clothing_ids.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: "At least one clothing_id is required",
        });
      }

      if (!tag_ids || !Array.isArray(tag_ids) || tag_ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one tag_id is required",
        });
      }

      try {
        const fit = await models.fits.create({
          name,
          image_url,
          user_id: req.user.id,
        });
        await fit.addClothing(clothing_ids);
        await fit.addTags(tag_ids);
        await fit.addAccessories(accessory_ids);

        console.log("Added clothing IDs:", clothing_ids);
        console.log("Added tag IDs:", tag_ids);
        console.log("Added accessory IDs:", accessory_ids);

        console.log("Fit created with clothing, tags, and accessories:", fit);

        return res.status(201).json({
          success: true,
          message: "Fit added successfully",
          fit,
        });
      } catch (dbErr) {
        console.error("Database error occurred:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add a fit",
          error: dbErr.message,
        });
      }
    });
  }

  async getAllFits(req, res) {
    this.handleRequest(req, res, async () => {
      try {
        const userId = req.user.id;
        const fits = await models.fits.findAll({
          where: { user_id: userId },
          include: [
            {
              model: models.clothing,
              through: { attributes: [] },
            },
            {
              model: models.tags,
              through: { attributes: [] },
            },
            {
              model: models.accessory,
              through: { attributes: [] },
            },
          ],
        });
        return res.status(200).json({
          success: true,
          fits,
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "An error has occured in code.",
          error: dbErr.message,
        });
      }
    });
  }

  async getFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.params;
      try {
        const fit = await models.fits.findOne({
          where: {
            fit_id,
          },
          include: [
            { model: models.clothing, through: { attributes: [] } },
            { model: models.tags, through: { attributes: [] } },
            { model: models.accessory, through: { attributes: [] } },
          ],
        });

        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        return res.status(200).json({
          success: true,
          fit,
        });
      } catch (dbErr) {
        console.error("Error getting fit:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while getting the fit",
          error: dbErr.message,
        });
      }
    });
  }

  async editFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id, name, image_url } = req.body;
      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
        });
        if (fit) {
          await fit.update(
            {
              name,
              image_url,
              user_id: req.user.id,
            },
            {
              where: { fit_id },
            }
          );
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed find the outfit.",
          });
        }

        return res.status(200).json({
          success: true,
          fit: {
            id: fit.fit_id,
            fit,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to edit the outfit.",
          error: dbErr.message,
        });
      }
    });
  }

  async deleteFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.body;
      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
        });
        if (fit) {
          await fit.destroy({
            where: { fit_id },
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed to find the fit.",
          });
        }

        return res.status(200).json({
          success: true,
          fit: {
            id: fit.fit_id,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to delete the fit item.",
          error: dbErr.message,
        });
      }
    });
  }

  async removeClothingFromFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id, clothing_id } = req.params;

      try {
        const fit = await models.fits.findByPk(fit_id);
        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        await fit.removeClothing(clothing_id);

        return res.status(200).json({
          success: true,
          message: "Clothing removed from fit",
        });
      } catch (err) {
        console.error("Error removing clothing from fit:", err);
        return res.status(500).json({
          success: false,
          message: "Could not remove clothing",
          error: err.message,
        });
      }
    });
  }

  async removeAccessoryFromFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id, accessory_id } = req.params;

      try {
        const fit = await models.fits.findByPk(fit_id);
        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        await fit.removeAccessory(accessory_id);

        return res.status(200).json({
          success: true,
          message: "Accessory removed from fit",
        });
      } catch (err) {
        console.error("Error removing accessory from fit:", err);
        return res.status(500).json({
          success: false,
          message: "Could not remove accessory",
          error: err.message,
        });
      }
    });
  }

  async saveSharedFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.body;
      const user_id = req.user.id;

      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
          include: [
            { model: models.clothing, through: { attributes: [] } },
            { model: models.tags, through: { attributes: [] } },
            { model: models.accessory, through: { attributes: [] } },
          ],
        });

        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        const newFit = await models.fits.create({
          name: `${fit.name} (copy)`,
          image_url: fit.image_url,
          user_id,
        });

        await newFit.addClothing(
          (fit.clothings || []).map((c) => c.clothing_id)
        );
        await newFit.addTags((fit.tags || []).map((t) => t.tag_id));
        await newFit.addAccessories(
          (fit.accessories || []).map((a) => a.accessory_id)
        );

        return res.status(201).json({
          success: true,
          message: "Fit copied to your closet!",
          fit: newFit,
        });
      } catch (err) {
        console.error("Error saving shared fit:", err);
        return res.status(500).json({
          success: false,
          message: "Could not save fit",
          error: err.message,
        });
      }
    });
  }

  async addClothingToFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.params;
      const { clothing_ids } = req.body;

      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
        });

        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        await fit.addClothing(clothing_ids);

        console.log("Added clothing ID(s):", clothing_ids);

        return res.status(200).json({
          success: true,
          message: "Clothing items added to fit successfully",
          fit,
          clothing_ids,
        });
      } catch (dbErr) {
        console.error("Database error occurred:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add clothing to fit",
          error: dbErr.message,
        });
      }
    });
  }

  async addAccessoriesToFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.params;
      const { accessory_ids } = req.body;

      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
        });

        if (!fit) {
          return res.status(404).json({
            success: false,
            message: "Fit not found",
          });
        }

        await fit.addAccessory(accessory_ids);

        console.log("Added accessory ID(s):", accessory_ids);

        return res.status(200).json({
          success: true,
          message: "Accessories added to fit successfully",
          fit,
        });
      } catch (dbErr) {
        console.error("Database error occurred:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add accessories to fit",
          error: dbErr.message,
        });
      }
    });
  }
}

module.exports = new fitsController();
