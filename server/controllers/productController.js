import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images || [],
      countInStock: req.body.countInStock || 0
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product creation failed" });
  }
};

export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.description = req.body.description ?? product.description;
    product.images = req.body.images ?? product.images;
    product.countInStock = req.body.countInStock ?? product.countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Product update failed"
    });

  }
};


export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Product delete failed"
    });

  }
};