const bill = require("../models/bill");
const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const path = require("path");
const hbs = require("handlebars");
const moment = require("moment");

const compile = async function (tempelateName, data) {
  const filePath = path.join(__dirname, "../views/", `${tempelateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

module.exports = {
  invoice_gen: async function (id,next) {
    let result = null;
    try {
        let Bill = await bill.findById({"_id" : id}).populate("product_id").populate("user")
      const content = await compile("invoice", {
        customerRef : Bill.user._id,
        base_price: Bill.product_id.price,
        final_price: Bill.amount,
        orderRef: Bill._id,
        username: Bill.user.first_name + " " + Bill.user.last_name,
        address: Bill.user.email,
        quantity: Bill.quantity,
        product_name: Bill.product_id.name,
        billing_date:moment(Bill._id.getTimestamp()).format("DD-MM-YYYY")
      });
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(content);
      const buffer = await page.pdf({
        format: "A4",
        path: process.env.PDF_PATH+Bill._id+".pdf",
        printBackground: true,
        margin: {
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px",
        },
      });
      await browser.close();
      result = buffer;
    } catch (err) {
        next(err)
    }
    return result;
  },
};