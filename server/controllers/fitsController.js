const { models } = require("../database");
const BaseController = require("./BaseController");

class fitsController extends BaseController {
  constructor() {
    super();
    this.addFit = this.addFit.bind(this);
    this.getFit = this.getFit.bind(this);
    this.deleteFit = this.deleteFit.bind(this);
    this.getAllFits = this.getAllFits.bind(this);
  }

  async addFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { name, clothing_ids, accessory_ids, image_url, tag_ids, user_id } =
        req.body;
  
      if (!clothing_ids || !Array.isArray(clothing_ids) || clothing_ids.length === 0) {
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
          user_id,
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
        const fits = await models.fits.findAll();
        return res.status(201).json({
          success: true,
          fits: fits,
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
          where: { fit_id },
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

  async deleteFit(req, res) {
    this.handleRequest(req, res, async () => {
      const { fit_id } = req.body;
      try {
        const fit = await models.fits.findOne({
          where: { fit_id },
        });
        if (fit) {
          await models.fit.destroy({
            where: { fit_id },
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed to find the fit.",
          });
        }

        return res.status(201).json({
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
}

module.exports = new fitsController();
