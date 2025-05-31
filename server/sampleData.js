// import mongoose from "mongoose";
// import Product from "./models/Product.js"; // Don't forget the .js extension
// import dotenv from "dotenv";

// require("dotenv").config();

// const sampleProducts = [
//   {
//     name: "Red T-Shirt",
//     image: "data:image/jpeg;base64,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",
//     price: 19.99,
//     description: "A nice red t-shirt.",
//     category: "clothing",
//   },
//   {
//     name: "Blue Jeans",
//     image: "data:image/jpeg;base64,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",
//     price: 39.99,
//     description: "Comfortable blue jeans.",
//     category: "clothing",
//   },
//   {
//     name: "Wireless Mouse",
//     image: "https://via.placeholder.com/150",
//     price: 25.99,
//     description: "A sleek wireless mouse.",
//     category: "electronics",
// },
// {
//     name: "Gaming Keyboard",
//     image: "https://via.placeholder.com/150",
//     price: 49.99,
//     description: "A mechanical gaming keyboard.",
//     category: "electronics",
// },
// {
//     name: "Cooking Pan",
//     image: "https://via.placeholder.com/150",
//     price: 29.99,
//     description: "Non-stick cooking pan.",
//     category: "kitchen",
// },
// {
//     name: "Blender",
//     image: "https://via.placeholder.com/150",
//     price: 59.99,
//     description: "High-speed blender.",
//     category: "kitchen",
// },
// {
//     name: "Running Shoes",
//     image: "https://via.placeholder.com/150",
//     price: 79.99,
//     description: "Comfortable running shoes.",
//     category: "footwear",
// },
// {
//     name: "Leather Wallet",
//     image: "https://via.placeholder.com/150",
//     price: 39.99,
//     description: "Genuine leather wallet.",
//     category: "accessories",
// },
// {
//     name: "Smartphone",
//     image: "https://via.placeholder.com/150",
//     price: 699.99,
//     description: "Latest model smartphone.",
//     category: "electronics",
// },
// {
//     name: "Laptop",
//     image: "https://via.placeholder.com/150",
//     price: 999.99,
//     description: "High-performance laptop.",
//     category: "electronics",
// },
// {
//     name: "Headphones",
//     image: "https://via.placeholder.com/150",
//     price: 199.99,
//     description: "Noise-cancelling headphones.",
//     category: "electronics",
// },
// {
//     name: "Smartwatch",
//     image: "https://via.placeholder.com/150",
//     price: 249.99,
//     description: "Feature-rich smartwatch.",
//     category: "electronics",
// },
// {
//     name: "Sunglasses",
//     image: "https://via.placeholder.com/150",
//     price: 89.99,
//     description: "Stylish sunglasses.",
//     category: "accessories",
// },
// {
//     name: "Backpack",
//     image: "https://via.placeholder.com/150",
//     price: 49.99,
//     description: "Durable backpack.",
//     category: "accessories",
// },
// {
//     name: "Water Bottle",
//     image: "https://via.placeholder.com/150",
//     price: 19.99,
//     description: "Insulated water bottle.",
//     category: "accessories",
// },
// {
//     name: "Yoga Mat",
//     image: "https://via.placeholder.com/150",
//     price: 29.99,
//     description: "Non-slip yoga mat.",
//     category: "fitness",
// },
// {
//     name: "Dumbbells",
//     image: "https://via.placeholder.com/150",
//     price: 49.99,
//     description: "Adjustable dumbbells.",
//     category: "fitness",
// },
// {
//     name: "Treadmill",
//     image: "https://via.placeholder.com/150",
//     price: 499.99,
//     description: "Electric treadmill.",
//     category: "fitness",
// },
// {
//     name: "Stationery Set",
//     image: "https://via.placeholder.com/150",
//     price: 15.99,
//     description: "Complete stationery set.",
//     category: "office",
// },
// {
//     name: "Desk Organizer",
//     image: "https://via.placeholder.com/150",
//     price: 24.99,
//     description: "Wooden desk organizer.",
//     category: "office",
// },
// {
//     name: "Laptop Stand",
//     image: "https://via.placeholder.com/150",
//     price: 39.99,
//     description: "Adjustable laptop stand.",
//     category: "office",
// },
// ];
// mongoose.connect(process.env.MONGO_URL).then( async() => {
//     await Product.deleteMany({});
//     await Product.insertMany(sampleProducts);
//     console.log("Sample data inserted successfully!");
//     mongoose.connection.close();

// })

import mongoose from "mongoose";
import Product from "./models/Product.js"; // Don't forget the .js extension
import dotenv from "dotenv";

dotenv.config(); // Changed from require("dotenv").config()

const sampleProducts = [
    {
      name: "Red T-Shirt",
    image: "data:image/jpeg;base64,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",
    price: 19.99,
    description: "A nice red t-shirt.",
    category: "clothing",
  },
  {
    name: "Blue Jeans",
    image: "data:image/jpeg;base64,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",
    price: 39.99,
    description: "Comfortable blue jeans.",
    category: "clothing",
  },
  {
    name: "Wireless Mouse",
    image: "https://via.placeholder.com/150",
    price: 25.99,
    description: "A sleek wireless mouse.",
    category: "electronics",
},
{
    name: "Gaming Keyboard",
    image: "https://via.placeholder.com/150",
    price: 49.99,
    description: "A mechanical gaming keyboard.",
    category: "electronics",
},
{
    name: "Cooking Pan",
    image: "https://via.placeholder.com/150",
    price: 29.99,
    description: "Non-stick cooking pan.",
    category: "kitchen",
},
{
    name: "Blender",
    image: "https://via.placeholder.com/150",
    price: 59.99,
    description: "High-speed blender.",
    category: "kitchen",
},
{
    name: "Running Shoes",
    image: "https://via.placeholder.com/150",
    price: 79.99,
    description: "Comfortable running shoes.",
    category: "footwear",
},
{
    name: "Leather Wallet",
    image: "https://via.placeholder.com/150",
    price: 39.99,
    description: "Genuine leather wallet.",
    category: "accessories",
},
{
    name: "Smartphone",
    image: "https://via.placeholder.com/150",
    price: 699.99,
    description: "Latest model smartphone.",
    category: "electronics",
},
{
    name: "Laptop",
    image: "https://via.placeholder.com/150",
    price: 999.99,
    description: "High-performance laptop.",
    category: "electronics",
},
{
    name: "Headphones",
    image: "https://via.placeholder.com/150",
    price: 199.99,
    description: "Noise-cancelling headphones.",
    category: "electronics",
},
{
    name: "Smartwatch",
    image: "https://via.placeholder.com/150",
    price: 249.99,
    description: "Feature-rich smartwatch.",
    category: "electronics",
},
{
    name: "Sunglasses",
    image: "https://via.placeholder.com/150",
    price: 89.99,
    description: "Stylish sunglasses.",
    category: "accessories",
},
{
    name: "Backpack",
    image: "https://via.placeholder.com/150",
    price: 49.99,
    description: "Durable backpack.",
    category: "accessories",
},
{
    name: "Water Bottle",
    image: "https://via.placeholder.com/150",
    price: 19.99,
    description: "Insulated water bottle.",
    category: "accessories",
},
{
    name: "Yoga Mat",
    image: "https://via.placeholder.com/150",
    price: 29.99,
    description: "Non-slip yoga mat.",
    category: "fitness",
},
{
    name: "Dumbbells",
    image: "https://via.placeholder.com/150",
    price: 49.99,
    description: "Adjustable dumbbells.",
    category: "fitness",
},
{
    name: "Treadmill",
    image: "https://via.placeholder.com/150",
    price: 499.99,
    description: "Electric treadmill.",
    category: "fitness",
},
{
    name: "Stationery Set",
    image: "https://via.placeholder.com/150",
    price: 15.99,
    description: "Complete stationery set.",
    category: "office",
},
{
    name: "Desk Organizer",
    image: "https://via.placeholder.com/150",
    price: 24.99,
    description: "Wooden desk organizer.",
    category: "office",
},
{
    name: "Laptop Stand",
    image: "https://via.placeholder.com/150",
    price: 39.99,
    description: "Adjustable laptop stand.",
    category: "office",
},
];

mongoose.connect(process.env.ATLAS_DB_URL).then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample data inserted successfully!");
    mongoose.connection.close();
}).catch(err => {
    console.error("Error inserting sample data:", err);
});