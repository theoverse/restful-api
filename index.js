
const express = require('express');
const app = express();
const Joi = require('joi');

const { v4: uuidv4 } = require('uuid');
uuidv4();

let hostname = '127.0.0.1';
let port = 3000;

app.get('/', (req, res) => {
    console.log(`Server is listening at ${hostname} on port ${port}.`);

    res.send('Welcome banner');
})

app.listen(port, () => {
    console.log(`Server is listening at http://${hostname}:${port}/`)
})

const products = [
    {
        id: '1',
        name: 'Apple',
        price: '20'
    },
    {
        id: '2',
        name: 'Orange',
        price: '30'
    },
    {
        id: '3',
        name: 'Pineapple',
        price: '40'
    }
]

// show list of products
app.get('/api/products', (req, res) => {
    res.json(products);
})

// show specific product
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    // res.send(req.params.id);
    const product = products.find(prod => prod.id === id);

    if (!product) {
        return res.status(404).json({
            error: 'No Product Found with this ID'
        })
    }
    return res.json(product);
})

// insert a product data
app.use(express.json());
app.post('/api/products', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        price: Joi.number().required()
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const product = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price
    }
    products.push(product)

    return res.json(product)
})


// update specific producy data (using PUT method)
// update specific product data (using patch method)
// delete a specific product data
// delete all products data