const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;