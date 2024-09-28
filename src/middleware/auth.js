import jwt from "jsonwebtoken";

const authCompany = (req, res, next) => {
  // console.log("hit")
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Auth is bad111" });
  }

  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedInfo) {
    return res.status(401).json({ message: "Auth is bad222222" });
  }

  req.body.companyId = decodedInfo.companyId;  ///issitraukiamia dekaduota companyid
  req.body.officeId = decodedInfo.companyId;  ///issitraukiamia dekaduota companyid

  // console.log(decodedInfo)
  next();
};

export default authCompany;
