const express = require("express");
const router = express.Router();
const { createErrorMiddleware } = require("@middlewares/error");
const { validateQueryPaging } = require("@helper/validateData");
const createError = require("http-errors");
const { getAllUser, getDetailUser, updateUser } = require("@services/user");

// Get all
router.get("/", async (req, res, next) => {
  try {
    const { page, limit } = validateQueryPaging(req.query);
    const result = await getAllUser(page, limit);
    return res.json(result);
  } catch (error) {
    next(createError(500, error));
  }
});

// Get details
router.get("/:id", async (req, res, next) => {
  try {
    const result = await getDetailUser(req.params.id);
    return res.json(result)
  } catch (error) {
    next(createError(500, error));
  }
});

// Update user
router.put("/:id", async (req, res, next) => {
  try {
    const user = await getDetailUser(req.params.id)
    if(!user) {
      next(createError(403, "Forbidden"));
    } else {
      if(!(req.params.id === user._id.toString() && req.params.id === req.user._id)) {
        next(createError(403, "Forbidden"));
      }
    }
    const result = await updateUser(req.params.id, req.user.role, req.body);
    return res.json(result);
  } catch (error) {
    next(createError(500, error));
  }
});

let handleError = createErrorMiddleware("User");
router.use(handleError);

module.exports = router;
