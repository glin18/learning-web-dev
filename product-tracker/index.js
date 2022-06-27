const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Product = require("./models/product");
const methodOverride = require('method-override');
const Farm = require("./models/farm.js");

main()
    .then(() => {
        console.log("Connection is successful!");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
}

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

// Farm routes
app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', { id });
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const product = new Product(req.body);
    const farm = await Farm.findById(id);
    product.farm.push(farm);
    farm.products.push(product);
    const response = await product.save();
    console.log(response);
    const response2 = await farm.save();
    console.log(response2);
    res.redirect('/farms/:id/products');
})

app.get('/farms/:id/products', async (req, res) => {
    const { id } = req.params
    const farm = await Farm.findById(id);
    const products = await Product.find({ farm: farm });
    res.render('products/farmProducts', { farm, products });
})

app.get('/farms/new', (req, res) => {
    res.render("farms/new");
})

app.get('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/show', { farm });
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
})

app.post('/farms', async (req, res) => {
    console.log(req.body);
    const newFarm = new Farm(req.body);
    const response = await newFarm.save();
    console.log(response);
    res.redirect('/farms');
})

// Product routes


app.get('/products', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render("products/index.ejs", { products });
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect('/products');
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${id}`);
    console.log(product);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show.ejs', { product });
})