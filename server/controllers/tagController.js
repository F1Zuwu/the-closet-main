const { models } = require("../database");
const BaseController = require("./BaseController");

class tagController extends BaseController {
  constructor() {
    super();
    this.addTag = this.addTag.bind(this);
    this.getTag = this.getTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
  }

  async addTag(req, res) {
    this.handleRequest(req, res, async () => {
      const { tag_name } = req.body;
      if (!tag_name) {
        return res
          .status(400)
          .json({ success: false, error: "field can not be empty!!!" });
      }
      try {
        const tag = await models.tags.create({
          tag_name,
          user_id: req.user.id,
        });
        console.log("tag:", tag);

        return res.status(201).json({
          success: true,
          message: "Tag added",
          tag: {
            tag_name: tag.name,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add a tag",
          error: dbErr.message,
        });
      }
    });
  }

  async getAllTags(req, res) {
    this.handleRequest(req, res, async () => {
      try {
        const userId = req.user.id;
        const tags = await models.tags.findAll({
          where: { user_id: userId },
        });
        return res.status(200).json({
          success: true,
          tags: tags,
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

  async getTag(req, res) {
    this.handleRequest(req, res, async () => {
      const { tag_id } = req.body;
      try {
        const tag = await models.tags.findOne({
          where: { tag_id },
        });

        if (!tag) {
          return res.status(404).json({
            success: false,
            message: "Failed to find the tag.",
          });
        } else {
          return res.status(201).json({
            success: true,
            tag: {
              id: tag.tag_id,
              tag_name: tag.name,
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

  async deleteTag(req, res) {
    this.handleRequest(req, res, async () => {
      const { tag_id } = req.body;
      try {
        const tag = await models.tags.findOne({
          where: { tag_id },
        });
        if (tag) {
          await models.tags.destroy({
            where: { tag_id },
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Failed find the tag.",
          });
        }

        return res.status(201).json({
          success: true,
          tag: {
            id: tag.tag_id,
          },
        });
      } catch (dbErr) {
        console.error("Database error occured: ", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to delete the tag item.",
          error: dbErr.message,
        });
      }
    });
  }
}

module.exports = new tagController();
