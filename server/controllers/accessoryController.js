const { models } = require("../database");
const BaseController = require("./BaseController");

class accessoryController extends BaseController {
  constructor() {
    super();
    this.addAccessory = this.addAccessory.bind(this);
    this.getAccessory = this.getAccessory.bind(this);
    this.deleteAccessory = this.deleteAccessory.bind(this);
  }

  async addAccessory(req, res) {
    this.handleRequest(req, res, async () => {
      const { name, image_url } = req.body;
      if (!name || !image_url) {
        return res
          .status(400)
          .json({ success: false, error: "fields can not be empty!!!" });
      }
      try {
        const accessory = await models.accessory.create({
          name,
          image_url,
        });
        console.log("accessory:", accessory);

        return res.status(201).json({
          success: true,
          message: "Accessory added",
          accessory: {
            name: accessory.name,
            image_url: accessory.image_url,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add an accessory",
          error: dbErr.message,
        });
      }
    });
  }

  async getAccessory(req, res) {
    this.handleRequest(req, res, async () => {
      const { accessory_id, name, image_url } = req.body;
      try {
        const accessory = await models.accessory.findOne({
          where: { accessory_id },
        });

        if (!accessory) {
          return res.status(404).json({
            success: false,
            message: "Failed to find the accessory.",
          });
        } else {
          return res.status(201).json({
            success: true,
            accessory: {
              id: accessory.accessory_id,
              name: accessory.name,
              image_url: accessory.image_url,
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

  async deleteAccessory(req, res) {
    this.handleRequest(req, res, async () => {
      const { accessory_id } = req.body;
      try {
        const accessory = await models.accessory.findOne({
          where: { accessory_id },
        });
        if (accessory) {
          await models.accessory.destroy({
            where: { accessory_id },
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed find the accessory.",
          });
        }

        return res.status(201).json({
          success: true,
          accessory: {
            id: accessory.accessory_id,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to delete the accessory.",
          error: dbErr.message,
        });
      }
    });
  }
}

module.exports = new accessoryController();
