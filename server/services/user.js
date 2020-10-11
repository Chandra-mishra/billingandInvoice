const User = require('../models/user');
const utils = require('../utils/util')
const btoa = require('btoa')
const request = require('request')

module.exports = {
    save: async function(user, next) {
        let result = null;
    
        try {
          if (user._id) {
            return result = await User.findByIdAndUpdate(user._id,user);
          } else {
            return result = await new User(product).save();
          }
        } catch (err) {
          next(err);
        }
      },
      delete: async function(id, next) {
        let result = null;
        try {
            result = await User.findByIdAndDelete(id);
        } catch (err) {
          next(err);
        }
        return result;
      },

    listAll: async function(start,length,next){
        let result = null;
        let condition = {};
        try{
            result = await User.find(condition)
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
            result = await User.findById(id);
          return result;
        } catch (err) {
          next(err);
        }
      },
    login: async function (email,next) {
        let result = null,tokenVal  = null
        try {
          let token = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_ID}`)
          let user = await User.findOne({ email: email });
          if(!user){
            throw "user does not exist";
          }
          console.log(token)
          const auth = await request({
            uri: `${process.env.ISSUER}"/"${email}`,
            json: true,
            method: 'POST',
            headers: {
              authorization: `Bearer ${token}`
            },
            form: {
              grant_type: 'client_credentials',
              scope: 'customScope'
            }
          })
          tokenVal = auth.headers.authorization
        result = user;
        // token = await utils.jwtEncode({ email: user.email, userId: user._id });
        } catch (err) {
          next(err)
        }
        return {result,tokenVal};
      },
}