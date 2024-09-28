import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  // console.log("hit")
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedInfo) {
    return res.status(401).json({ message: "Auth is bad" });
  }

  req.body.userId = decodedInfo.userId; ///issitraukiamia dekaduota userId

  // console.log(decodedInfo)
  next();
};

export default authUser;
