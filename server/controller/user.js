const User = require('../services/user');
const utils = require("../utils/util");

module.exports = {
    save: async function (req, res,next) {
        let result = await User.save(req.body,next);
        utils.sendResponse(result, req, res);
    },
    edit: async function (req, res,next) {
        let result = await User.save(req.body,next);
        utils.sendResponse(result, req, res);
    },
    listAll: async function (req, res,next) {
        let { start, length } = req.params;
        let result = await User.listAll(parseInt(start), parseInt(length),next);
        utils.sendResponse(result, req, res);
    },
    geDetail: async function (req, res,next) {
        let result = await User.getDetail(req.body,next);
        utils.sendResponse(result, req, res);
    },
    delete: async function (req, res,next) {
        let result = await User.delete(req.body,next);
        utils.sendResponse(result, req, res);
    },
    login: async function (req, res,next) {
        let result = await User.login(req.body.email,next);
        utils.sendResponse(result, req, res);
    },
}