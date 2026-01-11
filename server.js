require("dotenv").config();
require("./config/db");

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const expressLayouts = require("express-ejs-layouts");

const authRoutes = require("./routes/auth");
const modRoutes = require("./routes/mods");

const app = express();

/* ----------------------------- View Engine ------------------------------ */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

/* ------------------------------ Middleware ------------------------------ */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: { httpOnly: true },
  })
);

app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.username = req.session.username || null;
  next();
});

/* -------------------------------- Routes -------------------------------- */
app.get("/", (req, res) => {
  if (!req.session.userId) return res.redirect("/auth/login");
  return res.redirect("/mods");
});

app.use("/auth", authRoutes);
app.use("/mods", modRoutes);

/* ------------------------------- Start App ------------------------------ */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});