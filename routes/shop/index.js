const express = require("express");
const router = express.Router();
const { createErrorMiddleware } = require("@middlewares/error");
const { validateQueryPaging } = require("@helper/validateData");
const createError = require("http-errors");
const { createShopForMe, updateShopForMe } = require("@services/shop");
const { createProduct } = require("@services/product");

// Them san pham cho shop
router.post("/:idShop/products", async(req, res, next) => {
    try {
        const payload = {
            idShop: req.params.idShop,
            dataProduct: req.body
        }
        const result = await createProduct(payload)
        return res.json(result)
    } catch(error) {
        next(createError(500, error))
    }
})

let handleError = createErrorMiddleware("Shop");
router.use(handleError);

module.exports = router;
