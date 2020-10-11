const Product = require('../services/product');
const utils = require("../utils/util");

module.exports = {
    save: async function (req, res,next) {
        let result = await Product.save(req.body,next);
        utils.sendResponse(result, req, res);
    },
    listAll: async function (req, res,next) {
        let { start, length } = req.params;
        let result = await Product.listAll(parseInt(start), parseInt(length),next);
        utils.sendResponse(result, req, res);
    },
    geDetail: async function (req, res,next) {
        let result = await Product.getDetail(req.body,next);
        utils.sendResponse(result, req, res);
    },
    delete: async function (req, res,next) {
        let result = await Product.delete(req.body,next);
        utils.sendResponse(result, req, res);
    },
}