const jwt = require("jsonwebtoken");

//middleware
const authenticateToken = (req, res, next) => {
  const secret = "devshrx1";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    // console.log(error);s
    return res.sendStatus(403);
  }
};

const middlewarePermissionAdmin = (req, res, next) => {
  const secret = "devshrx1";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  try {
    const user = jwt.verify(token, secret);
    req.user = user;

    if (user.role === "user") {
      // User has admin role, proceed to the next middleware
      next();
    } else {
      // User does not have admin role, send forbidden response
      return res.sendStatus(403);
    }
  } catch (error) {
    // Token verification failed, send forbidden response
    return res.sendStatus(403);
  }
};

module.exports = {
  authenticateToken,
  middlewarePermissionAdmin,
};
