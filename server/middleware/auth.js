import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //which token google/custom - tokens greater than 500 chars are google
    const isCustomAuth = token.length < 500;

    let decodedData;
    // get user id in case of our own token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      // in case of google token
      decodedData = jwt.decode(token);
      //sub is google's id for each user
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
