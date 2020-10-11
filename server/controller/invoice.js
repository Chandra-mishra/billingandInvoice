const invoice = require("../services/invoice");

module.exports = {
  invoice_gen: async function(req, res) {
    let result = await invoice.invoice_gen(req.body.id);
      res.end(result);
  }
};