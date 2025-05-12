const express = require('express');
const app = express();
const PORT = 4000;

let products = [];

app.post('/products', express.json(), (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = { id: products.length + 1, name, price, description };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = products.find(p => p.id == id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id == id);

    if (productIndex !== -1) {
        products.splice(productIndex, 1); 
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
