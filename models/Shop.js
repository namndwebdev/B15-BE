const mongoose = require("@configs/mongo");
const createError = require("http-errors");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    idUser: {
      type: String,
      require: true,
    },
    // ref: {
    //     collection: String,
    //     id: String
    // }
  },
  {
    collection: "shops",
    timestamps: true,
  }
);

shopSchema.pre("save", function (next) {
  if (!this.name) {
    return next(createError(400, "Vui long nhap ten cho shop"));
  }
  next();
});

const ShopModel = mongoose.model("Shop", shopSchema);

module.exports = ShopModel;
