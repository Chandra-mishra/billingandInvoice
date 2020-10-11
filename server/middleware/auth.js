const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
  clientId: process.env.CLIENT_ID,
  assertClaims: {
    'groups.includes': ['Everyone', 'Another']
  }
})

const auth  = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')
    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    const { claims } = await oktaJwtVerifier.verifyAccessToken(token,process.env.ISSUER)
    if (!claims.scp.includes(process.env.SCOPE)) {
      throw new Error('Could not verify the proper scope')
    }
    next()
  } catch (error) {
    next(error.message)
  }
}
module.exports = auth;









// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// // const OAuthStrategy = require('passport-oauth').OAuthStrategy;
// const User = require("../models/user");

// passport.serializeUser(function(user, done) {
//   console.log("sfvshgfs00000000000000")
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   console.log(id,"sfvshgfs")
//   User.findById({_id : id}, function(err, user) {
//     done(err, user);
//   });
// });

//   passport.use(new GoogleStrategy({
//     clientID: '327367974510-biu703affa97ap3otrafclsqrhof9gs4.apps.googleusercontent.com',
//     clientSecret: 'pIQXPYT4DiCR5MwdJPFvvK1a',
//     callbackURL: "http://localhost:3001/auth/google/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     console.log(profile,"sdnfjsadfbsfh")
//     User.findById({_id : profile.id}, function(err, user) {
//       done(err, user);
//     });
//   }
// ));








// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")
//       ? req.header("Authorization").replace("Bearer ", "")
//       : "";
//     if (!token) {
//       throw Error("Authorization token missing.");
//     }
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     console.log(decoded)
//     const user = await User.findOne({_id : decoded.userId});
//     if (!user) {
//       throw Error("User Verification failed");
//     }
//     req.currUser = user;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: e.message });
//   }
// };
// module.exports = auth;