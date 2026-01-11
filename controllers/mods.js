const Mod = require("../models/Mod");

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.redirect("/auth/login");
  next();
}

async function index(req, res) {
  const mods = await Mod.find({ user: req.session.userId }).sort({ createdAt: -1 });
  res.render("mods/index", { mods });
}

function newForm(req, res) {
  res.render("mods/new", { error: null });
}

async function create(req, res) {
  try {
    const { name, status, notes, links } = req.body;
    await Mod.create({ name, status, notes, links, user: req.session.userId });
    res.redirect("/mods");
  } catch (err) {
    res.status(400).render("mods/new", { error: "Failed to create mod. Check required fields." });
  }
}

async function show(req, res) {
  const mod = await Mod.findOne({ _id: req.params.id, user: req.session.userId });
  if (!mod) return res.status(404).send("Mod not found");
  res.render("mods/show", { mod });
}

async function editForm(req, res) {
  const mod = await Mod.findOne({ _id: req.params.id, user: req.session.userId });
  if (!mod) return res.status(404).send("Mod not found");
  res.render("mods/edit", { mod, error: null });
}

async function update(req, res) {
  try {
    const { name, status, notes, links } = req.body;
    const mod = await Mod.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      { name, status, notes, links },
      { new: true, runValidators: true }
    );
    if (!mod) return res.status(404).send("Mod not found");
    res.redirect(`/mods/${mod._id}`);
  } catch (err) {
    const mod = await Mod.findOne({ _id: req.params.id, user: req.session.userId });
    res.status(400).render("mods/edit", { mod, error: "Update failed. Check your inputs." });
  }
}

async function destroy(req, res) {
  await Mod.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
  res.redirect("/mods");
}

module.exports = { requireAuth, index, newForm, create, show, editForm, update, destroy };