const { models } = require("../database");
const BaseController = require("./BaseController");

class clothingController extends BaseController {
  constructor() {
    super();
    this.addClothing = this.addClothing.bind(this);
    this.getClothing = this.getClothing.bind(this);
    this.deleteClothing = this.deleteClothing.bind(this);
  }

  async addClothing(req, res) {
    this.handleRequest(req, res, async () => {
      const { name, image_url } = req.body;
      if (!name || !image_url) {
        return res
          .status(400)
          .json({ success: false, error: "fields can not be empty!!!" });
      }
      try {
        const clothing = await models.clothing.create({
          name,
          image_url,
        });
        console.log("clothing item:", clothing);

        return res.status(201).json({
          success: true,
          message: "Clothing item added",
          clothing: {
            name: clothing.name,
            image_url: clothing.image_url,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add a clothing item",
          error: dbErr.message,
        });
      }
    });
  }

  async getClothing(req, res) {
    this.handleRequest(req, res, async () => {
      const { clothing_id, name, image_url } = req.body;
      try {
        const clothing = await models.clothing.findOne({
          where: { clothing_id },
        });

        if (!clothing) {
          return res.status(404).json({
            success: false,
            message: "Failed to find the clothing item.",
          });
        } else {
          return res.status(201).json({
            success: true,
            clothing: {
              id: clothing.clothing_id,
              name: clothing.name,
              image_url: clothing.image_url,
            },
          });
        }
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

  async deleteClothing(req, res) {
    this.handleRequest(req, res, async () => {
      const { clothing_id } = req.body;
      try {
        const clothing = await models.clothing.findOne({
          where: { clothing_id },
        });
        if (clothing) {
          await models.clothing.destroy({
            where: { clothing_id },
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed find the clothing item.",
          });
        }

        return res.status(201).json({
          success: true,
          clothing: {
            id: clothing.clothing_id,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to delete the clothing item.",
          error: dbErr.message,
        });
      }
    });
  }
}

module.exports = new clothingController();
