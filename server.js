require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');

// import routes
const clientRouter = require('./routes/clientRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');
const orderlineRouter = require('./routes/orderlineRoute');
const menuRouter = require('./routes/menuRoutes');

app.use(morgan('dev'));

app.use(express.json())
app.use('/api/clients', clientRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/orderlines', orderlineRouter);
app.use('/api/menu', menuRouter);

app.use((req, res, next) => {
    const error = new Error('Not found - passed all the way out');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


app.get('/', (req, res) => {
    res.send('WELCOME TO THE ROOT')
})

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});