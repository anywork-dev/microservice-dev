import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import routes from "./router"

const app = express();

app.use(bodyParser.json());

const COOKIE_SECRET = process.env.COOKIE_SECRET || "random_string_secret"

// Middleware to parse cookies
app.use(cookieSession({
  name: 'app-session',
  keys: [COOKIE_SECRET],

  // Cookie Options
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
}))

app.use(cookieParser(COOKIE_SECRET, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }));

app.use(routes);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  // Log the error (optional)
  console.error(err.stack);

  // Set the status code, default to 500
  res.status(err.status || 500);

  // Send the error response
  res.json({
      error: {
          message: err.message,
          status: err.status || 500
      }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
