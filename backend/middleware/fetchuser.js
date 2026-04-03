const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) {
    return res.status(401).send({ error: "Access Denied! you are not authenticated" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data; 
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token!" });
  }
};

module.exports = fetchuser;