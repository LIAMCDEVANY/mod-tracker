const bcrypt = require("bcrypt");
const User = require("../models/User");

function renderSignup(req, res) {
  res.render("auth/signup", { error: null });
}

function renderLogin(req, res) {
  res.render("auth/login", { error: null });
}

async function signup(req, res) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).render("auth/signup", { error: "Passwords do not match." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });

    req.session.userId = user._id.toString();
    req.session.username = user.username;
    res.redirect("/mods");
  } catch (err) {
    res.status(400).render("auth/signup", { error: "Signup failed. Username/email may already exist." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).render("auth/login", { error: "Invalid credentials." });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).render("auth/login", { error: "Invalid credentials." });

  req.session.userId = user._id.toString();
  req.session.username = user.username;
  res.redirect("/mods");
}

function logout(req, res) {
  req.session.destroy(() => res.redirect("/auth/login"));
}

module.exports = { renderSignup, renderLogin, signup, login, logout };