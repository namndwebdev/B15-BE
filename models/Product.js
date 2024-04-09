const mongoose = require("@configs/mongo");

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    featureImg: {
      type: String,
      default: "",
    },
    gallery: {
      type: Array,
      default: [],
      require: true
    },
    categories: {
      type: Array,
      require: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    brand: {
      type: Array,
      require: true,
    },
    tags: {
      type: Array,
      require: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

productSchema.pre("save", function (next) {
  if (!this.name) {
    return next(createError(400, "Vui long nhap ten cho shop"));
  }
  next();
});

let ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
