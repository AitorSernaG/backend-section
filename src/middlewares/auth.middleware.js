const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    /*const error = new Error();
    error.message = "Token must be sent";
    error.status = 400;
    throw error;*/
    return res.status(400).send({status: 400, message: "Token must be sent"});  
  }

  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if (err) {
      /*const error = new Error();
      error.message = "Invalid token";
      error.status = 401;
      throw error;*/
      return res.status(404).send({status: 404, message: "Invalid token"});  
      
    }

    req.user = decodedToken.user;
    next();
  });
};
