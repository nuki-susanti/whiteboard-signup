const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //logger activity

const router = require('./src/routes');

const app = express();
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); //logger only runns in the development environment
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//ROUTES
app.use(router.userRouter);
app.use(router.authRouter);

//ROUTE HANDLER FOR UNDEFINED. Must be at the bottom!!
app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can not find ${req.originalUrl}`
    });
});

module.exports = app;