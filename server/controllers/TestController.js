const { models } = require('../database');
const BaseController = require('./BaseController');

class TestController extends BaseController {
    constructor() {
        super(); 
        this.GetHell = this.GetHell.bind(this);
    }

    async GetHell(req, res) {
        this.handleRequest(req, res, async () => {
            res.json({ success: true });
        });
    }
}

module.exports = new TestController();
