const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { validateEmail } = require("@helper/validateData");
const { createUser, findUserByEmail } = require("@services/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefeshToken } = require("@helper/jwt");
const { createErrorMiddleware } = require("@middlewares/error");
const { saveToken } = require("@services/token");
const { verifyJWT } = require("@helper/jwt");
const {
  INVALID_EMAIL,
  WRONG_PASSWORD,
  EMAIL_NOT_EXIST,
} = require("@errors/auth");
router.post("/signup", async (req, res, next) => {
  try {
    let result = await createUser(req.body);
    return res.json(result);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      return next(createError(400, INVALID_EMAIL));
    }

    let user = await findUserByEmail(email);
    if (user) {
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        user = user.toJSON();
        delete user.password;
        let tokenAccess = await generateAccessToken(user);
        let tokenRefresh = await generateRefeshToken(user);
        return res.json({
          user: user,
          accessToken: tokenAccess,
          refeshToken: tokenRefresh,
        });
      } else {
        return next(createError(400, WRONG_PASSWORD));
      }
    } else {
      return next(createError(400, EMAIL_NOT_EXIST));
    }
  } catch (error) {
    next(createError(500, error.message));
  }
});
router.post("/refreshToken", async (req, res, next) => {
  try {
    let refreshToken = req.headers.authorization?.split(" ")[1];
    // let isRefreshTokenInBlack = await findToken(refreshToken);
    // if (isRefreshTokenInBlack) {
    //   return next(createError(401, TOKEN_BLACKIST));
    // }
    if (!refreshToken) {
      return next(createError(401, UNAUTHEN));
    }
    let user = await verifyJWT(refreshToken);
    delete user.iat
    delete user.exp
    console.log(user)
    req.user = user;
    if (user) {
      var newAccessToken = await generateAccessToken(user);
      var newRefreshToken = await generateRefeshToken(user);
      return res.json({
        user,
        newAccessToken,
        newRefreshToken,
      });
    }
  } catch (err) {
    console.log(err);
    switch (err.message) {
      case "invalid signature":
      case "invalid token":
      case "jwt expired":
        return next(createError(403, err.message));
      default:
        return next(createError(500));
    }
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    await saveToken(token);

    return res.json("Dang xuat thanh cong");
  } catch (error) {
    next(createError(500, error.message));
  }
});

let handleError = createErrorMiddleware("Auth");
router.use(handleError);

module.exports = router;
