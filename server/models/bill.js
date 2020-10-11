const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    product_name:{
        type:String
    },
    quantity:{
        type:Number
    },
    amount:{
        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("Bill", billSchema);