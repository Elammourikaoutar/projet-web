const express = require("express");
const userRouter = express.Router();

const categorie = require("../prisma/categorie");


catRouter.get("/", async (req, res) => {
  const users = await categorie.Utilisateur.findMany();
  res.json({ users });
});

catRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await categorie.Utilisateur.findFirst({ where: { id: +id } });
  res.json({ user });
});

catRouter.post("/", async (req, res) => {
  const { nom } = req.body;
  const user = await categorie.Utilisateur.create({
    data: {
      nom,
    },
  });

  res.json({ user });
});

catRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await categorie.Utilisateur.findFirst({
    where: { id: parseInt(id) },
  });
  if (user) {
    await categorie.Utilisateur.delete({ where: { id: parseInt(id) } });
    res.json({ message: "user deleted" });
    return;
  }
  res.json({ message: "user not found" });
});

catRouter.patch("/", async (req, res) => {
  const { id, nom } = req.body;

  const user = await categorie.Utilisateur.findFirst({
    where: { id: parseInt(id) },
  });

  if (user) {
    const user = await categorie.Utilisateur.update({
      where: { id: parseInt(id) }, data: { nom },
    });
    res.json({ user });
    return;
  }
  res.json({ message: "user not found" });
});

module.exports = userRouter;
