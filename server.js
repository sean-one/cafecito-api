require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

// import routes
const authRouter = require('./routes/authRoute');
const clientRouter = require('./routes/clientRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');
const orderlineRouter = require('./routes/orderlineRoute');
const menuRouter = require('./routes/menuRoutes');

app.use(morgan('dev'));
// app.use(morgan(':method | :date[web] | :url :status :response-time ms'));

app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_CLIENT],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.SESSION_MAXAGE)
        // maxAge: 20 * 60 * 60 * 1000
    }
}))

// app.use((req, res, next) => {
//     console.log(req.session);
//     next()
// });

app.use('/auth', authRouter);
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

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});