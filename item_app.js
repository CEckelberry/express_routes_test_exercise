const {response} = require('express');
const express = require('express');
const ExpressError = require('./expressError')
const morgan = require("morgan");
const items = require('./fakeDb');
const middleware = require("./middleware");

const itemRoutes = require("./itemRoutes");

const app = express();

app.use(express.json());
app.use(middleware.logger)
app.use(morgan('dev'));

app.use('/items', itemRoutes);

//default error, status 404 page cannot be found, needs to be before error handler below, but after all other routes
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})


//error handler to override express default errors 
app.use((error, req, res, next) => {
    //set default status to 500 or other status message
    let status = error.status || 500;
    let message = error.message;
    console.log(error.message);
    //set the status and alert the user
    res.status(error.status).json({error: {message, status}});
})

module.exports = app;