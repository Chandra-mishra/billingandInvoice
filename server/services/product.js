const Product = require("../models/product");
module.exports = {
  save: async function(product, next) {
    let result = null;

    try {
      if (product._id) {
        return result = await Product.findByIdAndUpdate(product._id,product);
      } else {
        return result = await new Product(product).save();
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async function(id, next) {
    let result = null;
    try {
        result = await Product.findByIdAndDelete(id);
    } catch (err) {
      next(err);
    }
    return result;
  },
  listAll: async function(start,length,next){
    let result = null;
    let condition = {};
    try{
        result = await Product.find(condition)
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