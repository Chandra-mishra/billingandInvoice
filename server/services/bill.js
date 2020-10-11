const Bill = require("../models/bill");
const Product = require("../models/product");
module.exports = {
  save: async function(bill, next) {
    let result = null;

    try {
     let findProduct = await Product.findOne({"_id" : bill.product_id});
     bill.product_name = findProduct.name
     bill.amount = findProduct.price * JSON.parse(bill.quantity)
      if (bill._id) {
        return result = await Bill.findByIdAndUpdate(bill._id,bill);
      } else {
        return result = await new Bill(bill).save();
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async function(id, next) {
    let result = null;
    try {
        result = await Bill.findByIdAndDelete(id);
    } catch (err) {
      next(err);
    }
    return result;
  },
  listAll: async function(start,length,next){
    let result = null;
    let condition = {};
    try{
        result = await Bill.find(condition)
            .limit(length)
            .skip(start)
            .sort({
                name: 'asc'
            });
        return result
    }
    catch(err){
        next(err)
    }
  },

  getDetail: async function(id, next) {
    let result = null;
    try {
        result = await Product.findById(id);
      return result;
    } catch (err) {
      next(err);
    }
  }
};