const express = require("express");
const router = express.Router();
const { createErrorMiddleware } = require("@middlewares/error");
const { validateQueryPaging } = require("@helper/validateData");
const createError = require("http-errors");
const { createShopForMe, updateShopForMe } = require("@services/shop");

// Them shop moi cho minh
router.post("/shops", async (req, res, next) => {
    try {
        const result = await createShopForMe(req.user._id, req.body)
        return res.json(result)
    } catch(error) {
        next(createError(500, error))
    }
})
// Sua shop cua minh
router.put("/shops/:idShop", async (req, res, next) => {
    try {
        const payload = {
            idShop: req.params.idShop,
            idUser: req.user._id,
            dataShop: req.body
        }
        const result = await updateShopForMe(payload)
        return res.json(result)
    } catch(error) {
        next(createError(500, error))
    }
})

let handleError = createErrorMiddleware("User/Shop");
router.use(handleError);

module.exports = router;
