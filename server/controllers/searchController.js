const { Op } = require("sequelize");
const { models } = require("../database");
const BaseController = require("./BaseController");

class searchController extends BaseController {
  constructor() {
    super();
    this.searchFits = this.searchFits.bind(this);
    this.filterFitsByTag = this.filterFitsByTag.bind(this);
  }

  async searchFits(req, res) {
    this.handleRequest(req, res, async () => {
      const { search } = req.body;

      if (!search) {
        return res.status(400).json({
          success: false,
          error: "Search term is required.",
        });
      }

      try {
        const userId = req.user.id;
        const fits = await models.fits.findAll({
          where: {
            user_id: userId,
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        });

        return res.status(200).json({
          success: true,
          fits,
        });
      } catch (dbErr) {
        console.error("Search error:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to search fits.",
          error: dbErr.message,
        });
      }
    });
  }

  async filterFitsByTag(req, res) {
    this.handleRequest(req, res, async () => {
      const { tag_id } = req.body;

      if (!tag_id) {
        return res.status(400).json({
          success: false,
          error: "Tag ID is required for filtering.",
        });
      }

      try {
        const userId = req.user.id;
        const fits = await models.fits.findAll({
          where: {
            user_id: userId,
          },
          include: [
            {
              model: models.tags,
              through: { attributes: [] },
              where: {
                tag_id: {
                  [Op.in]: Array.isArray(tag_id) ? tag_id : [tag_id],
                },
                user_id: userId,
              },
              required: true,
            },
          ],
          distinct: true, 
        });

        return res.status(200).json({
          success: true,
          fits,
        });
      } catch (dbErr) {
        console.error("Filter error:", dbErr);
        return res.status(500).json({
          success: false,
          message: "Failed to filter fits by tag.",
          error: dbErr.message,
        });
      }
    });
  }
}

module.exports = new searchController();
