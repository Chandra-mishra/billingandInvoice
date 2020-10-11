const Bill = require('../services/bill');
const utils = require("../utils/util");

module.exports = {
    save: async function (req, res,next) {
        let result = await Bill.save(req.body,next);
        utils.sendResponse(result, req, res);
    },
    listAll: async function (req, res,next) {
        let { start, length } = req.params;
        let result = await Bill.listAll(parseInt(start), parseInt(length),next);
        utils.sendResponse(result, req, res);
    },
    geDetail: async function (req, res,next) {
        let result = await Bill.getDetail(req.body,next);
        utils.sendResponse(result, req, res);
    },
    delete: async function (req, res,next) {
        let result = await Bill.delete(req.body,next);
        utils.sendResponse(result, req, res);
    },
}