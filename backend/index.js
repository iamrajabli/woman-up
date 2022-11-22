require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./services/logger.service');


// Assign app and port
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());


// Routes
const authRouter = require('./routers/auth.router');
const todoRouter = require('./routers/todo.router');

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

// Error Exception
const errorHandler = require('./errors/exception.filter');
app.use(errorHandler);

// Database Connection
require('./db');


app.listen(port || 8000, () => {
    logger.log('Server is working on port: ' + port)
})
