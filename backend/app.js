const { environment } = require('./config');
const isProduction = environment === 'production';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const asyncHandler = require('express-async-handler');
const hiddenRoute = process.env.HIDDEN_ROUTE
const app = express();
const crypto = require ("crypto");


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function createApiRouter () {
  const router = new express.Router()
  // const algorithm = "aes-256-cbc";
  // const initVector = crypto.randomBytes(16);
  const message = process.env.PYTHON_SCRIPT_KEY
  // const Securitykey = crypto.randomBytes(32);
  // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  // let encryptedData = cipher.update(message, "utf-8", "hex");
  // encryptedData += cipher.final("hex");


  router.post(
    '/update',
    asyncHandler(async (req, res) => {
      const { message_request } = req.body;
      if(message_request === message){
        return res.json({
          'array': 'yes',
        })
      }
      else{
        return res.json({
          'array': 'nope',
        });
      }
    }),
  );

  return router
}

app.use(hiddenRoute, createApiRouter())



// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  // helmet helps set a variety of headers to better secure your app
  app.use(helmet({
    contentSecurityPolicy: false
  }));

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
  );

  app.use(routes); // Connect all the routes

  const { ValidationError } = require('sequelize');

  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  });


  module.exports = app;
