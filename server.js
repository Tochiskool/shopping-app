const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const shortId = require('shortid');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'))
mongoose.connect("mongodb://localhost/shopping-app-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
})

const Product = mongoose.model("products", new mongoose.Schema({
  _id: {
    type: String,
    default: shortId.generate
  },
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String]
}))

app.get("/api/products", async (req, res) => {
  
  const products =await Product.find({});
res.send(products)
})

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body)
  const savedProduct = await newProduct.save();
  res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deletedProduct)
})
const PORT = process.env.Port || 5000;

app.listen(PORT,()=>console.log("Serve at http://localhost:",PORT))